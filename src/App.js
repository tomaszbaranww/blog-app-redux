import 'styles/global.module.scss';
import { PostsList } from 'features/posts/PostsList';
import { AddPostForm } from 'features/posts/AddPostForm';

export const App = () => {
    return (
        <main className="App">
            <AddPostForm />
            <PostsList />
        </main>
    );
};
