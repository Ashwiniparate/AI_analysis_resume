AI_analysis_resume/
│
├── README.md   ← create here
├── client/
└── server/

# AI Resume Analysis System 🤖📄

An AI-powered Resume Analysis platform built using the MERN stack that helps users analyze their resumes, get AI-based feedback, improve skills, and receive career guidance.

## 🚀 Features

* User authentication and authorization
* Upload and analyze resumes
* AI-powered resume analysis
* Skill gap identification
* Career improvement suggestions
* Resume history tracking
* AI assistant chatbot
* Dashboard for managing analysis results

## 🛠️ Technologies Used

### Frontend

* React.js
* JavaScript (ES6+)
* HTML5
* CSS3
* Vite
* Axios

### Backend

* Node.js
* Express.js
* REST APIs
* JWT Authentication

### Database

* MongoDB
* Mongoose

### AI Integration

* AI-based resume analysis
* AI career guidance assistant

## 📂 Project Structure

```
AI_analysis_resume
│
├── client          # React frontend
│   ├── src
│   ├── components
│   ├── pages
│   └── services
│
├── server          # Node.js backend
│   ├── controllers
│   ├── models
│   ├── routes
│   └── config
│
└── README.md
```

## ⚙️ Installation & Setup

### Clone Repository

```bash
git clone https://github.com/Ashwiniparate/AI_analysis_resume.git
```

### Frontend Setup

```bash
cd client
npm install
npm run dev
```

### Backend Setup

Open another terminal:

```bash
cd server
npm install
npm run dev
```

## 🔐 Environment Variables

Create a `.env` file inside the server folder and add:

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
GEMINI_API_KEY=your_ai_api_key
JWT_SECRET=your_secret_key
```

## 🎯 Future Improvements

* Add more AI career recommendations
* Add resume scoring system
* Add interview preparation module
* Add resume template generator
* Deploy application online

## 👩‍💻 Author

**Ashwini Parate**

B.Tech Computer Science
Full Stack Developer | MERN Stack Developer

## ⭐ Project Purpose

This project demonstrates full-stack development skills with React, Node.js, Express, MongoDB, and AI integration to build a real-world career assistance application.
