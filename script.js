const socket = io('http://localhost:3000');
const messageContainer = document.getElementById('message-container');
const messageForm = document.getElementById('send-container');
const messageInput = document.getElementById('message-input');
const usernameForm = document.getElementById('username-container');
const usernameInput = document.getElementById('username-input');
const usernameDisplay = document.getElementById('username-display');

usernameForm.addEventListener('submit', e => {
    e.preventDefault();
    let userName = usernameInput.value.trim();
    if (!userName) {
        alert('Please enter your name to join the chat.');
        return;
    }
    appendMessage('You joined');
    socket.emit('new-user', userName);
    usernameForm.style.display = 'none';
    usernameDisplay.innerText = `Logged in as: ${userName}`;
    messageForm.style.display = 'flex';
});

socket.on('chat-message', data => {
    appendMessage(`${data.name}: ${data.message}`);
});

socket.on('user-connected', userName => {
    appendMessage(`${userName} connected`);
});

socket.on('user-disconnected', userName => {
    appendMessage(`${userName} disconnected`);
});

messageForm.addEventListener('submit', e => {
    e.preventDefault();
    const message = messageInput.value.trim();
    if (!message) {
        // alert('Please enter a message before sending.');
        return;
    }
    appendMessage(`You: ${message}`);
    socket.emit('send-chat-message', message);
    messageInput.value = '';
});

function appendMessage(message) {
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageContainer.append(messageElement);
}
