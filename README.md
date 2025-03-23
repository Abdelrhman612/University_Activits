# 📚 University Activities API

A complete RESTful API for managing university activities, users, authentication, payments, and a secure password reset system. Built with **Node.js**, **Express**, **Prisma**, and **PostgreSQL**.

---

## 🚀 Features

- Full **CRUD operations** (Create, Read, Update, Delete) for users and university activities.
- **User Authentication** (Register / Login) with JWT.
- **Role-based Authorization** (Admin/User).
- **Password Reset System** (Forget Password / Verify Code / Reset Password).
- **Email notifications** using Nodemailer.
- **Stripe Payment Integration** (Checkout Session).
- **Stripe Webhook** to update payment status automatically.
- **Prisma ORM** with PostgreSQL.
- **Error handling middleware**.
- **Input validation** (basic).
- **Pagination** & **Filtering** (optional if added).

---

## 💳 Stripe Integration

### Stripe Checkout Flow:

1. Create checkout session with `/api/stripe/checkout-session`.
2. Stripe redirects the user to the payment page.
3. After successful payment, Stripe triggers `/api/stripe/webhook`.
4. The webhook will automatically update payment status in the database.

---

## 🛠️ Tech Stack

- Node.js + Express.js
- PostgreSQL + Prisma ORM
- TypeScript
- JWT Authentication
- Nodemailer
- Stripe SDK (Payments)
- bcryptjs
- crypto

---

## 📂 Project Structure

```bash
├── src
│   ├── controllers
│   ├── middlewares
│   ├── models (Prisma)
│   ├── routes
│   ├── utils
│   └── index.ts
├── .env
├── package.json
└── README.md

⚙️ Installation
bash
Copy
Edit
git clone https://github.com/your-username/university-activities-api.git
cd university-activities-api
npm install

Setup environment variables in .env
env
Copy
Edit
DATABASE_URL=postgres://username:password@localhost:5432/dbname
JWT_SECRET=your_jwt_secret
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret
STRIPE_SUCCESS_URL=http://localhost:3000/success
STRIPE_CANCEL_URL=http://localhost:3000/cancel

Prisma migration
bash
Copy
Edit
npx prisma migrate dev --name init

Start the server
bash
Copy
Edit
npm run dev

🔑 Authentication
POST /api/v1/auth/register - Register new user.

POST /api/v1/auth/login - Login and receive JWT.

POST /api/v1/auth/forgetpassword - Send password reset code.

POST /api/v1/auth/verifyresetcode - Verify reset code.

POST /api/v1/auth/resetpassword - Reset password.

📚 CRUD API Endpoints
Users
GET /api/v1/users - Get all users.

GET /api/v1/users/:id - Get user by ID.

POST /api/v1/users - Create user.

PUT /api/v1/users/:id - Update user.

DELETE /api/v1/users/:id - Delete user.

Activities
GET /api/v1/activities - Get all activities.

GET /api/v1/activities/:id - Get activity by ID.

POST /api/v1/activities - Create activity.

PUT /api/v1/activities/:id - Update activity.

DELETE /api/v1/activities/:id - Delete activity.

⚠️ Protected Routes: Require Authorization: Bearer <token> header.

💳 Stripe Endpoints
Payment
POST /api/stripe/checkout-session - Create Stripe Checkout Session.

POST /api/stripe/webhook - Stripe Webhook (internal) to update payment status.

🔒 Authorization Roles
Admin: Can manage all users & activities.

User: Can manage their own profile & view activities.

📬 Email Service
Nodemailer setup to send password reset codes.

Customizable HTML email templates.

🧪 Testing
Use Postman or Insomnia to test the API.

A Postman Collection is included in /postman/collection.json.

📝 License
This project is licensed under the MIT License.

🙌 Author
Abdo Ayman

"Built with ❤️ & Node.js."



