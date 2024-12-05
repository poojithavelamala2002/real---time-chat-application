##Chat Application with Socket.IO
This is a real-time chat application built using Node.js, Express.js, and Socket.IO. The app allows users to send public and private messages, view typing indicators, and receive audio notifications for new messages.

##Features:
Real-time messaging with Socket.IO
Broadcast messages to all users
Send private messages to specific users
Typing indicator for active users
Live user count display
Notification sound for incoming messages
Getting Started
Prerequisites
Ensure you have the following installed on your system:

Node.js (v14 or higher)
A web browser (Chrome, Edge, Firefox, etc.)
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
Open the app in your browser:

arduino
Copy code
http://localhost:4000
Usage
Basic Setup
Open the application in your browser.
Enter a username in the "Name Input" field.
Start typing a message in the input field at the bottom.
Click "Send" or press Enter to send the message.
Private Messaging
Use the dropdown labeled "Send a private message" to select a user.
Type your message and send. Only the selected user will see the message.
Typing Indicator
When a user types, others will see a typing indicator (✍️ <username> is typing...).
Folder Structure
csharp
Copy code
chat-socket.io/
│
├── public/
│   ├── index.html           # Main HTML file
│   ├── style.css            # CSS for styling
│   ├── main.js              # Client-side JavaScript
│   └── message-tone.mp3     # Audio notification file
│
├── app.js                   # Main server file
├── package.json             # Dependencies and scripts
├── package-lock.json        # Lockfile for dependencies
└── README.md                # Project documentation
Scripts
Start the server:
bash
Copy code
npm start

##Testing the App
Open the app in two browser windows or tabs:
One in normal mode and another in incognito/private mode.
Or, use two different browsers.
Test public messages by sending messages with "All Users" selected.
Test private messages by selecting a specific user in the dropdown.
Verify the typing indicator and user count updates.
Known Issues
Typing indicators may persist for a few seconds after a user stops typing.
Private messages rely on socket.id, which refreshes if the user reloads their browser.

##Contributing
Feel free to fork the repository and submit pull requests for any new features or bug fixes.

