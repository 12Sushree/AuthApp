# AuthApp

A simple authentication application built with Node.js and Express.

## Features

- User registration
- User login
- JWT authentication
- Password hashing
- Middleware for protected routes
- Environment variable configuration
- OTP (One-Time Password) for additional security
- Send OTP via email

## Technologies Used

- Node.js
- Express
- MongoDB
- Mongoose
- JSON Web Token (JWT)
- bcryptjs
- dotenv
- nodemailer
- otp-generator
- cors

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/12Sushree/AuthApp.git
   ```
2. Navigate to the project directory:
   ```bash
   cd AuthApp
   ```
3. Install the dependencies:
   ```bash
   npm install
   ```
4. Create a `.env` file in the root directory and add the required environment variables:
   ```bash
   PORT=<your-port>
   MONGODB_URI=<your-mongodb-uri>
   JWT_SECRET=<your-jwt-secret>
   EMAIL_USER=<your-email>
   EMAIL_PASS=<your-email-password>
   ```
5. Start the development server:
   ```bash
   npm run dev
   ```

## Usage

- Register a new user by sending a POST request to `/api/auth/signup` with `username`, `email`, and `password`.
- Login with an existing user by sending a POST request to `/api/auth/login` with `email` and `password`.
- Access protected routes by including the JWT in the `Authorization` header as `Bearer <token>`.
- Use the `/api/auth/sendotp` endpoint to generate and send an OTP to the user's email. The OTP can be used for additional security during login or sensitive operations.
