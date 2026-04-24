// ================================
// TASK 12.1 - Fetch API Basics
// ================================

// DOM Elements
const loading = document.getElementById("loading");
const errorDiv = document.getElementById("error");
const container = document.getElementById("users-container");
const searchInput = document.getElementById("search");
const sortSelect = document.getElementById("sort");
const cityFilter = document.getElementById("city-filter");
const submitPost = document.getElementById("submit-post");
const postResult = document.getElementById("post-result");

// State
let allUsers = [];

// Basic fetch with .then
function fetchSingleUser() {
    fetch("https://jsonplaceholder.typicode.com/users/1")
        .then(response => {
            console.log("Status:", response.status);
            console.log("OK:", response.ok);
            return response.json();
        })
        .then(data => {
            console.log("Single user:", data);
        })
        .catch(error => {
            console.error("Fetch error:", error);
        });
}

fetchSingleUser();

// Fetch with async/await
async function getUser(id) {
    try {
        const response = await fetch(
            `https://jsonplaceholder.typicode.com/users/${id}`
        );

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log(`User ${id}:`, data);
        return data;
    } catch (error) {
        console.error("Failed to fetch user:", error);
    }
}

getUser(2);

// ================================
// TASK 12.2 - Display API Data
// ================================

// Show/hide helpers
function showLoading() {
    loading.classList.remove("hidden");
    container.innerHTML = "";
}

function hideLoading() {
    loading.classList.add("hidden");
}

function showError(message) {
    errorDiv.textContent = `Error: ${message}`;
    errorDiv.classList.remove("hidden");
}

function hideError() {
    errorDiv.classList.add("hidden");
}

// Display users as cards
function displayUsers(users) {
    if (users.length === 0) {
        container.innerHTML = `
            <p style="text-align:center; color:#999; padding:20px;">
                No users found!
            </p>`;
        return;
    }

    container.innerHTML = users.map(user => `
        <div class="user-card">
            <h2>${user.name}</h2>
            <p>${user.email}</p>
            <p>${user.company.name}</p>
            <p>${user.address.city}</p>
            <p>${user.website}</p>
        </div>
    `).join("");
}

// Populate city filter dropdown
function populateCityFilter(users) {
    const cities = [...new Set(users.map(u => u.address.city))].sort();
    cities.forEach(city => {
        const option = document.createElement("option");
        option.value = city;
        option.textContent = city;
        cityFilter.appendChild(option);
    });
}

// Load all users
async function loadUsers() {
    try {
        showLoading();
        hideError();

        const response = await fetch(
            "https://jsonplaceholder.typicode.com/users"
        );

        if (!response.ok) {
            throw new Error("Failed to fetch users");
        }

        allUsers = await response.json();
        console.log("All users loaded:", allUsers);

        populateCityFilter(allUsers);
        displayUsers(allUsers);

    } catch (error) {
        showError(error.message);
    } finally {
        hideLoading();
    }
}

// ================================
// TASK 12.3 - POST Requests
// ================================

async function createPost(title, body, userId) {
    const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ title, body, userId })
        }
    );

    if (!response.ok) {
        throw new Error("Failed to create post");
    }

    return response.json();
}

// Post form submission
submitPost.addEventListener("click", async () => {
    const title = document.getElementById("post-title").value;
    const body = document.getElementById("post-body").value;

    if (!title || !body) {
        alert("Please fill in both fields!");
        return;
    }

    try {
        submitPost.textContent = "Submitting...";
        const newPost = await createPost(title, body, 1);
        console.log("Created post:", newPost);

        postResult.style.display = "block";
        postResult.textContent = 
            `✅ Post created! ID: ${newPost.id}, Title: "${newPost.title}"`;

        document.getElementById("post-title").value = "";
        document.getElementById("post-body").value = "";
    } catch (error) {
        console.error("Failed:", error);
        alert("Failed to create post!");
    } finally {
        submitPost.textContent = "Submit Post";
    }
});

// ================================
// TASK 12.4 - Search & Filter
// ================================

function filterAndDisplayUsers() {
    const query = searchInput.value.toLowerCase();
    const sort = sortSelect.value;
    const city = cityFilter.value;

    // Filter by search query
    let filtered = allUsers.filter(user =>
        user.name.toLowerCase().includes(query) ||
        user.email.toLowerCase().includes(query)
    );

    // Filter by city
    if (city !== "all") {
        filtered = filtered.filter(user => 
            user.address.city === city
        );
    }

    // Sort
    filtered.sort((a, b) => {
        if (sort === "az") {
            return a.name.localeCompare(b.name);
        } else {
            return b.name.localeCompare(a.name);
        }
    });

    displayUsers(filtered);
}

// Event listeners for search & filter
searchInput.addEventListener("input", filterAndDisplayUsers);
sortSelect.addEventListener("change", filterAndDisplayUsers);
cityFilter.addEventListener("change", filterAndDisplayUsers);

// ================================
// INITIALIZE
// ================================
loadUsers();