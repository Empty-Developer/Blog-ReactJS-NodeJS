# 📝 Blog — Blog-ReactJS-NodeJS

![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![Mongoose](https://img.shields.io/badge/Mongoose-880000?style=for-the-badge&logo=mongoose&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=json-web-tokens&logoColor=white)
![Bcrypt](https://img.shields.io/badge/Bcrypt-003A70?style=for-the-badge&logo=lock&logoColor=white)
![Express Validator](https://img.shields.io/badge/Express_Validator-FF2D20?style=for-the-badge&logo=express&logoColor=white)
![Nodemon](https://img.shields.io/badge/NODEMON-%23323330.svg?style=for-the-badge&logo=nodemon&logoColor=%BBDEAD)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)



A full-featured blog platform for publishing. The project includes a powerful Node.js backend and a modern React SPA on the frontend.

---

## ✨ Features

- **📚 Full CRUD** — Create, read, update, and delete posts with ease
- **🔐 Authentication** — Secure registration and login using JWT + BCrypt password hashing
- **🖼 Media Uploads** — Upload and store images for articles directly on the server
- **🏷 Tag System** — Filter and explore content by tags
- **✅ Server-side Validation** — Strict input validation via Express Validator

---

## 🛠 Tech Stack

### Frontend

| Technology | Purpose |
|---|---|
| [React 18](https://react.dev/) | UI library |
| [Redux Toolkit](https://redux-toolkit.js.org/) | State management (posts + user session) |
| [Material UI (MUI)](https://mui.com/) | Adaptive, modern component library |
| [React Router v6](https://reactrouter.com/) | Client-side routing |

### Backend

| Technology | Purpose |
|---|---|
| [Node.js](https://nodejs.org/) | Runtime |
| [Express](https://expressjs.com/) | Web framework |
| [MongoDB](https://www.mongodb.com/) + [Mongoose](https://mongoosejs.com/) | Database & ODM |
| [JWT](https://jwt.io/) | Authentication tokens |
| [Multer](https://github.com/expressjs/multer) | File upload handling |

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm
- A MongoDB connection string (e.g., [MongoDB Atlas](https://www.mongodb.com/cloud/atlas))

---

### 1. Clone the repository

```bash
git clone https://github.com/your-username/blog.git
cd blog
```

---

### 2. Start the Backend

```bash
cd server
```

Create a `.env` file in the `server` folder:

```env
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/blog
JWT_SECRET=your_jwt_secret_key
PORT=4444
```

Install dependencies and start the dev server:

```bash
npm install
npm run dev
```

The backend will be available at `http://localhost:4444`.

---

### 3. Start the Frontend

Open a new terminal:

```bash
cd client
npm install
npm start
```

The app will be available at `http://localhost:3000`.

---

## 📡 API Endpoints

### Auth

| Method | Endpoint | Description | Auth required |
|---|---|---|---|
| `POST` | `/auth/register` | Register a new user | No |
| `POST` | `/auth/login` | Login and receive JWT | No |
| `GET` | `/auth/me` | Get current user data | ✅ Yes |

### Posts

| Method | Endpoint | Description | Auth required |
|---|---|---|---|
| `GET` | `/posts` | Get all posts | No |
| `GET` | `/posts/:id` | Get a single post | No |
| `POST` | `/posts` | Create a new post | ✅ Yes |
| `PATCH` | `/posts/:id` | Update a post | ✅ Yes |
| `DELETE` | `/posts/:id` | Delete a post | ✅ Yes |

### Services

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/upload` | Upload an image |
| `GET` | `/tags` | Get popular tags |

---

## 🏗 Architecture

- **`checkAuth` middleware** — Protects private routes by verifying the JWT token from request headers
- **`handleValidationErrors` middleware** — Centralized validation error handling
- **Separation of concerns** — Code is split into controllers, validators, and utilities for easy maintenance and scaling

---