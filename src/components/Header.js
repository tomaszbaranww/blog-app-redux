import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { increaseCount, getCount } from 'features/posts/postsSlice';
import styles from 'styles/Header.module.scss';

export const Header = () => {
    const dispatch = useDispatch();
    const count = useSelector(getCount);

    return (
        <header className={styles.header}>
            <h1>Blog app redux</h1>
            <nav className={styles.nav}>
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="post">Post</Link>
                    </li>
                    <li>
                        <Link to="user">Users</Link>
                    </li>
                </ul>
                <button onClick={() => dispatch(increaseCount())}>{count}</button>
            </nav>
        </header>
    );
};
