import styles from 'styles/PostExcerpt.module.scss';
import { PostAuthor } from 'features/posts/PostAuthor';
import { TimeAgo } from 'features/posts/TimeAgo';
import { ReactionButtons } from 'features/posts/ReactionButtons';

export const PostsExcerpt = ({ post }) => {
    return (
        <article>
            <h3>{post.title}</h3>
            <p>{post.body.substring(0, 100)}</p>
            <p className={styles.postCredit}>
                <PostAuthor userId={post.userId} />
                <TimeAgo timestamp={post.date} />
            </p>

            <ReactionButtons post={post} />
        </article>
    );
};
