function UserGreeting({ user }) {
    // Pattern 1: Early return
    if (!user) {
        return <p>Please log in</p>;
    }
    
    // Pattern 2: Ternary operator
    return (
        <div>
            {user.isAdmin ? (
                <p>Welcome back, Admin {user.name}!</p>
            ) : (
                <p>Welcome back, {user.name}!</p>
            )}
        </div>
    );
}

export default UserGreeting;