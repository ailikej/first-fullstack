# Full-Stack Application README

Overview
This document provides instructions and necessary information for setting up and launching the front-end client, back-end server, and database for the full-stack application. This guide also includes information on essential tools such as PostgreSQL.app, pgAdmin4, and Postman.

## Prerequisites

Before proceeding, ensure you have the following installed on your system:

- Node.js (LTS version recommended)
- PostgreSQL.app
- pgAdmin4
- Postman

## Setting Up the Database

- Open PostgreSQL.app and start the PostgreSQL server.
- Open pgAdmin4 and connect to the PostgreSQL server.
- Create a new database for the application.
- Run the SQL scripts provided in the database/ directory of the project to set up the schema and initial data.

## Launching the Back-End Server

- Navigate to the back-end directory in your terminal: cd path/to/backend
- Install the necessary dependencies: npm install
- Create a .env file in the root of the back-end directory, and populate it with the required environment variables (refer to the .env.example file).
- Start the server: npm start
- The server should now be running on http://localhost:5000 (or your specified port).

# Launching the Front-End Client

- Navigate to the front-end directory in your terminal: cd path/to/frontend
- Install the necessary dependencies: npm install
- Start the client: npm start
- The client should now be accessible at http://localhost:3000 (or your specified port).

# Using the Application

- Open your browser and navigate to http://localhost:3000 to access the front-end application.
- Interact with the application as desired. Backend API requests will be directed to http://localhost:5000.

# Testing the API with Postman

- Open Postman.
- Import the provided Postman collection located in the postman/ directory of the project.
- Ensure the back-end server is running, then send requests to the API using Postman to test and interact with the back-end services.

# Additional Information

- Frontend technologies used: React.js, Redux, Tailwind CSS, etc.
- Backend technologies used: Node.js, Express.js, PostgreSQL, etc.
- For more details on API endpoints and responses, refer to the API documentation available in the docs/ directory.

# Troubleshooting & Support

For any issues or support, please check the FAQ section in the documentation or file an issue in the project's repository.
