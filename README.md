# GTNA TradeBoard - Backend API

## Description
This is the backend REST API for the GTNA TradeBoard application, developed as a technical assessment. It is built using Node.js, Express, and MongoDB. This backend manages service requests and includes advanced bonus features such as full JWT authentication for secure operations and Regex-based keyword search for enhanced data retrieval.

## Tech Stack
- **Node.js** - JavaScript runtime
- **Express** - Web framework for Node.js
- **MongoDB** - NoSQL database
- **Mongoose** - Object Data Modeling (ODM) library for MongoDB and Node.js
- **Dotenv** - Environment variable management
- **CORS** - Cross-Origin Resource Sharing middleware
- **bcryptjs** - Password hashing library
- **jsonwebtoken (JWT)** - Secure token generation and verification

## Environment Variables
Create a `.env` file in the root directory and add the following keys:
```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```

## Installation & Setup Instructions
1. Clone the repository and navigate to the backend directory.
2. Install the required dependencies using npm:
```bash
npm install
```

## How to Run
Start the server using Node:
```bash
node server.js
```
*(Or use `npm run dev` if a dev script using nodemon is configured).*

## API Endpoints

| Method | Endpoint | Protected | Description |
|---|---|---|---|
| **POST** | `/api/auth/register` | No | Register a new user |
| **POST** | `/api/auth/login` | No | Login and receive a JWT token |
| **GET** | `/api/jobs` | No | List all jobs. Supports optional `?category`, `?status`, and `?search` filters |
| **GET** | `/api/jobs/:id` | No | Fetch a single job by its ID |
| **POST** | `/api/jobs` | **Yes 🔒** | Create a new job. Requires Bearer Token. Includes input/email validation |
| **PATCH** | `/api/jobs/:id` | No | Update the status of a specific job |
| **DELETE** | `/api/jobs/:id` | **Yes 🔒** | Delete a specific job. Requires Bearer Token |

## Features Included
- **Robust Input Validation:** Ensures all required fields are present and emails are properly formatted.
- **Global Error Handling:** Consistent JSON error responses across the entire API.
- **404 Resource Handler:** Graceful fallbacks for missing routes or documents.
- **Regex-Based Keyword Search:** Case-insensitive search across job titles and descriptions.
- **JWT Route Protection:** Secure authentication middleware preventing unauthorized creation and deletion of jobs.