Chat Application with Socket.IO
A real-time chat application built with Node.js, Express.js, and Socket.IO, featuring public and private messaging, typing indicators, and audio notifications.

Key Features
Real-time Messaging: Broadcast messages or send private messages to users.
Typing Indicators: Displays when a user is typing.
User Tracking: Live user count and session tracking.
Audio Notifications: Alerts for incoming messages.
Getting Started
Prerequisites
Ensure the following are installed:

Node.js (v14 or higher)
A web browser (e.g., Chrome, Edge)
Installation
Clone the repository:
bash
Copy code
git clone https://github.com/poojithavelamala2002/chat-socket.io.git
cd chat-socket.io
Install dependencies:
bash
Copy code
npm install
Start the server:
bash
Copy code
npm start
Open in your browser:
text
Copy code
http://localhost:4000
Usage
Open the app in a browser.
Enter a username and start sending messages.
Use the dropdown to send private messages.
Typing indicators and user counts are updated live.
Folder Structure
plaintext
Copy code
chat-socket.io/
├── public/
│   ├── index.html       # Main HTML file
│   ├── style.css        # Styles
│   ├── main.js          # Client-side logic
│   └── message-tone.mp3 # Audio file
├── app.js               # Server logic
├── package.json         # Project metadata
└── README.md            # Documentation
Testing
Open the app in two browser windows or tabs.
Test public and private messaging.
Verify typing indicators and live user tracking.
Known Issues
Typing indicators may persist momentarily after a user stops typing.
Private messaging depends on socket.id, which resets if the user reloads.
Contributing
Contributions are welcome! Fork the repository and submit a pull request for new features or bug fixes.







