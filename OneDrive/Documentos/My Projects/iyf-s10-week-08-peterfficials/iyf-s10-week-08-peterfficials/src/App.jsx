import { useState } from 'react';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import Stats from './components/Post/Stats';
import CreatePost from './components/Post/CreatePost';
import PostList from './components/Post/PostList';
import './App.css';

function App() {
    // All state lives in the parent (lifted up)
    const [posts, setPosts] = useState([
        { 
            id: 1, 
            title: 'Getting Started with React', 
            excerpt: 'Learn the basics of React and build amazing apps with components and hooks.',
            author: 'John Doe',
            date: 'Jan 15, 2026',
            likes: 5 
        },
        { 
            id: 2, 
            title: 'JavaScript Best Practices', 
            excerpt: 'Write cleaner code with these essential tips for modern JavaScript development.',
            author: 'Jane Smith',
            date: 'Jan 14, 2026',
            likes: 3 
        },
        { 
            id: 3, 
            title: 'CSS Grid vs Flexbox', 
            excerpt: 'When to use each layout system for responsive web design.',
            author: 'Bob Johnson',
            date: 'Jan 13, 2026',
            likes: 8 
        }
    ]);

    // Handler: Like a post
    const handleLike = (id) => {
        setPosts(posts.map(post =>
            post.id === id
                ? { ...post, likes: post.likes + 1 }
                : post
        ));
    };

    // Handler: Add new post
    const handleAddPost = (newPost) => {
        setPosts([newPost, ...posts]);
    };

    // Handler: Delete post
    const handleDeletePost = (id) => {
        setPosts(posts.filter(post => post.id !== id));
    };

    // Derived value: total likes
    const totalLikes = posts.reduce((sum, post) => sum + post.likes, 0);

    return (
        <div className="app">
            <Header />
            
            <main className="main-content">
                <Stats 
                    totalPosts={posts.length} 
                    totalLikes={totalLikes} 
                />
                
                <CreatePost onAddPost={handleAddPost} />
                
                <h2>Latest Posts</h2>
                
                <PostList 
                    posts={posts} 
                    onLike={handleLike}
                    onDelete={handleDeletePost}
                />
            </main>
            
            <Footer />
        </div>
    );
}

export default App;