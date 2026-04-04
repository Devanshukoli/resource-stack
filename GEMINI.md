# GEMINI.md - Resource Stack Project Guide

This file provides a comprehensive overview of the Resource Stack project, including its structure, architecture, and quick setup instructions for developers.

## 📋 Project Overview
Resource Stack is a full-stack web application designed for organizing and managing various types of resources (text, links, etc.) with a unique stack-based UI. It features a React frontend and a Node.js/Express backend with MongoDB storage.

---

## 📂 Project Structure

```text
resource-stack/
├── backend/                # Node.js + Express API
│   ├── src/
│   │   ├── config/         # Database configuration (MongoDB)
│   │   ├── controllers/    # Route handlers & logic
│   │   ├── models/         # Mongoose schemas (Resource, Image)
│   │   └── routes/         # API endpoint definitions
│   ├── server.js           # Express server entry point
│   └── package.json        # Backend dependencies & scripts
├── frontend/               # React + Vite application
│   ├── src/
│   │   ├── components/     # React UI components (ResourceCard, Stack, etc.)
│   │   ├── contexts/       # React Contexts (ThemeContext)
│   │   ├── App.jsx         # Main application component
│   │   └── main.jsx        # Frontend entry point
│   ├── package.json        # Frontend dependencies & scripts
│   └── vite.config.js      # Vite configuration
├── ARCHITECTURE.md         # Detailed architectural breakdown
├── DEVELOPER_GUIDE.md      # Guide for extending the project
├── QUICKSTART.md           # Rapid setup guide
├── UI_GUIDE.md             # UI/UX design and component guide
└── README.md               # General project information
```

---

## 🏗️ Architecture

### High-Level Design
The application follows a classic Client-Server architecture:
- **Frontend (React/Vite):** Handles UI/UX, state management (using `useState`, `useEffect`), and communicates with the backend via RESTful API calls.
- **Backend (Node.js/Express):** Provides RESTful endpoints, handles business logic, and interacts with the database.
- **Database (MongoDB):** Persistent storage for resource documents.

### Data Flow
1. **Create:** `AddResourceForm` -> `POST /resources` -> MongoDB.
2. **Read:** `App` (on mount) -> `GET /resources` -> Display in `ResourceStack`.
3. **Update:** `ResourceCard` (edit mode) -> `PUT /resources/:id` -> MongoDB.
4. **Patch:** `ResourceCard` (checkbox) -> `PATCH /resources/:id/check` -> MongoDB.
5. **Delete:** `ResourceCard` -> `FeedbackModal` -> `DELETE /resources/:id` -> MongoDB.

---

## 🚀 Quick Installation

### 1. Prerequisites
- Node.js (v14+)
- MongoDB (Local or Atlas)

### 2. Backend Setup
```bash
cd backend
npm install
# Create .env based on .env.example and set MONGODB_URI
npm run dev
```
*Backend runs at: `http://localhost:5000`*

### 3. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```
*Frontend runs at: `http://localhost:5173`*

---

## 🛠️ Tech Stack
- **Frontend:** React 18, Vite, Axios, CSS3 (Vanilla).
- **Backend:** Node.js, Express.js, Mongoose.
- **Database:** MongoDB.

## 🎯 Key Features
- **Stack-based UI:** Visual representation of resources.
- **Checkbox Layer:** Mark resources as "completed".
- **Inline Editing:** Edit titles and content directly on the card.
- **Feedback System:** Capture notes before resource deletion.
- **Responsive Design:** Optimized for all device sizes.
