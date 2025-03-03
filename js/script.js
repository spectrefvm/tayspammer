// Password protection logic
const correctPassword = 'yourpassword'; // Replace with your actual password

// Get elements for password protection
const submitPasswordButton = document.getElementById('submitPassword');
const passwordInput = document.getElementById('password');
const passwordPrompt = document.getElementById('passwordPrompt');
const contentSection = document.getElementById('content'); // Changed this name to avoid confusion
const errorMessage = document.getElementById('errorMessage');

// Event listener for password submission
submitPasswordButton.addEventListener('click', () => {
    const enteredPassword = passwordInput.value;

    // Check if the entered password is correct
    if (enteredPassword === correctPassword) {
        passwordPrompt.style.display = 'none'; // Hide password prompt
        contentSection.style.display = 'block'; // Show the main content
    } else {
        errorMessage.style.display = 'block'; // Show error message
    }
});

// Variables for spammer functionality
const start = document.getElementById("start");
const stop = document.getElementById("stop");
const url = document.getElementById("url");
const username = document.getElementById("username");
const messageInput = document.getElementById("message"); // Renamed variable to avoid conflicts
const avatar_url = document.getElementById("avatar");
const deleteBtn = document.getElementById("delete");
const delUrl = document.getElementById("delUrl");
let interval;

start.addEventListener("click", async () => {
    if (!url.value || !messageInput.value) {
        alert("Please fill out all required info!");
        return false;
    }
    try {
        const res = await fetch(url.value);
        if (!res.ok) {
            throw new Error(`Error: ${res.status} ${res.statusText}`); // Fixed the incorrect usage of `response`
        }
        start.disabled = true;
        stop.disabled = false;
        alert("Started spamming!");
        interval = setInterval(send, 50); // Sends request every 50ms
    } catch (e) {
        alert("Invalid webhook URL!");
    }
});

stop.addEventListener("click", async () => {
    clearInterval(interval);
    start.disabled = false;
    stop.disabled = true;
    alert("Stopped spamming!");
});

async function send() {
    const payload = {
        username: username.value,
        avatar_url: avatar_url.value,
        content: messageInput.value, // Changed to messageInput to avoid conflict
    };

    try {
        await fetch(url.value, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload),
        });
    } catch (e) {
        console.log(e); // Log errors
    }
}

deleteBtn.addEventListener("click", async () => {
    if (!delUrl.value) {
        alert("Please fill out all required info!");
        return false;
    }
    try {
        const res = await fetch(delUrl.value);
        if (!res.ok) {
            throw new Error(`Error: ${res.status} ${res.statusText}`);
        }
        del(); // Call delete function if the URL is correct
        alert("Success, webhook deleted successfully!");
    } catch (e) {
        alert("Invalid webhook URL!");
    }
});

async function del() {
    try {
        await fetch(delUrl.value, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
        });
    } catch (e) {
        console.log(e);
    }
}

// particles.js configuration
particlesJS('particles-js', {
    "particles": {
        "number": {
            "value": 80, // Number of particles
            "density": {
                "enable": true,
                "value_area": 800
            }
        },
        "color": {
            "value": "#7800d2" // Particle color
        },
        "shape": {
            "type": "circle", // Shape of particles
            "stroke": {
                "width": 0,
                "color": "#000000"
            }
        },
        "opacity": {
            "value": 0.5, // Transparency of particles
            "random": false,
            "anim": {
                "enable": true,
                "speed": 1,
                "opacity_min": 0.1
            }
        },
        "size": {
            "value": 5, // Size of particles
            "random": true,
            "anim": {
                "enable": true,
                "speed": 2,
                "size_min": 0.1
            }
        },
        "move": {
            "enable": true,
            "speed": 3, // Speed of particle movement
            "direction": "none",
            "random": false,
            "straight": false,
            "out_mode": "out"
        }
    },
    "interactivity": {
        "events": {
            "onhover": {
                "enable": true,
                "mode": "repulse" // Particles move away when mouse hovers over them
            }
        }
    },
    "retina_detect": true
});
