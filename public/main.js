const socket = io();

// DOM references
const clientsTotal = document.getElementById('client-total');
const messageContainer = document.getElementById('message-container');
const nameInput = document.getElementById('name-input');
const messageForm = document.getElementById('message-form');
const messageInput = document.getElementById('message-input');
const privateUserSelect = document.getElementById('private-user-select');
const messageTone = new Audio('/message-tone.mp3');

// On submit, send message
messageForm.addEventListener('submit', (e) => {
  e.preventDefault();
  sendMessage();
});

// Send user's name to server
nameInput.addEventListener('blur', () => {
  if (nameInput.value.trim()) {
    socket.emit('set-name', nameInput.value.trim());
  }
});

// Update total client count (optional)
socket.on('clients-total', (count) => {
  clientsTotal.innerText = `Total Clients: ${count}`;
});

// Update user dropdown with usernames
socket.on('update-users', (users) => {
  privateUserSelect.innerHTML = `<option value="all">All Users</option>`;
  for (let [id, name] of Object.entries(users)) {
    if (id !== socket.id) {
      privateUserSelect.innerHTML += `<option value="${id}">${name}</option>`;
    }
  }
});

// Send a message to server
function sendMessage() {
  const message = messageInput.value.trim();
  const name = nameInput.value.trim();

  if (!message || !name) return;

  const data = {
    name,
    message,
    dateTime: new Date(),
    recipient: privateUserSelect.value,
  };

  socket.emit('message', data); // Send to server
  const isPrivate = data.recipient !== 'all';
  addMessageToUI(true, data, isPrivate); // Add to sender UI

  messageInput.value = '';
}

// Receive a message from server
socket.on('chat-message', (data) => {
  messageTone.play();
  const isPrivate = data.recipient !== 'all';
  addMessageToUI(false, data, isPrivate);
});

// Show message in chat UI
function addMessageToUI(isOwnMessage, data, isPrivate = false) {
  clearFeedback();

  const senderLabel = isOwnMessage ? 'You' : data.name;
  const recipientLabel =
    data.recipient === 'all' ? 'All Users' : data.recipientName || 'Unknown';
  const privateTag = isPrivate ? `🔒 Private to ${recipientLabel}` : '';

  const element = `
    <li class="${isOwnMessage ? 'message-right' : 'message-left'} ${
    isPrivate ? 'private-message' : ''
  }">
      <p class="message">
        ${data.message}
        <span>${senderLabel} → ${recipientLabel} ${privateTag} ● ${moment(
    data.dateTime
  ).fromNow()}</span>
      </p>
    </li>
  `;
  messageContainer.innerHTML += element;
  scrollToBottom();
}

// Typing indicator
messageInput.addEventListener('focus', sendTypingFeedback);
messageInput.addEventListener('keypress', sendTypingFeedback);
messageInput.addEventListener('blur', () =>
  socket.emit('feedback', { feedback: '' })
);

function sendTypingFeedback() {
  if (nameInput.value.trim()) {
    socket.emit('feedback', {
      feedback: `✍️ ${nameInput.value.trim()} is typing...`,
    });
  }
}

// Receive typing feedback
socket.on('feedback', (data) => {
  clearFeedback();
  if (data.feedback) {
    const element = `
      <li class="message-feedback">
        <p class="feedback" id="feedback">${data.feedback}</p>
      </li>
    `;
    messageContainer.innerHTML += element;
  }
});

// Clear typing feedback
function clearFeedback() {
  document.querySelectorAll('li.message-feedback').forEach((el) =>
    el.remove()
  );
}

// Scroll chat to bottom
function scrollToBottom() {
  messageContainer.scrollTo(0, messageContainer.scrollHeight);
}
