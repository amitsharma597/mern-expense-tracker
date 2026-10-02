# 💰 MERN Expense Tracker

A full-stack expense management application built with the **MERN stack**. The application allows users to securely manage their expenses, track spending activity, view analytics, and interact with an integrated AI assistant.

🔗 **Live Demo:** https://mern-expense-tracker-kappa.vercel.app

---

## 📌 Overview

MERN Expense Tracker is a full-stack web application designed to provide users with a simple and modern way to manage their personal expenses.

The project demonstrates the development of a complete MERN application, including frontend development, backend REST APIs, database management, authentication, AI integration, and production deployment.

Users can create an account, securely log in, manage their expenses, view financial analytics, and interact with an AI-powered assistant.

---

## ✨ Features

### 🔐 Authentication

- User registration
- User login
- JWT-based authentication
- Protected routes
- Persistent authentication
- User-specific expense data

### 💸 Expense Management

- Add new expenses
- Edit existing expenses
- Delete expenses
- View expense history
- Track total spending
- View recent expenses

### 📊 Analytics

- Analyze spending activity
- View organized financial data
- Understand expense patterns
- Display financial information through analytics

### 🤖 AI Assistant

- Integrated AI assistant
- Expense-related assistance
- Backend AI API integration
- AI-powered interaction with expense information

### 🎨 User Interface

- Modern dashboard interface
- Responsive design
- Sidebar navigation
- Mobile-friendly layout
- Light and dark theme support
- Clean card-based UI
- Lucide icons

---

## 🛠️ Tech Stack

### Frontend

- React
- Vite
- JavaScript (ES6+)
- React Router
- CSS3
- Lucide React

### Backend

- Node.js
- Express.js
- REST API
- JWT
- Mongoose
- CORS
- dotenv

### Database

- MongoDB
- MongoDB Atlas

### AI

- Google Gemini API

### Deployment

- Vercel — Frontend
- Render — Backend
- MongoDB Atlas — Database

---

## 📂 Project Structure

```text
mern-expense-tracker/
│
├── client/
│   ├── public/
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── App.jsx
│   │   ├── App.css
│   │   └── main.jsx
│   │
│   ├── .env
│   ├── .gitignore
│   ├── eslint.config.js
│   ├── index.html
│   ├── package.json
│   ├── package-lock.json
│   ├── vercel.json
│   └── vite.config.js
│
├── server/
│   ├── config/
│   ├── controller/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── .env
│   ├── .gitignore
│   ├── app.js
│   ├── package.json
│   ├── package-lock.json
│   └── server.js
│
├── .gitignore
└── README.md
```

> `node_modules` folders are not included because they are generated automatically by npm and should not be committed to the repository.

---

## 🔑 Authentication

The application uses **JWT-based authentication** to protect user-specific routes and expense data.

### Authentication Flow

```text
User
  ↓
Register / Login
  ↓
Authentication API
  ↓
JWT Token
  ↓
Authentication State
  ↓
Protected Routes
  ↓
User Dashboard
```

Only authenticated users can access the main dashboard, expenses, analytics, and other protected application pages.

---

## 🔌 API

The backend provides REST API endpoints for authentication, expense management, and AI functionality.

### Authentication

```text
POST /api/auth/register
POST /api/auth/login
```

### Expenses

```text
GET    /api/expenses
POST   /api/expenses
PUT    /api/expenses/:id
DELETE /api/expenses/:id
```

### AI Assistant

```text
POST /api/ai/chat
```

The React frontend communicates with these backend endpoints using the configured API URL.

---

## ⚙️ Environment Variables

Environment variables are used to store configuration values and sensitive credentials.

### Client

Create a `.env` file inside the `client` folder:

```env
VITE_API_URL=http://localhost:5000
```

For production, the frontend uses the deployed backend URL:

```env
VITE_API_URL=https://mern-expense-tracker-n9is.onrender.com
```

### Server

Create a `.env` file inside the `server` folder:

```env
MONGO_URL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
GEMINI_API_KEY=your_gemini_api_key
PORT=5000
```

> Never commit `.env` files or expose API keys, database credentials, or JWT secrets publicly.

---

## 🚀 Getting Started

Follow the steps below to run the project locally.

### 1. Clone the Repository

```bash
git clone https://github.com/amitsharma597/mern-expense-tracker.git
```

### 2. Navigate to the Project

```bash
cd mern-expense-tracker
```

---

## 🖥️ Frontend Setup

Navigate to the client folder:

```bash
cd client
```

Install dependencies:

```bash
npm install
```

Create a `.env` file inside the `client` folder:

```env
VITE_API_URL=http://localhost:5000
```

Start the development server:

```bash
npm run dev
```

The frontend will normally be available at:

```text
http://localhost:5173
```

---

## ⚙️ Backend Setup

Open another terminal and navigate to the server folder:

```bash
cd server
```

Install dependencies:

```bash
npm install
```

Create a `.env` file inside the `server` folder:

```env
MONGO_URL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
GEMINI_API_KEY=your_gemini_api_key
PORT=5000
```

Start the backend:

```bash
npm start
```

The backend will normally run at:

```text
http://localhost:5000
```

---

## 🗄️ Database

The application uses **MongoDB** with **Mongoose** for database management.

MongoDB stores application data such as:

- User accounts
- Expense records

The production application uses **MongoDB Atlas**.

---

## 🌐 Deployment

The project is deployed using separate frontend and backend services.

### Frontend

The React frontend is deployed on **Vercel**.

🔗 https://mern-expense-tracker-kappa.vercel.app

### Backend

The Express backend is deployed on **Render**.

🔗 https://mern-expense-tracker-n9is.onrender.com

### Database

The production database is hosted on **MongoDB Atlas**.

---

## 📚 What I Learned

This project helped me practice and understand:

- React component architecture
- React Router
- React state management
- Context API
- REST API development
- Express.js
- MongoDB and Mongoose
- JWT authentication
- Protected routes
- CRUD operations
- API error handling
- CORS configuration
- Environment variables
- MongoDB Atlas
- Vercel deployment
- Render deployment
- AI API integration
- Production environment configuration

---

## 🎯 Project Goals

The main goal of this project was to build a practical full-stack application while understanding how the different parts of a MERN application work together.

The project focuses on:

- Building a responsive React frontend
- Creating REST APIs with Express.js
- Managing data with MongoDB
- Implementing authentication
- Connecting frontend and backend services
- Integrating AI functionality
- Deploying a full-stack application to production

---

## 👨‍💻 Author

**Amit Sharma**

MERN Stack Developer

GitHub:  
https://github.com/amitsharma597

---

## ⭐ Support

If you found this project useful or interesting, consider giving the repository a ⭐ on GitHub.
