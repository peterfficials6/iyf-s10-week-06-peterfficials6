// ================================
// TASK 12.1 - Fetch API Basics
// ================================

// DOM Elements
const loading = document.getElementById("loading");
const errorDiv = document.getElementById("error");
const container = document.getElementById("users-container");
const searchInput = document.getElementById("search");
const sortSelect = document.getElementById("sort");
const fetchBtn = document.getElementById("fetchUsers");

let users = [];

// Event Listeners
fetchBtn.addEventListener("click", fetchUsers);
searchInput.addEventListener("input", filterUsers);
sortSelect.addEventListener("change", sortUsers);

// Fetch users from API
async function fetchUsers() {
    showLoading();
    hideError();
    
    try {
        const response = await fetch("https://jsonplaceholder.typicode.com/users");
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        users = await response.json();
        displayUsers(users);
        console.log("Fetched users:", users);
        
    } catch (error) {
        console.error("Fetch error:", error);
        showError("Failed to fetch users. Please try again.");
    } finally {
        hideLoading();
    }
}

// ================================
// TASK 12.2 - Display API Data
// ================================

function displayUsers(usersToDisplay) {
    container.innerHTML = "";
    
    usersToDisplay.forEach(user => {
        const userCard = createUserCard(user);
        container.appendChild(userCard);
    });
}

function createUserCard(user) {
    const card = document.createElement("div");
    card.className = "user-card";
    
    card.innerHTML = `
        <h3>${user.name}</h3>
        <p><strong>Username:</strong> ${user.username}</p>
        <p class="email"><strong>Email:</strong> ${user.email}</p>
        <p><strong>Phone:</strong> ${user.phone}</p>
        <p><strong>Website:</strong> ${user.website}</p>
        <p><strong>Company:</strong> ${user.company.name}</p>
        <p><strong>Address:</strong> ${user.address.street}, ${user.address.city}</p>
    `;
    
    return card;
}

// ================================
// TASK 12.3 - POST Requests
// ================================

// Example POST request
async function createUser(userData) {
    try {
        const response = await fetch("https://jsonplaceholder.typicode.com/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userData)
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const newUser = await response.json();
        console.log("Created user:", newUser);
        return newUser;
        
    } catch (error) {
        console.error("POST error:", error);
        throw error;
    }
}

// Example usage of POST request
const exampleUser = {
    name: "John Doe",
    username: "johndoe",
    email: "john@example.com",
    phone: "1-555-123-4567",
    website: "johndoe.com",
    company: {
        name: "Doe Industries"
    },
    address: {
        street: "123 Main St",
        city: "Anytown"
    }
};

// Uncomment to test POST request
// createUser(exampleUser);

// ================================
// TASK 12.4 - Search & Filter
// ================================

function filterUsers() {
    const searchTerm = searchInput.value.toLowerCase();
    
    const filteredUsers = users.filter(user => {
        return (
            user.name.toLowerCase().includes(searchTerm) ||
            user.username.toLowerCase().includes(searchTerm) ||
            user.email.toLowerCase().includes(searchTerm)
        );
    });
    
    displayUsers(filteredUsers);
}

function sortUsers() {
    const sortBy = sortSelect.value;
    
    if (!sortBy) {
        displayUsers(users);
        return;
    }
    
    const sortedUsers = [...users].sort((a, b) => {
        if (a[sortBy] < b[sortBy]) return -1;
        if (a[sortBy] > b[sortBy]) return 1;
        return 0;
    });
    
    displayUsers(sortedUsers);
}

// ================================
// Utility Functions
// ================================

function showLoading() {
    loading.classList.remove("hidden");
    container.innerHTML = "";
}

function hideLoading() {
    loading.classList.add("hidden");
}

function showError(message) {
    errorDiv.textContent = message;
    errorDiv.classList.remove("hidden");
}

function hideError() {
    errorDiv.classList.add("hidden");
}

// ================================
// Advanced Examples
// ================================

// Parallel requests with Promise.all
async function fetchMultipleData() {
    try {
        const [users, posts, comments] = await Promise.all([
            fetch("https://jsonplaceholder.typicode.com/users").then(res => res.json()),
            fetch("https://jsonplaceholder.typicode.com/posts").then(res => res.json()),
            fetch("https://jsonplaceholder.typicode.com/comments").then(res => res.json())
        ]);
        
        console.log("Parallel fetch results:", { users, posts, comments });
        return { users, posts, comments };
        
    } catch (error) {
        console.error("Parallel fetch error:", error);
    }
}

// Chained requests
async function fetchUserWithPosts(userId) {
    try {
        const userResponse = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
        const user = await userResponse.json();
        
        const postsResponse = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`);
        const posts = await postsResponse.json();
        
        console.log(`User ${user.name} has ${posts.length} posts:`, posts);
        return { user, posts };
        
    } catch (error) {
        console.error("Chained fetch error:", error);
    }
}

// Auto-fetch on page load
document.addEventListener("DOMContentLoaded", () => {
    console.log("🌐 Fetch API Exercises Loaded");
    console.log("Click 'Fetch Users' to begin!");
    
    // Uncomment to auto-fetch on load
    // fetchUsers();
});
