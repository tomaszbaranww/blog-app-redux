import styles from 'styles/PostExcerpt.module.scss';
import { PostAuthor } from 'features/posts/PostAuthor';
import { TimeAgo } from 'features/posts/TimeAgo';
import { ReactionButtons } from 'features/posts/ReactionButtons';
import { Link } from 'react-router-dom';

export const PostsExcerpt = ({ post }) => {
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
