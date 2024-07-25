# The Daily Cup

The Daily Cup is an e-commerce website dedicated to tea and coffee enthusiasts. This project follows the MVC (Model-View-Controller) pattern and ensures user data security through robust authentication and authorization mechanisms. The backend APIs are built using various modern technologies, including TypeScript and PostgreSQL.

# Table of Contents

Features, Technologies Used, Installation, Environment Variables, Database Models, API Endpoints, Scripts, Contributing, License

# Features

- User authentication and authorization.
- Product management (Tea and Coffee).
- Category management.
- Order management.
- Payment integration.
- Image upload using Cloudinary and Secure data handling

# Technologies Used

- Backend Framework: Express
- Database ORM: Prisma
- Database: PostgreSQL
- Programming Language: TypeScript
- Authentication: JSON Web Token (JWT), Bcrypt
- File Upload: Multer, Cloudinary
- Email Service: Nodemailer
- Payment Gateway: SSLCommerz
- Other Libraries: Axios, Cookie-parser, CORS, Dotenv, Http-status, Zod

# Installation

Clone the repository:

```js
git clone https://github.com/yourusername/the-daily-cup.git
cd the-daily-cup
```

# Install dependencies:

```js
npm install
```

# Set Up Environment Variables

Create a .env file in the root directory and add the following environment variables:

```js
DATABASE_URL = "";
PORT = "";
bcryptSalt = "";
accessToken = "";
accessTokenExpireDate = "";
refreshToken = "";
refreshTokenExpireDate = "";
STORE_ID = "";
STORE_PASS = "";
SUCCESS_URL = "";
CANCEL_URL = "";
FAIL_URL = "";
SSL_PAYMENT_API = "";
SSL_VALIDATION_API = "";
email = "";
appPassword = "";
```

Run the application:

```js
npm run dev
```

# Database Models

- The project uses the following models:
- Auth
- User
- Category
- Product
- Order
- OrderProduct
- Payment
- API Endpoints
- Auth

# Build Transpile TypeScript to JavaScript

```js
npm run build
```

# Dev Run the application in development mode with ts-node-dev

```js
npm run dev
```

- test: Run tests (currently no tests specified)

# Postinstall Generate Prisma client

```js
npm run postinstall
```

# Contributing

Contributions are welcome! Please fork the repository and submit a pull request for any features, enhancements, or bug fixes.

- Github: https://github.com/prasanjitsarker3/Coffee-Server
- Postman Doc: https://documenter.getpostman.com/view/15550287/2sA3kXF1Ug
