const socket = io();

const clientsTotal = document.getElementById('client-total');
const messageContainer = document.getElementById('message-container');
const nameInput = document.getElementById('name-input');
const messageForm = document.getElementById('message-form');
const messageInput = document.getElementById('message-input');
const privateUserSelect = document.getElementById('private-user-select'); // Added for private messaging
const messageTone = new Audio('/message-tone.mp3');

messageForm.addEventListener('submit', (e) => {
  e.preventDefault();
  sendMessage();
});

// Update the total clients connected
socket.on('clients-total', (data) => {
  clientsTotal.innerText = `Total Clients: ${data}`;
});

// Populate the private chat dropdown
socket.on('update-users', (users) => {
  privateUserSelect.innerHTML = `<option value="all">All Users</option>`;
  users.forEach((userId) => {
    if (userId !== socket.id) {
      privateUserSelect.innerHTML += `<option value="${userId}">${userId}</option>`;
    }
  });
});

// Send a message
function sendMessage() {
  if (messageInput.value === '') return;

  const data = {
    name: nameInput.value,
    message: messageInput.value,
    dateTime: new Date(),
    recipient: privateUserSelect.value, // Add recipient for private messaging
  };

  socket.emit('message', data); // Emit message event
  addMessageToUI(true, data); // Show message on sender UI
  messageInput.value = '';
}

// Receive messages
socket.on('chat-message', (data) => {
  messageTone.play();
  addMessageToUI(false, data); // Show message on receiver UI
});

// Add message to the UI
function addMessageToUI(isOwnMessage, data) {
  clearFeedback();
  const element = `
      <li class="${isOwnMessage ? 'message-right' : 'message-left'}">
          <p class="message">
            ${data.message}
            <span>${data.name} ● ${moment(data.dateTime).fromNow()}</span>
          </p>
        </li>
        `;
  messageContainer.innerHTML += element;
  scrollToBottom();
}

// Scroll to the bottom of the message container
function scrollToBottom() {
  messageContainer.scrollTo(0, messageContainer.scrollHeight);
}

// Typing indicator events
messageInput.addEventListener('focus', () => {
  socket.emit('feedback', {
    feedback: `✍️ ${nameInput.value} is typing a message...`,
  });
});

messageInput.addEventListener('keypress', () => {
  socket.emit('feedback', {
    feedback: `✍️ ${nameInput.value} is typing a message...`,
  });
});

messageInput.addEventListener('blur', () => {
  socket.emit('feedback', {
    feedback: '',
  });
});

// Display typing feedback
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
  document.querySelectorAll('li.message-feedback').forEach((element) => {
    element.parentNode.removeChild(element);
  });
}
