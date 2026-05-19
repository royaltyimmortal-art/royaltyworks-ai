function addMessage(text, className) {

const chatBox = document.getElementById("chat-box");

const messageDiv = document.createElement("div");

messageDiv.classList.add(className);

messageDiv.textContent = text;

chatBox.appendChild(messageDiv);

chatBox.scrollTop = chatBox.scrollHeight;
}

async function sendMessage() {

const input = document.getElementById("user-input");

const text = input.value.trim();

if (!text) return;

addMessage(text, "user-message");

input.value = "";

try {

const response = await fetch("/api/chat", {

method: "POST",

headers: {
"Content-Type": "application/json"
},

body: JSON.stringify({
message: text
})

});

const data = await response.json();

addMessage(data.reply, "bot-message");

} catch (error) {

addMessage("Error connecting to AI.", "bot-message");

}

}

