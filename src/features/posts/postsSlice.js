import { createSlice, createAsyncThunk, createSelector, createEntityAdapter } from '@reduxjs/toolkit';
import { sub } from 'date-fns';
import api from 'api/axios';

const postsAdapter = createEntityAdapter({
    sortComparer: (a, b) => b.date.localeCompare(a.date),
});

const initialState = postsAdapter.getInitialState({
    status: 'idle', // 'idle' | 'loading | 'succeeded' | 'failed'
    error: null,
});

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
    const response = await api.get('/posts');
    return response.data;
});

export const addNewPost = createAsyncThunk('posts/addNewPost', async (initialPost) => {
    const response = await api.post('/posts', initialPost);
    return response.data;
});

export const updatePost = createAsyncThunk('posts/updatePost', async (initialPost) => {
    const { id } = initialPost;

    try {
        const response = await api.put(`/posts/${id}`, initialPost);
        return response.data;
    } catch (error) {
        return error.message;
    }
});

export const deletePost = createAsyncThunk('posts/deletePost', async (initialPost) => {
    const { id } = initialPost;

    try {
        const response = await api.delete(`/posts/${id}`);
        // because of jsonplaceholder.com
        if (response?.status === 200) return initialPost;
        return `${response?.status}: ${response?.statusText}`;
    } catch (error) {
        return error.message;
    }
});

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        reactionAdded(state, action) {
            const { postId, reaction } = action.payload;
            const existingPost = state.entities[postId];

            if (existingPost) {
                existingPost.reactions[reaction]++;
            }
        },
    },
    extraReducers(builder) {
        builder
            .addCase(fetchPosts.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchPosts.fulfilled, (state, action) => {
                state.status = 'succeeded';
                // Adding date and reactions
                let min = 1;
                const loadedPosts = action.payload.map((post) => {
                    post.date = sub(new Date(), { minutes: min++ }).toISOString();
                    post.reactions = {
                        thumbsUp: 0,
                        wow: 0,
                        heart: 0,
                        rocket: 0,
                        coffee: 0,
                    };
                    return post;
                });
                // Add any fetched posts to the array
                postsAdapter.upsertMany(state, loadedPosts);
            })
            .addCase(fetchPosts.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(addNewPost.fulfilled, (state, action) => {
                // Fix for API post IDs:
                // Creating sortedPosts & assigning the id
                // would be not be needed if the fake API
                // returned accurate new post IDs

                action.payload.id = state.ids[state.ids.length - 1] + 1;
                // End fix for fake API post IDs

                action.payload.userId = Number(action.payload.userId);
                action.payload.date = new Date().toISOString();
                action.payload.reactions = {
                    thumbsUp: 0,
                    wow: 0,
                    heart: 0,
                    rocket: 0,
                    coffee: 0,
                };
                postsAdapter.addOne(state, action.payload);
            })
            .addCase(updatePost.fulfilled, (state, action) => {
                if (!action.payload?.id) {
                    console.error('Update could not complete');
                    console.error(action.payload);
                    return;
                }
                action.payload.date = new Date().toISOString();
                postsAdapter.upsertOne(state, action.payload);
            })
            .addCase(deletePost.fulfilled, (state, action) => {
                if (!action.payload?.id) {
                    console.error('Delete could not complete');
                    console.error(action.payload);
                    return;
                }
                const { id } = action.payload;
                postsAdapter.removeOne(state, id);
            });
    },
});

export const { selectAll: selectAllPosts, selectById: selectPostById, selectIds: selectPostIds } = postsAdapter.getSelectors((state) => state.posts);

export const getPostsStatus = (state) => state.posts.status;

export const getPostsError = (state) => state.posts.error;

export const selectPostsByUser = createSelector([selectAllPosts, (state, userId) => userId], (posts, userId) =>
    posts.filter((post) => post.userId === userId)
);

export const { reactionAdded } = postsSlice.actions;
export default postsSlice.reducer;
