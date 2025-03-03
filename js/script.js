const start = document.getElementById("start");
const stop = document.getElementById("stop");
const url = document.getElementById("url");
const username = document.getElementById("username");
const content = document.getElementById("message");
const avatar_url = document.getElementById("avatar");
const deleteBtn = document.getElementById("delete");
const delUrl = document.getElementById("delUrl");
let interval;

// Start Spamming
start.addEventListener("click", async () => {
    if (!url.value || !content.value) {
        alert("Please fill out all required info!");
        return false;
    }
    try {
        const res = await fetch(url.value);
        if (!res.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
        start.disabled = true;
        stop.disabled = false;
        alert("Started spamming!");
        interval = setInterval(send, 50);
    } catch (e) {
        alert("Invalid webhook URL!");
    }
});

// Stop Spamming
stop.addEventListener("click", async () => {
    clearInterval(interval);
    start.disabled = false;
    stop.disabled = true;
    alert("Stopped spamming!");
});

// Sending message to the webhook
async function send() {
    const payload = {
        username: username.value,
        avatar_url: avatar_url.value,
        content: content.value,
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
        console.log(e);
    }
}

// Deleting Webhook
deleteBtn.addEventListener("click", async () => {
    if (!delUrl.value) {
        alert("Please fill out all required info!");
        return false;
    }
    try {
        const res = await fetch(delUrl.value);
        if (!res.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
        del();
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

// Password protection logic
const correctPassword = 'yourpassword'; // Replace with your actual password

// Get elements for password protection
const submitPasswordButton = document.getElementById('submitPassword');
const passwordInput = document.getElementById('password');
const passwordPrompt = document
