# Portfolio Backend API

Backend service built with Node.js, Express, and MongoDB (Mongoose) for Lalith Kumar's Professional Portfolio.

## Tech Stack
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB / MongoDB Atlas (Mongoose ODM)
- **Environment**: dotenv

## Environment Setup
Create a `.env` file in the root of the backend folder:
```env
PORT=5000
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster-url>/portfolio?retryWrites=true&w=majority
```

## Available Scripts

### 1. Install Dependencies
```bash
npm install
```

### 2. Seed Database to MongoDB Atlas
Populate the database with all resume details (Profile, Skills, Education, Experience, Projects, Contact):
```bash
npm run seed
```

### 3. Start Development Server
```bash
npm run dev
```

### 4. Start Production Server
```bash
npm start
```

## API Endpoints
- `GET /` - Health check
- `GET /api/profile` - Fetch profile information
- `GET /api/skills` - Fetch skills list
- `GET /api/education` - Fetch education details
- `GET /api/experience` - Fetch work experience
- `GET /api/projects` - Fetch projects
- `GET /api/contact` - Fetch contact information
- `POST /api/contact` - Send contact message
