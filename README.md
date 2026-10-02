# 💰 MERN Expense Tracker

A full-stack expense management application built with the **MERN stack**. The application allows users to securely manage their expenses, track spending activity, view analytics, and interact with an integrated AI assistant.

🔗 **Live Demo:** https://mern-expense-tracker-kappa.vercel.app

---

## 📌 Overview

MERN Expense Tracker is a portfolio-focused full-stack web application designed to demonstrate the development of a modern expense management system.

The project includes:

- User authentication
- Expense management
- Financial analytics
- REST API integration
- MongoDB database management
- JWT-based authentication
- AI assistant integration
- Responsive React interface
- Production deployment

The frontend is built with **React and Vite**, while the backend uses **Node.js and Express.js** with **MongoDB** as the database.

---

## ✨ Features

### 🔐 Authentication

- User registration
- User login
- JWT authentication
- Protected routes
- Persistent authentication using local storage
- User-specific expense data

### 💸 Expense Management

- Add expenses
- Edit expenses
- Delete expenses
- View expense history
- Track total spending
- Display recent expenses

### 📊 Analytics

- Visualize spending activity
- Analyze expense data
- View financial statistics
- Organized dashboard for easier expense tracking

### 🤖 AI Assistant

- Integrated AI assistant
- Expense-related assistance
- Backend API integration for AI requests

### 🎨 User Interface

- Modern dashboard design
- Responsive layout
- Sidebar navigation
- Mobile-friendly interface
- Light and dark theme support
- Clean card-based UI
- Lucide icons

---

## 🛠️ Tech Stack

### Frontend

- React
- Vite
- React Router
- JavaScript (ES6+)
- CSS3
- Lucide React

### Backend

- Node.js
- Express.js
- REST API
- JWT
- CORS
- dotenv

### Database

- MongoDB
- MongoDB Atlas
- Mongoose

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
│   ├── package.json
│   ├── vercel.json
│   └── vite.config.js
│
├── server/
│   ├── config/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── app.js
│   ├── server.js
│   ├── package.json
│   └── .env
│
├── .gitignore
└── README.md
```
