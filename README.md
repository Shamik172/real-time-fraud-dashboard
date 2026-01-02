# 🔐 Real-Time Fraud Detection Dashboard

A full-stack web application for monitoring e-commerce transactions in **real time** and detecting suspicious activity using **AI-based anomaly detection** combined with **rule-based risk analysis**.

---

## 🚀 Features

### 👤 Role-Based Access
- **User**
  - Login / Signup
  - Generate transactions manually
  - View only their own transaction history in real time
- **Admin**
  - Monitor all transactions live
  - View high-risk alerts
  - Analyze fraud trends using charts
  - Role-based secure access

---

### ⚡ Real-Time Capabilities
- Live transaction updates using **WebSockets (Socket.io)**
- Admin dashboard updates instantly when any user generates a transaction
- User dashboard updates instantly for their own transactions

---

### 🤖 AI + Rule-Based Fraud Detection
- **Rule Engine**
  - High transaction amount
  - Very large transaction spikes
  - High-risk locations
  - Unknown device usage
- **AI Analysis**
  - Uses **Google Gemini API**
  - AI-generated fraud risk score and reasoning
- **Fail-safe Design**
  - If AI is unavailable → system falls back to rule-based scoring

---

### 📊 Analytics & Visualization
- **Live Transactions Table**
- **High-Risk Alerts Panel**
- **Charts (with time filters)**
  - Risk Trend (Line Chart)
  - Risk Distribution (Pie Chart)
  - Fraud by Location (Bar Chart)
- Charts refresh automatically using **polling** (every 5 seconds)

---

## 🧠 Tech Stack

### Frontend
- **React.js**
- **Redux Toolkit**
- **Socket.io Client**
- **Chart.js**
- **Tailwind CSS**

### Backend
- **Node.js**
- **Express.js**
- **Socket.io**
- **JWT Authentication**
- **Google Gemini API**

### Database
- **MongoDB Atlas**

### DevOps
- **Docker**
- **Docker Compose**

---

## 🏗️ Architecture Overview
Client (React) -> REST (JWT) -> WebSocket (JWT) -> Backend (Express + Socket.io) ->rule-based Analysis + AI Analysis (Gemini) -> MongoDB Aggregations


---

## 🔐 Authentication & Security

- JWT-based authentication for REST APIs
- JWT-secured WebSocket connections
- Role-based authorization (`admin`, `user`)
- Admin-only access for analytics and monitoring routes

---

## 📂 Project Structure
```
├── client
│ ├── src
│ │ ├── components
│ │ ├── charts
│ │ ├── features (Redux slices)
│ │ ├── hooks
│ │ ├── services
│ │ ├── context
│ │ └── pages
│ └── Dockerfile
│
├── server
│ ├── routes
│ ├── controllers
│ ├── models
│ ├── services
│ ├── sockets
│ ├── config
│ ├── middleware
│ └── Dockerfile
│
├── docker-compose.yml
├── .env.example
├── README.md
```

---

## ⚙️ Environment Variables

Create a `.env` file in the **server** directory:

```env
PORT=5000
MONGO_URI=your_mongodb_atlas_url
JWT_SECRET=your_secret_key
GEMINI_API_KEY=your_google_gemini_key
Frontend .env:
VITE_API_URL=http://localhost:5000
VITE_SOCKET_URL=http://localhost:5000
```


## 🧪 Demo Flow
  - step: Signup/Login as User
  - step: Generate transactions manually
  - step: Watch user transactions update live
  - step: Login as Admin
  - observe:
      - Live transaction table updates
      - High-risk alerts
      - Charts updating automatically

## 🧩 Design Decisions
  - Polling used for charts instead of WebSockets
  - Reason: Avoid heavy MongoDB aggregation load on every transaction
  - WebSockets limited to live events:
      - Transaction tables
      - High-risk alerts
  - Hybrid fraud detection:
      - Rule-based engine
      - AI-based analysis (Gemini)
  - Fail-safe AI handling:
      - Automatic fallback to rule-based scoring if AI is unavailable

## 🧩 Design Decisions
  - Redis caching for chart and aggregation queries
  - Advanced anomaly detection using ML models
  - Admin-configurable fraud detection rules
  - Notification system:
      - Email alerts
      - Push notifications
  - Security improvements:
      - Rate limiting
      - Audit logs

## 👨‍💻 Author
  Name: Shamik Mandal
  - Profile: "Full-Stack Developer | MERN | Real-Time Systems | AI-Integrated Applications"

