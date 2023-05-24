import { useSelector } from 'react-redux';
import { selectAllPosts, getPostsStatus, getPostsError } from 'features/posts/postsSlice';
import { PostsExcerpt } from 'features/posts/PostsExcerpt';
export const PostsList = () => {
    const posts = useSelector(selectAllPosts);
    const postStatus = useSelector(getPostsStatus);
    const postError = useSelector(getPostsError);

    let content;

    if (postStatus === 'loading') {
        content = <p>"Loading..."</p>;
    } else if (postStatus === 'succeeded') {
        const orderedPosts = posts.slice().sort((a, b) => b.date.localeCompare(a.date));
        content = orderedPosts.map((post) => <PostsExcerpt key={post.id} post={post} />);
    } else if (postStatus === 'failed') {
        content = <p>{postError}</p>;
    }

    return <section>{content}</section>;
};
