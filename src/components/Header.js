import { Link } from 'react-router-dom';

export const Header = () => {
    return (
        <header>
            <h1>Blog app redux</h1>
            <nav>
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="post">Post</Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
};
