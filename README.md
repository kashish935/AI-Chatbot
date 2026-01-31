# 🤖 AI Chatbot with Short-Term Memory (MERN + Gemini AI)

An **AI-powered real-time chatbot** built using the **MERN stack**, featuring **short-term conversational memory** and **real-time communication** with **WebSockets (Socket.IO)**.  
The chatbot uses **Google Gemini AI** to generate intelligent, context-aware responses.

---

## 🚀 Features

- 🧠 **Short-Term Memory Support**  
  Retains recent conversation context for more natural and meaningful AI responses.

- ⚡ **Real-Time Chat**  
  Implemented using **WebSockets** with **Socket.IO** for instant, low-latency messaging.

- 🤖 **Gemini AI Integration**  
  Uses Google Gemini AI to generate intelligent, human-like replies.

- 🌐 **Full MERN Stack Application**  
  Built using MongoDB, Express, React, and Node.js.

- 🔐 **Scalable Backend Architecture**  
  Designed to handle multiple users and real-time conversations efficiently.

---

## 🛠️ Tech Stack

### Frontend
- React
- Socket.IO Client
- Axios

### Backend
- Node.js
- Express.js
- Socket.IO
- Gemini AI SDK

### Database
- MongoDB (for storing chat data / session info)

---

## ⚙️ How It Works

1. User sends a message from the React frontend.
2. Message is transmitted instantly using **Socket.IO**.
3. Backend appends recent messages as **short-term memory**.
4. Conversation context is sent to **Gemini AI**.
5. AI-generated response is emitted back to the client in real time.

---


