let users = [];
const validUser = "Chirag"; 
const validPass = "password123";

function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (username === validUser && password === validPass) {
        document.getElementById('login-panel').style.display = 'none';
        document.getElementById('dashboard').style.display = 'block';
    } else {
        alert("Invalid login details.");
    }
}


async function fetchGitHubUsers() {
    try {
        const response = await fetch("https://api.github.com/users");
        const data = await response.json();
        
        
        users = data.slice(0, 10).map(user => ({
            username: user.login,
            profileUrl: user.html_url
        }));
        
        displayUsers();
    } catch (error) {
        console.error("Error fetching users:", error);
    }
}


function displayUsers() {
    const userList = document.getElementById('user-list');
    userList.innerHTML = '';
    
    users.forEach(user => {
        const li = document.createElement('li');
        const link = document.createElement('a');
        link.href = user.profileUrl;
        link.textContent = user.username;
        link.target = "_blank";
        
        li.appendChild(link);
        userList.appendChild(li);
    });
}

function sortUsers() {
    const sortValue = document.getElementById('sort').value;

    if (sortValue === 'alphabetical') {
        users.sort((a, b) => a.username.localeCompare(b.username));
    } else {
       
        users.sort((a, b) => 0);
    }
    
    displayUsers();
}

function logout() {
    document.getElementById('dashboard').style.display = 'none';
    document.getElementById('login-panel').style.display = 'block';
    document.getElementById('username').value = '';
    document.getElementById('password').value = '';
}