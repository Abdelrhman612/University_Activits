# University Activities Project

This project is a backend system for managing university activities, including user management, activity creation, and payment integration using Stripe. It is built with Node.js, Express, TypeScript, and Prisma for database management.

## Features

- **User Management**:

  - User registration and login with JWT authentication.
  - Password reset functionality with email verification.
  - Role-based access control (Admin, Student).
  - CRUD operations for users.

- **Activity Management**:

  - Create, read, update, and delete activities.
  - Track the number of registered users for each activity.
  - Activity status management (OPEN, CLOSED, COMPLETED).

- **Payment Integration**:
  - Stripe integration for handling payments.
  - Webhook support for handling payment events.
  - Track payment status (pending, paid).

## Technologies Used

- **Backend**: Node.js, Express, TypeScript
- **Database**: PostgreSQL, Prisma ORM
- **Authentication**: JSON Web Tokens (JWT)
- **Payment Gateway**: Stripe
- **Email Service**: Nodemailer
- **File Upload**: Multer

## Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (v18 or higher)
- npm (v9 or higher)
- PostgreSQL
- Stripe account (for payment integration)
- SMTP email service (for sending emails)

## Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/your-username/university-activities.git
   cd university-activities
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Set up environment variables**:
   Create a `.env` file in the root directory and add the following variables:

   ```env
   PORT=3000
   DATABASE_URL="postgresql://user:password@localhost:5432/university_activities"
   SECRET_JWT="your_jwt_secret_key"
   EMAIL_USER="your_email@example.com"
   EMAIL_PASS="your_email_password"
   EMAIL_HOST="smtp.example.com"
   EMAIL_PORT=465
   EMAIL_FROM="your_email@example.com"
   STRIPE_SECRET_KEY="your_stripe_secret_key"
   STRIPE_WEBHOOK_SECRET="your_stripe_webhook_secret"
   ```

4. **Run database migrations**:

   ```bash
   npx prisma migrate dev --name init
   ```

5. **Start the server**:
   ```bash
   npm run dev
   ```

## API Endpoints

### User Endpoints

- **POST /api/users/Register**: Register a new user.
- **POST /api/users/Login**: Login and receive a JWT token.
- **GET /api/users**: Get all users (Admin only).
- **GET /api/users/:Id**: Get a specific user by ID.
- **PATCH /api/users/:Id**: Update a user (Admin only).
- **DELETE /api/users/:Id**: Delete a user (Admin only).
- **POST /api/users/forgetPassword**: Request a password reset.
- **POST /api/users/verfiyPassResetCode**: Verify password reset code.
- **PUT /api/users/ResetPassword**: Reset user password.

### Activity Endpoints

- **POST /api/activities**: Create a new activity (Admin only).
- **GET /api/activities**: Get all activities.
- **PATCH /api/activities/:Id**: Update an activity (Admin only).
- **DELETE /api/activities/:Id**: Delete an activity (Admin only).

### Payment Endpoints

- **POST /api/stripe/checkout-session**: Create a Stripe checkout session.
- **POST /api/stripe/webhook**: Stripe webhook for payment events.
- **GET /api/stripe**: Get all payments.

## File Structure

```
university-activities/
├── prisma/
│   ├── migrations/
│   ├── schema.prisma
├── src/
│   ├── Controllers/
│   ├── database/
│   ├── middleware/
│   ├── routs/
│   ├── SchemaiNterFace/
│   ├── utills/
│   ├── index.ts
├── .env
├── nodemon.json
├── package.json
├── tsconfig.json
└── README.md
```

## Contributing

Contributions are welcome! Please fork the repository and create a pull request with your changes.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contact

For any questions or issues, please open an issue on the GitHub repository.
