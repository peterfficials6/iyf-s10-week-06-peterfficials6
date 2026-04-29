import PostCard from './PostCard';

function PostList({ posts, onLike }) {
    return (
        <div className="post-list">
            {posts.map(post => (
                <PostCard 
                    key={post.id}
                    post={post}
                    onLike={onLike}
                />
            ))}
        </div>
    );
}

export default PostList;