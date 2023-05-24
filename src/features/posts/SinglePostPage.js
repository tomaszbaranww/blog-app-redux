import styles from 'styles/PostExcerpt.module.scss';
import { useSelector } from 'react-redux';
import { selectPostById } from 'features/posts/postsSlice';
import { PostAuthor } from 'features/posts/PostAuthor';
import { TimeAgo } from 'features/posts/TimeAgo';
import { ReactionButtons } from 'features/posts/ReactionButtons';
import { useParams, Link } from 'react-router-dom';

export const SinglePostPage = () => {
    const { postId } = useParams();

    const post = useSelector((state) => selectPostById(state, Number(postId)));

    if (!post) {
        return (
            <section>
                <h2>Post not found</h2>
            </section>
        );
    }

    return (
        <article>
            <h3>{post.title}</h3>
            <p>{post.body.substring(0, 100)}</p>
            <p className={styles.postCredit}>
                <Link to={`/post/edit/${post.id}`}>Edit Post</Link>
                <PostAuthor userId={post.userId} />
                <TimeAgo timestamp={post.date} />
            </p>

            <ReactionButtons post={post} />
        </article>
    );
};
