# 📚 University Activities API

A complete RESTful API for managing university activities, users, and authentication, including a secure password reset system. Built with **Node.js**, **Express**, **Prisma**, and **PostgreSQL**.

![Screenshot](./screenshot.png)

---

## 🚀 Features

- Full **CRUD operations** (Create, Read, Update, Delete) for users and university activities.
- **User Authentication** (Register / Login) with JWT.
- **Role-based Authorization** (Admin/User).
- **Password Reset System** (Forget Password / Verify Code / Reset Password).
- **Email notifications** using Nodemailer.
- **Prisma ORM** with PostgreSQL.
- **Error handling middleware**.
- **Input validation** (basic).
- **Pagination** & **Filtering** (optional if added).

---

## 🛠️ Tech Stack

- Node.js + Express.js
- PostgreSQL + Prisma ORM
- TypeScript
- JWT Authentication
- Nodemailer
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
```

---

## ⚙️ Installation

```bash
git clone https://github.com/your-username/university-activities-api.git
cd university-activities-api
npm install
```

### Setup environment variables in `.env`

```env
DATABASE_URL=postgres://username:password@localhost:5432/dbname
JWT_SECRET=your_jwt_secret
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
```

### Prisma migration

```bash
npx prisma migrate dev --name init
```

### Start the server

```bash
npm run dev
```

---

## 🔑 Authentication

- **POST** `/api/v1/auth/register` - Register new user.
- **POST** `/api/v1/auth/login` - Login and receive JWT.
- **POST** `/api/v1/auth/forgetpassword` - Send password reset code.
- **POST** `/api/v1/auth/verifyresetcode` - Verify reset code.
- **POST** `/api/v1/auth/resetpassword` - Reset password.

---

## 📚 CRUD API Endpoints

### Users

- **GET** `/api/v1/users` - Get all users.
- **GET** `/api/v1/users/:id` - Get user by ID.
- **POST** `/api/v1/users` - Create user.
- **PUT** `/api/v1/users/:id` - Update user.
- **DELETE** `/api/v1/users/:id` - Delete user.

### Activities

- **GET** `/api/v1/activities` - Get all activities.
- **GET** `/api/v1/activities/:id` - Get activity by ID.
- **POST** `/api/v1/activities` - Create activity.
- **PUT** `/api/v1/activities/:id` - Update activity.
- **DELETE** `/api/v1/activities/:id` - Delete activity.

> ⚠️ Protected Routes: Require `Authorization: Bearer <token>` header.

---

## 🔒 Authorization Roles

- `Admin`: Can manage all users & activities.
- `User`: Can manage their own profile & view activities.

---

## 📬 Email Service

- Nodemailer setup to send password reset codes.
- Customizable HTML email templates.

---

## 🧪 Testing

- Use **Postman** or **Insomnia** to test the API.
- A Postman Collection is included in `/postman/collection.json`.

---

## 📝 License

This project is licensed under the MIT License.

---

## 🙌 Author

**Abdo Ayman**

---

> "Built with ❤️ & Node.js."
