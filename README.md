# User Analytics Dashboard

A full-stack analytics platform that tracks user interactions on a website, stores behavioral data in MongoDB, and visualizes insights through dashboards, session analytics, and heatmaps.

This project was built as a Full Stack Engineering assignment to demonstrate event tracking, session management, user authentication, data visualization, and REST API development using the MERN stack.

---

## Features

### Authentication
- User Registration
- User Login
- JWT-based Authentication
- Protected API Routes

### Event Tracking
- Page View Tracking
- Click Event Tracking
- Session Identification
- User Activity Logging
- Timestamp-based Event Storage

### Dashboard Analytics
- Total Events
- Total Sessions
- Total Clicks
- Real-time Analytics Overview

### Session Analytics
- Session-wise Activity Tracking
- Event Count per Session
- Click Count per Session
- Last Active Time

### Heatmap Analytics
- Click Coordinate Collection
- Page-wise Heatmap Data
- User Interaction Visualization
- Behavior Analysis

---

## Tech Stack

### Frontend
- React.js
- Vite
- React Router DOM
- Axios
- Tailwind CSS
- Lucide React

### Backend
- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JWT Authentication
- bcryptjs
- dotenv
- cors

---

# Project Structure

```text
User_Analytics_App
│
├── Backend
│   │
│   ├── config
│   │
│   ├── models
│   │   ├── Events.js
│   │   ├── heatmap.js
│   │   └── User.js
│   │
│   ├── routes
│   │   ├── auth.js
│   │   ├── events.js
│   │   ├── heatmap.js
│   │   └── sessions.js
│   │
│   ├── middleware.js
│   ├── .env
│   ├── index.js
│   ├── log.txt
│   ├── package.json
│   └── package-lock.json
│
├── Frontend
│   │
│   ├── public
│   │
│   ├── src
│   │   │
│   │   ├── api
│   │   │
│   │   ├── assets
│   │   │
│   │   ├── components
│   │   │   ├── Sidebar.jsx
│   │   │   └── Topbar.jsx
│   │   │
│   │   ├── pages
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Sessions.jsx
│   │   │   └── Heatmap.jsx
│   │   │
│   │   ├── tracker.js
│   │   ├── ThemeContext.jsx
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── index.css
│   │   └── main.jsx
│   │
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   └── index.html
│
└── README.md
```

---

# Installation

## Clone Repository

```bash
git clone https://github.com/maneesh248/user_analytics_app.git

cd user_analytics_app
```

---

# Backend Setup

Move into Backend directory:

```bash
cd Backend
```

Install dependencies:

```bash
npm install
```

Create `.env` file:

```env
PORT=4001

MONGODB_URI=your_mongodb_atlas_connection_string

JWT_SECRET=your_secret_key
```

Run backend server:

```bash
npm run dev
```

Server runs at:

```text
http://localhost:4001
```

---

# Frontend Setup

Move into Frontend directory:

```bash
cd Frontend
```

Install dependencies:

```bash
npm install
```

Run development server:

```bash
npm run dev
```

Application runs at:

```text
http://localhost:5173
```

---

# API Endpoints

## Authentication

### Register User

```http
POST /api/auth/register
```

Request Body:

```json
{
  "name": "Maneesh",
  "email": "maneesh@gmail.com",
  "password": "123456"
}
```

---

### Login User

```http
POST /api/auth/login
```

Request Body:

```json
{
  "email": "maneesh@gmail.com",
  "password": "123456"
}
```

---

## Event Tracking

### Create Event

```http
POST /api/events
```

Request Body:

```json
{
  "sessionId": "session_123",
  "eventType": "click",
  "pageUrl": "/dashboard",
  "x": 500,
  "y": 300
}
```

---

## Session Analytics

### Get All Sessions

```http
GET /api/sessions
```

---

## Heatmap Analytics

### Get Heatmap Data

```http
GET /api/heatmap?page=/dashboard
```

---

# Database Models

## User

```javascript
{
  name: String,
  email: String,
  password: String
}
```

## Event

```javascript
{
  sessionId: String,
  eventType: String,
  pageUrl: String,
  timestamp: Date
}
```

## Heatmap

```javascript
{
  pageUrl: String,
  x: Number,
  y: Number,
  timestamp: Date
}
```

---

# Application Workflow

1. User registers and logs in.
2. Frontend generates session tracking.
3. User interactions are captured by tracker.js.
4. Events are sent to the Express backend.
5. Backend stores data in MongoDB Atlas.
6. Dashboard fetches analytics data.
7. Sessions page displays session-wise information.
8. Heatmap page visualizes click coordinates.

---

# Future Improvements

- Real-time Analytics using Socket.IO
- Advanced Heatmap Visualization
- Session Replay
- Export Reports (CSV/PDF)
- User Role Management
- Date Range Filters
- Analytics Charts and Graphs
- Performance Monitoring

---

# Deployment

### Frontend
Vercel

### Backend
Render

### Database
MongoDB Atlas

---

# Author

### Maneesh Ulari

GitHub: https://github.com/maneesh248

Full Stack User Analytics Dashboard built using React, Node.js, Express, MongoDB Atlas, JWT Authentication, Session Tracking, and Heatmap Analytics.
