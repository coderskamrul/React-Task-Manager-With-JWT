# React Task Manager with JWT



A feature-rich task management system built with **ReactJS**, **NodeJS**, **ExpressJS**, **JWT**, **Socket.IO**, **MongoDB**, **CSS**, and **Tailwind CSS**. This project enables streamlined task management for developers and administrators, including real-time updates and collaboration features.

## Features

### Admin Features:

- Assign specific users to project access and individual task access.
- Manage and organize tasks across multiple columns.
- Analyze task and project progress from the admin dashboard.

### Developer/User Features:

- View personalized dashboard with tasks and progress.
- Create, update, and organize tasks with drag-and-drop functionality.
- Create and manage task columns dynamically.
- Analyze personal productivity and task progress.
- Engage in real-time conversations using the built-in chat system.

## Technologies Used

- **Frontend:** ReactJS, Tailwind CSS, CSS
- **Backend:** NodeJS, ExpressJS, MongoDB
- **Authentication:** JSON Web Tokens (JWT)
- **Real-Time Communication:** Socket.IO

## Project Structure

```
React-Task-Manager-With-JWT/
|-- backend/              # Backend files and APIs
|-- client/               # Frontend React application
|-- .env                  # Environment variables for server
|-- .env.local            # Environment variables for client
|-- package.json          # Project dependencies
|-- README.md             # Project documentation
```

# Project Demo:
#### Home
 ![Github Banner](https://github.com/coderskamrul/coderskamrul/blob/main/img/tasks-img/Task%20manager%20Project%20view%2000.png)
#### Projects
 ![Github Banner](https://github.com/coderskamrul/coderskamrul/blob/main/img/tasks-img/Task%20manager%20Project%20view%2001.png)
#### Tasks
 ![Github Banner](https://github.com/coderskamrul/coderskamrul/blob/main/img/tasks-img/Task%20manager%20Project%20view%2002.png)
 #### Specific Task Popup
 ![Github Banner](https://github.com/coderskamrul/coderskamrul/blob/main/img/tasks-img/Task%20manager%20Project%20view%2003.png)
 #### Create New Task
 ![Github Banner](https://github.com/coderskamrul/coderskamrul/blob/main/img/tasks-img/Task%20manager%20Project%20view%2004.png)
 #### Users
 ![Github Banner](https://github.com/coderskamrul/coderskamrul/blob/main/img/tasks-img/Task%20manager%20Project%20view%2005.png)
## Installation and Setup

### Prerequisites

Ensure you have the following installed:

- Node.js (v16 or higher)
- MongoDB

### Steps

1. **Clone the Repository:**

```bash
git clone https://github.com/coderskamrul/React-Task-Manager-With-JWT.git
cd React-Task-Manager-With-JWT
```

2. **Backend Setup:**

- Navigate to the `backend` directory:

```bash
cd backend
```

- Install dependencies:

```bash
npm install
```

- Create a `.env` file with the following variables:

```
PORT = 5000
USER_NAME = <your_database_username>
USER_PASSWORD = <your_database_password>
JWT_SECRET_TOKEN = <your_jwt_secret>
```

- Start the server:

```bash
npm start
```

3. **Frontend Setup:**

- Navigate to the `client` directory:

```bash
cd ../client
```

- Install dependencies:

```bash
npm install
```

- Create a `.env.local` file with the following variables:

```
VITE_apiKey = <your_firebase_api_key>
VITE_authDomain = <your_firebase_auth_domain>
VITE_projectId = <your_firebase_project_id>
VITE_storageBucket = <your_firebase_storage_bucket>
VITE_messagingSenderId = <your_firebase_messaging_sender_id>
VITE_appId = <your_firebase_app_id>
```

- Start the React app:

```bash
npm run dev
```

### Access the Application

- Backend: [http://localhost:5000](http://localhost:5000)
- Frontend: [http://localhost:5173](http://localhost:5173)

## Usage

1. **Admin Login:**
   - Use the admin credentials to log in and manage projects, tasks, and users.
2. **User Registration/Login:**
   - Users can log in to view assigned projects and tasks.
3. **Real-Time Collaboration:**
   - Users can chat and see live task updates.

## Screenshots

### Admin Dashboard



### User Dashboard



### Task Management



### Real-Time Chat



## Environment Variables

### Server (`.env`)

```
PORT = 5000
USER_NAME = <your_database_username>
USER_PASSWORD = <your_database_password>
JWT_SECRET_TOKEN = <your_jwt_secret>
```

### Client (`.env.local`)

```
VITE_apiKey = <your_firebase_api_key>
VITE_authDomain = <your_firebase_auth_domain>
VITE_projectId = <your_firebase_project_id>
VITE_storageBucket = <your_firebase_storage_bucket>
VITE_messagingSenderId = <your_firebase_messaging_sender_id>
VITE_appId = <your_firebase_app_id>
```

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request for review.

## License

This project is licensed under the MIT License. See the LICENSE file for details.

## Contact

**Md. Kamrul Hasan**\
[GitHub](https://github.com/coderskamrul)\
Email: [mdkamrul2058@gmail.com](mailto\:mdkamrul2058@gmail.com)

