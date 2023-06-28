import { Link } from 'react-router-dom';
import styles from 'styles/Header.module.scss';

export const Header = () => {
    return (
        <header className={styles.header}>
            <h1>Blog app redux</h1>
            <nav className={styles.nav}>
                <ul>
                    <li>
                        <Link to="/blog-app-redux">Home</Link>
                    </li>
                    <li>
                        <Link to="post">Post</Link>
                    </li>
                    <li>
                        <Link to="user">Users</Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
};
