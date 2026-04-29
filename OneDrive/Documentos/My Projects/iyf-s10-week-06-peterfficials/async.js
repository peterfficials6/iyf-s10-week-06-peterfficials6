// ================================
// TASK 11.1 - Understanding Async
// ================================

// Synchronous
console.log("--- Synchronous ---");
console.log("1 - Start");
console.log("2 - Middle");
console.log("3 - End");

// Asynchronous with setTimeout
console.log("\n--- Asynchronous ---");
console.log("1 - Start");
setTimeout(() => {
    console.log("2 - Async callback (after 2 seconds)");
}, 2000);
console.log("3 - End");

// ================================
// TASK 11.2 - Callbacks & Promises
// ================================

function fetchData(callback) {
    setTimeout(() => {
        const data = { id: 1, name: "John Doe" };
        callback(data);
    }, 1000);
}

// Callback pattern
fetchData((data) => {
    console.log("Callback received:", data);
});

// Promise version
function fetchDataPromise() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const data = { id: 1, name: "John Doe" };
            resolve(data);
        }, 1000);
    });
}

fetchDataPromise().then(data => {
    console.log("Promise resolved:", data);
});

// ================================
// TASK 11.3 - Promise Chaining
// ================================

// Promise.all - Wait for all promises
const promise1 = Promise.resolve(3);
const promise2 = new Promise(resolve => setTimeout(() => resolve('foo'), 1000));
const promise3 = Promise.resolve(42);

Promise.all([promise1, promise2, promise3]).then(values => {
    console.log("Promise.all results:", values);
});

// Promise.race - First one to resolve wins
const promise4 = new Promise(resolve => setTimeout(() => resolve('one'), 500));
const promise5 = new Promise(resolve => setTimeout(() => resolve('two'), 100));

Promise.race([promise4, promise5]).then(value => {
    console.log("Promise.race winner:", value);
});

// ================================
// TASK 11.4 - Async/Await
// ================================

async function fetchUserData() {
    try {
        console.log("Fetching user data...");
        const user = await fetchDataPromise();
        console.log("User fetched with async/await:", user);
        
        // Simulate another async operation
        const posts = await new Promise(resolve => {
            setTimeout(() => resolve(['Post 1', 'Post 2', 'Post 3']), 500);
        });
        
        console.log("User posts:", posts);
        return { user, posts };
    } catch (error) {
        console.error("Error in async function:", error);
    }
}

fetchUserData();

// Parallel async operations
async function parallelOperations() {
    try {
        console.log("Starting parallel operations...");
        
        const [users, posts, comments] = await Promise.all([
            fetchDataPromise(),
            new Promise(resolve => setTimeout(() => resolve(['Post 1', 'Post 2']), 300)),
            new Promise(resolve => setTimeout(() => resolve(['Comment 1', 'Comment 2']), 200))
        ]);
        
        console.log("Parallel results:", { users, posts, comments });
    } catch (error) {
        console.error("Parallel operation error:", error);
    }
}

parallelOperations();

console.log("\n=== Async JavaScript Exercises Complete ===");
