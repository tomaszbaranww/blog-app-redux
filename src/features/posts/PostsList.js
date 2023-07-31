import { useSelector } from 'react-redux';
import { selectPostIds, getPostsStatus, getPostsError } from 'features/posts/postsSlice';
import { PostsExcerpt } from 'features/posts/PostsExcerpt';
export const PostsList = () => {
    const orderedPostIds = useSelector(selectPostIds);
    const postStatus = useSelector(getPostsStatus);
    const postError = useSelector(getPostsError);

    let content;

    if (postStatus === 'loading') {
        content = <p>Loading...</p>;
    } else if (postStatus === 'succeeded') {
        content = orderedPostIds.map((postId) => <PostsExcerpt key={postId} postId={postId} />);
    } else if (postStatus === 'failed') {
        content = <p>{postError}</p>;
    }

    return <section>{content}</section>;
};
