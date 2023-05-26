import styles from 'styles/PostExcerpt.module.scss';
import { PostAuthor } from 'features/posts/PostAuthor';
import { TimeAgo } from 'features/posts/TimeAgo';
import { ReactionButtons } from 'features/posts/ReactionButtons';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectPostById } from 'features/posts/postsSlice';

export const PostsExcerpt = ({ postId }) => {
    const post = useSelector((state) => selectPostById(state, postId));
    return (
        <article>
            <h2>{post.title}</h2>
            <p>{post.body.substring(0, 75)}...</p>
            <p className={styles.postCredit}>
                <Link to={`post/${post.id}`}>View Post</Link>
                <PostAuthor userId={post.userId} />
                <TimeAgo timestamp={post.date} />
            </p>

            <ReactionButtons post={post} />
        </article>
    );
};
