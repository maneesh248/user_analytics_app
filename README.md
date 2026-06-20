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
MONGODB_URI=mongodb://manu_24:manu2005@ac-fwkgdk2-shard-00-00.zyyvjwd.mongodb.net:27017,ac-fwkgdk2-shard-00-01.zyyvjwd.mongodb.net:27017,ac-fwkgdk2-shard-00-02.zyyvjwd.mongodb.net:27017/?ssl=true&replicaSet=atlas-i02m3s-shard-0&authSource=admin&appName=Cluster0
JWT_SECRET=ae8c660964a68498daf679f05b8299623dab3a573255f46069762040fd6520cd1bad0083722f19615fb711a778b13cb178dbff977e861d8765079f6e5275f1f0
VITE_API_URL=https://user-analytics-app1.onrender.com/api
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



# Application Workflow

1. User registers and logs in.
2. Frontend generates session tracking.
3. User interactions are captured by tracker.js.
4. Events are sent to the Express backend.
5. Backend stores data in MongoDB Atlas.
6. Dashboard fetches analytics data.
7. Sessions page displays session-wise information.
8. Heatmap page visualizes click coordinates.

# Deployment

### Frontend
Vercel

### Backend
Render

### Database
MongoDB Atlas


## Live Demo

Frontend: https://your-vercel-url.vercel.app

Backend API: https://your-render-url.onrender.com

## Assumptions & Trade-offs

### Assumptions
- Each visitor is assigned a unique `sessionId` to track activity across pages.
- User interactions (page views, clicks, and mouse movements) are captured through a client-side tracking script.
- MongoDB Atlas is used for storing analytics data.
- Dashboard users must be authenticated before accessing analytics data.
- Heatmap coordinates are collected based on the browser viewport dimensions.
- The application is designed for demonstration and small-to-medium traffic workloads.

### Trade-offs
- Used MongoDB for flexible event storage instead of a relational database, making it easier to store different event types.
- Implemented REST APIs instead of WebSockets, prioritizing simplicity over real-time updates.
- Stored raw event data directly in the database, which simplifies development but may require aggregation optimizations at larger scales.
- Focused on core analytics features (Dashboard, Sessions, Heatmap) rather than advanced features such as session replay or funnel analysis.
- Chose JWT-based authentication for a lightweight and stateless authentication system.
- Prioritized clean architecture and maintainability over extensive feature development.

### Future Enhancements
- Real-time analytics using WebSockets.
- Session replay functionality.
- Date range filters and advanced analytics.
- Export reports in CSV/PDF format.
- User journey and funnel analysis.
- Performance optimizations for high-volume event processing.
# Author

### Maneesh Ulari

GitHub: https://github.com/maneesh248

Full Stack User Analytics Dashboard built using React, Node.js, Express, MongoDB Atlas, JWT Authentication, Session Tracking, and Heatmap Analytics.
