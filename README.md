# Chat App React & Firebase
This is a real-time chat application built using React and Firebase. It allows users to sign up, log in, and exchange messages in real-time with other users.

## Features
- **Real-time messaging**: Send and receive messages instantly using Firebase's real-time database.
- **User authentication**: Secure sign-up and login using Firebase Authentication.
- **Responsive design**: Fully responsive UI (Still testing on other screen sizes :) ) .
- **Firebase Firestore**: Messages are stored in Firebase Firestore, enabling seamless real-time updates.

## Setup and Installation
To run this project locally, follow these steps:

1. Set up Firebase:
  * Create a new project on Firebase.
  * Enable Authentication (Email/Password).
  * Enable Storage
  * Create a Firestore database.
  * Copy the Firebase config details from the Firebase console.
  * Replace the values in `src/firebase.js` or make a .env file ex:
    ```
    APIKEY="your_ApiKey"
    AUTHDOMAIN="your_AuthDomain"
    PROJECTID="your_ProjectId"
    STORAGEBUCKET="your_StorageBucket"
    MESSAGINSENDERID="your_MessagingSenderId"
    APPID="your_AppId"
    ```

2. Clone the repository:
```bash
git clone https://github.com/elfadili-ae/chat-app.git
cd chat-app
```

3. Run the app:
```bash
npm run dev
```


## Usage
1. Sign up with an email and password.
2. Log in to start chatting.
3. Enjoy real-time messaging with other users.


## Contributing
If you'd like to contribute to this project, please feel free to submit a pull request or open an issue.
