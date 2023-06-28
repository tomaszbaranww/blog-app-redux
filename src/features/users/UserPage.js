import { useSelector } from 'react-redux';
import { selectUserById } from 'features/users/usersSlice';
import { selectPostsByUser } from 'features/posts/postsSlice';
import { Link, useParams } from 'react-router-dom';

export const UserPage = () => {
    const { userId } = useParams();
    const user = useSelector((state) => selectUserById(state, Number(userId)));

    const postsForUser = useSelector((state) => selectPostsByUser(state, Number(userId)));

    const postTitles = postsForUser.map((post) => (
        <li key={post.id}>
            <Link to={`/blog-app-redux/post/${post.id}`}>{post.title}</Link>
        </li>
    ));

    return (
        <section>
            <h2>{user?.name}</h2>

            <ol>{postTitles}</ol>
        </section>
    );
};
