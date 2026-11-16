# Taskflow

**A desktop task management application designed to help you organize your work, manage projects, and stay productive.**

Taskflow is a full-stack desktop application built with Electron, React, Express.js, and MongoDB. It aims to provide a convenient workspace for managing tasks and projects directly from your desktop.

## Features

- **Task Management** — Create, update, organize, and track tasks.
- **Project Organization** — Group related tasks into projects.
- **Drag and Drop** — Reorganize tasks and manage workflows intuitively.
- **Desktop Experience** — Run Taskflow as a standalone desktop application.
- **Local Database** — Store application data using MongoDB.
- **REST API** — Communicate between the frontend and backend through an Express.js API.

*Some features are planned and will be implemented progressively.*

## Tech Stack

### Frontend
- React
- Vite
- Electron
- Tailwind CSS
- React Router
- Zustand
- Axios
- Lucide React
- dnd-kit

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose

### Desktop & Development Tools
- Electron
- electron-builder
- Nodemon
- ESLint

## Project Structure

```text
taskflow/
├── taskflow-front/
│   ├── electron/
│   │   ├── main.cjs
│   │   └── preload.cjs
│   ├── src/
│   │   ├── assets/
│   │   ├── services/
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
│
├── taskflow-back/
│   ├── src/
│   │   ├── config/
│   │   ├── services/
│   │   ├── app.js
│   │   └── server.js
│   ├── .env.example
│   └── package.json
│
├── .gitignore
└── README.md
```

## Getting Started

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/)
- [MongoDB Community Server](https://www.mongodb.com/try/download/community)
- [Git](https://git-scm.com/)

### 1. Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/taskflow.git
cd taskflow
```

### 2. Set up the backend

```bash
cd taskflow-back
npm install
```

Create your environment file:

```bash
cp .env.example .env
```

On Windows PowerShell, you can use:

```powershell
Copy-Item .env.example .env
```

Make sure MongoDB is running and configure your environment variables in `.env`.

Start the backend development server:

```bash
npm run dev
```

The API will be available at:

```text
http://127.0.0.1:5000
```

Health check endpoint:

```text
http://127.0.0.1:5000/api/v1/health
```

### 3. Set up the frontend

Open another terminal:

```bash
cd taskflow-front
npm install
```

Create the frontend environment file:

```powershell
Copy-Item .env.example .env
```

Start the Electron development environment:

```bash
npm run electron:dev
```

## Environment Variables

### Backend

| Variable | Description | Example |
|---|---|---|
| `PORT` | Backend server port | `5000` |
| `MONGO_URI` | MongoDB connection string | `mongodb://127.0.0.1:27017/taskora` |
| `CLIENT_ORIGIN` | Frontend development origin | `http://127.0.0.1:5173` |

### Frontend

| Variable | Description | Example |
|---|---|---|
| `VITE_API_URL` | Backend API base URL | `http://127.0.0.1:5000/api/v1` |

**Note:** Never commit actual `.env` files, passwords, or API credentials to the repository.

## Development Roadmap

- [x] Initialize frontend and backend projects
- [x] Configure Electron desktop environment
- [x] Set up Express.js server
- [x] Configure MongoDB connection
- [ ] Build the main application interface
- [ ] Implement task creation and management
- [ ] Implement project and category management
- [ ] Add drag-and-drop functionality
- [ ] Implement task priorities and statuses
- [ ] Add calendar and scheduling features
- [ ] Improve desktop application experience
- [ ] Package the application for distribution

## Contributing

Taskflow is an evolving personal development project. Suggestions, bug reports, and contributions are welcome.

If you find an issue or have an idea for improvement, feel free to open an issue or submit a pull request.

## License

This project is currently under development. A license will be added when the distribution and usage terms are decided.
