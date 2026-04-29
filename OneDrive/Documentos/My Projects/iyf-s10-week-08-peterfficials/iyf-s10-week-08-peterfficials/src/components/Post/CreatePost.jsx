import { useState } from 'react';
import Button from '../shared/Button';

function CreatePost({ onAddPost }) {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title.trim() || !content.trim()) return;
        
        const newPost = {
            id: Date.now(),
            title,
            excerpt: content.substring(0, 100) + '...',
            author: 'You',
            date: new Date().toLocaleDateString(),
            likes: 0
        };
        
        onAddPost(newPost);
        setTitle('');
        setContent('');
    };
    
    return (
        <form className="create-post" onSubmit={handleSubmit}>
            <h3>Create New Post</h3>
            <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Post title"
            />
            <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Write your post..."
                rows="4"
            />
            <Button text="Publish" variant="primary" />
        </form>
    );
}

export default CreatePost;