import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useRef } from 'react';
import { selectAllPosts, getPostsStatus, getPostsError, fetchPosts } from 'features/posts/postsSlice';
import { PostsExcerpt } from 'features/posts/PostsExcerpt';
export const PostsList = () => {
    const effectRan = useRef(false);
    const dispatch = useDispatch();

    const posts = useSelector(selectAllPosts);
    const postStatus = useSelector(getPostsStatus);
    const postError = useSelector(getPostsError);

    useEffect(() => {
        if (effectRan.current === false) {
            if (postStatus === 'idle') {
                dispatch(fetchPosts());
            }

            return () => {
                effectRan.current = true;
            };
        }
    }, [postStatus, dispatch]);

    let content;

    if (postStatus === 'loading') {
        content = <p>"Loading..."</p>;
    } else if (postStatus === 'succeeded') {
        const orderedPosts = posts.slice().sort((a, b) => b.date.localeCompare(a.date));
        content = orderedPosts.map((post) => <PostsExcerpt key={post.id} post={post} />);
    } else if (postStatus === 'failed') {
        content = <p>{postError}</p>;
    }

    return (
        <section>
            <h2>Posts</h2>
            {content}
        </section>
    );
};
