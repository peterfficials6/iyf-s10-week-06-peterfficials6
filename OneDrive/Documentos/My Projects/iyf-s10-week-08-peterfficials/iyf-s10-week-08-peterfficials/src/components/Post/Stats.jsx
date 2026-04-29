function Stats({ totalPosts, totalLikes }) {
    return (
        <div className="stats-bar">
            <span>📊 {totalPosts} posts</span>
            <span>❤️ {totalLikes} total likes</span>
        </div>
    );
}

export default Stats;