// ================================
// TASK 11.1 - Understanding Async
// ================================

// Synchronous
console.log("--- Synchronous ---");
console.log("1 - Start");
console.log("2 - Middle");
console.log("3 - End");

// Asynchronous
console.log("--- Asynchronous ---");
console.log("1 - Start");
setTimeout(() => {
    console.log("2 - This is delayed");
}, 2000);
console.log("3 - End");

// Prediction Challenge
console.log("--- Prediction ---");
console.log("A");
setTimeout(() => console.log("B"), 0);
console.log("C");
setTimeout(() => console.log("D"), 100);
console.log("E");

// Callback Pattern
function fetchData(callback) {
    console.log("Fetching data...");
    setTimeout(() => {
        const data = { name: "John", age: 30 };
        callback(data);
    }, 1000);
}

fetchData(function(data) {
    console.log("Data received:", data);
});

function loadUser(userId, callback) {
    console.log(`Loading user ${userId}...`);
    setTimeout(() => {
        const user = {
            id: userId,
            name: "Alice",
            email: "alice@example.com"
        };
        callback(user);
    }, 1500);
}

loadUser(1, function(user) {
    console.log("User loaded:", user);
});

// ================================
// TASK 11.2 - Callback Hell & Promises
// ================================

// Callback Hell (BAD way)
console.log("--- Callback Hell ---");
function getUserData_cb(userId, callback) {
    setTimeout(() => {
        callback({ id: userId, name: "John" });
    }, 1000);
}

function getUserPosts_cb(userId, callback) {
    setTimeout(() => {
        callback([
            { id: 1, title: "Post 1" },
            { id: 2, title: "Post 2" }
        ]);
    }, 1000);
}

function getPostComments_cb(postId, callback) {
    setTimeout(() => {
        callback([
            { id: 1, text: "Great post!" },
            { id: 2, text: "Thanks for sharing" }
        ]);
    }, 1000);
}

// The nightmare - nested callbacks!
getUserData_cb(1, function(user) {
    console.log("User:", user);
    getUserPosts_cb(user.id, function(posts) {
        console.log("Posts:", posts);
        getPostComments_cb(posts[0].id, function(comments) {
            console.log("Comments:", comments);
        });
    });
});

// Promises (BETTER way)
console.log("--- Promises ---");
const myPromise = new Promise((resolve, reject) => {
    const success = true;
    setTimeout(() => {
        if (success) {
            resolve("It worked!");
        } else {
            reject("Something went wrong");
        }
    }, 1000);
});

myPromise
    .then(result => console.log("Success:", result))
    .catch(error => console.log("Error:", error));

// Refactored with Promises
function getUserData(userId) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (userId > 0) {
                resolve({ id: userId, name: "John" });
            } else {
                reject("Invalid user ID");
            }
        }, 1000);
    });
}

function getUserPosts(userId) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (userId > 0) {
                resolve([
                    { id: 1, title: "Post 1" },
                    { id: 2, title: "Post 2" }
                ]);
            } else {
                reject("Invalid user ID");
            }
        }, 1000);
    });
}

function getPostComments(postId) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (postId > 0) {
                resolve([
                    { id: 1, text: "Great post!" },
                    { id: 2, text: "Thanks for sharing" }
                ]);
            } else {
                reject("Invalid post ID");
            }
        }, 1000);
    });
}

// Test getUserData
getUserData(1)
    .then(user => console.log("Promise user:", user))
    .catch(error => console.log("Error:", error));

// Test with invalid ID
getUserData(-1)
    .then(user => console.log("Should not see this"))
    .catch(error => console.log("Expected error:", error));

// ================================
// TASK 11.3 - Promise Chaining
// ================================

// Promise Chain
console.log("--- Promise Chaining ---");
getUserData(1)
    .then(user => {
        console.log("User:", user);
        return getUserPosts(user.id);
    })
    .then(posts => {
        console.log("Posts:", posts);
        return getPostComments(posts[0].id);
    })
    .then(comments => {
        console.log("Comments:", comments);
    })
    .catch(error => {
        console.error("Error:", error);
    });

// Promise.all - run multiple at same time
console.log("--- Promise.all ---");
Promise.all([getUserData(1), getUserData(2), getUserData(3)])
    .then(results => {
        console.log("All users:", results);
    })
    .catch(error => {
        console.error("One failed:", error);
    });

// Promise.race - first one wins
console.log("--- Promise.race ---");
const fast = new Promise(resolve => 
    setTimeout(() => resolve("Fast!"), 100));
const slow = new Promise(resolve => 
    setTimeout(() => resolve("Slow!"), 500));

Promise.race([fast, slow])
    .then(result => {
        console.log("Winner:", result); // Fast!
    });

// ================================
// TASK 11.4 - Async/Await
// ================================

console.log("--- Async/Await ---");

// Async/await version
async function getDataWithAsync() {
    const user = await getUserData(1);
    console.log("Async user:", user);

    const posts = await getUserPosts(user.id);
    console.log("Async posts:", posts);

    const comments = await getPostComments(posts[0].id);
    console.log("Async comments:", comments);

    return comments;
}

getDataWithAsync();

// Error handling with try/catch
async function fetchUserData(userId) {
    try {
        const user = await getUserData(userId);
        const posts = await getUserPosts(user.id);
        console.log("Fetched user and posts:", { user, posts });
        return { user, posts };
    } catch (error) {
        console.error("Failed to fetch:", error);
    }
}

fetchUserData(1);
fetchUserData(-1); // This will hit the catch block

// Parallel with async/await
async function getAllUsers() {
    console.log("--- Parallel Fetch ---");

    // Sequential (slow - waits for each)
    console.log("Sequential starting...");
    const seqUser1 = await getUserData(1);
    const seqUser2 = await getUserData(2);
    console.log("Sequential done:", seqUser1, seqUser2);

    // Parallel (fast - all at once!)
    console.log("Parallel starting...");
    const [parUser1, parUser2, parUser3] = await Promise.all([
        getUserData(1),
        getUserData(2),
        getUserData(3)
    ]);
    console.log("Parallel done:", parUser1, parUser2, parUser3);
}

getAllUsers();