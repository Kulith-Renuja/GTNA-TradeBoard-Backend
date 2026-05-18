backend 
Act as an expert technical writer. Please generate a highly professional, clean README.md file for the backend repository of my "GTNA TradeBoard" project. 

The backend is built using Node.js, Express, Mongoose, and MongoDB. It handles the REST API endpoints and connects to a MongoDB database.

The README must include these exact sections with proper Markdown formatting:
1. Project Title: GTNA TradeBoard - Backend API
2. Description: A brief summary stating this is the backend REST API for the GTNA TradeBoard developer assessment, built with Node.js, Express, and MongoDB.
3. Tech Stack: A bulleted list showing Node.js, Express, MongoDB, Mongoose, Dotenv, and CORS.
4. Environment Variables: A code block showing the required keys for a `.env` file:
   - PORT=5000
   - MONGODB_URI=your_mongodb_connection_string
5. Installation & Setup Instructions: Step-by-step terminal commands (`npm install`).
6. How to Run: Commands for development ( `node server.js`).
7. API Endpoints Table: A clean markdown table mapping out the required routes from the assessment:
   - GET /api/jobs (Supports optional ?category and ?status filters)
   - GET /api/jobs/:id
   - POST /api/jobs (With input and email format validation)
   - PATCH /api/jobs/:id (Updates job status only)
   - DELETE /api/jobs/:id
8. Features Included: Mention input validation, global error handling, and a 404 handler for missing resources.