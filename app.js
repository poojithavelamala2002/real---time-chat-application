const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 4002;

// Start server
const server = app.listen(PORT, () =>
  console.log(`💬 Server running on port ${PORT}`)
);

// Initialize Socket.IO
const io = require('socket.io')(server);

// Serve static files from /public
app.use(express.static(path.join(__dirname, 'public')));

// Track connected users and their names
let users = {}; // { socketId: username }

io.on('connection', (socket) => {
  console.log('Socket connected:', socket.id);

  // When user sets their name
  socket.on('set-name', (name) => {
    users[socket.id] = name;
    io.emit('update-users', users); // Send updated users list to all clients
    io.emit('clients-total', Object.keys(users).length); // Now emits correct count

  });

  // Typing indicator
  socket.on('feedback', (data) => {
    socket.broadcast.emit('feedback', data);
  });

  // Public or private message handling
  socket.on('message', (data) => {
    const senderName = users[socket.id] || 'Unknown';
    const recipientName =
      data.recipient === 'all' ? 'All Users' : users[data.recipient] || 'Unknown';

    const messageData = {
      ...data,
      senderId: socket.id,
      name: senderName,
      recipientName,
    };

    if (data.recipient && data.recipient !== 'all') {
      // Private message to selected user and echo to sender
      socket.to(data.recipient).emit('chat-message', messageData);
      socket.emit('chat-message', messageData);
    } else {
      // Public message to all other users
      socket.broadcast.emit('chat-message', messageData);
    }
  });

  // When user disconnects
  socket.on('disconnect', () => {
    console.log('Socket disconnected:', socket.id);
    delete users[socket.id];
    io.emit('update-users', users); // Update client dropdown
    io.emit('clients-total', Object.keys(users).length); // Update count on disconnect
  });
});
