# 📚 Bookstore Frontend

This project is the frontend application for the **Bookstore** platform.  
It is built with **React (Vite)** and communicates with a secured **Spring Boot REST API** using JWT authentication.

---

## 🚀 Technologies Used
- React (Vite)
- JavaScript (ES6+)
- Fetch API
- JWT Authentication
- Custom CSS

---

## ✨ Features

### 👤 Authentication
- User registration
- User login
- JWT-based authentication
- Logout

### 📚 Books
- Public book listing
- Display title, author, description

### 🔐 Admin Features
- Create books
- Delete books

---

## 📦 Installation

```bash
npm install
npm run dev
```

Frontend runs on:
http://localhost:5173

---

## 🔗 Backend

Backend must run on:
http://localhost:8080

Main endpoints:
- POST /api/auth/login
- POST /api/users/register
- GET /api/books
- POST /api/books (ADMIN)
- DELETE /api/books/{id} (ADMIN)

---

## 🔐 Security
JWT token stored in localStorage and sent using:
Authorization: Bearer <token>

---

## 🧭 Project Structure

src/
- App.jsx
- Login.jsx
- Register.jsx
- Books.jsx
- CreateBook.jsx
- index.css
- main.jsx

---

## 🎨 UI
Library-inspired UI with custom CSS.

---

## 📌 Author
Web Services / Spring Boot assignment.
