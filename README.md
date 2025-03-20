# Chat Application with Socket.IO
A real-time chat application built with Node.js, Express.js, and Socket.IO, featuring public and private messaging, typing indicators, and audio notifications.

# Key Features
- Real-time Messaging: Broadcast messages or send private messages to users.
- Typing Indicators: Displays when a user is typing.
- User Tracking: Live user count and session tracking.
- Audio Notifications: Alerts for incoming messages.
  
# Getting Started
## Prerequisites
- Ensure the following are installed:

1. Node.js (v14 or higher)
2. A web browser (e.g., Chrome, Edge)

## Installation
- Clone the repository:
```bash
git clone https://github.com/poojithavelamala2002/chat-socket.io.git
cd chat-socket.io
```
## Install dependencies:
```bash
npm install
```
## Start the server:
```bash
npm start
```
## Open in your browser:
```text
http://localhost:4000
```
## Usage
- Open the app in a browser.
- Enter a username and start sending messages.
- Use the dropdown to send private messages.
- Typing indicators and user counts are updated live.
  
## Folder Structure
```plaintext
chat-socket.io/
├── public/
│   ├── index.html       # Main HTML file
│   ├── style.css        # Styles
│   ├── main.js          # Client-side logic
│   └── message-tone.mp3 # Audio file
├── app.js               # Server logic
├── package.json         # Project metadata
└── README.md            # Documentation
```
## Testing
- Open the app in two browser windows or tabs.
- Test public and private messaging.
- Verify typing indicators and live user tracking.
  
## Known Issues
- Typing indicators may persist momentarily after a user stops typing.
- Private messages are sent based on socket IDs. However, if a user refreshes the page, their socket ID changes, making previous private connections invalid.

## Contributing
Contributions are welcome! Fork the repository and submit a pull request for new features or bug fixes.
To contribute:

- Fork the repository.
- Create a new branch (git checkout -b feature-name).
- Make your changes and commit (git commit -m "Added new feature").
- Push to your fork (git push origin feature-name).
- Submit a pull request with a clear description.








