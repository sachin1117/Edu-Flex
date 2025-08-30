# 📚 Edu-Flex

A modern, scalable **online learning platform** that provides an interactive and flexible education experience. Edu-Flex supports authentication, secure payments, and an intuitive frontend for learners.

🌐 **Live Demo:** [Edu-Flex on Render](https://edu-flex-1.onrender.com/)
💻 **GitHub Repository:** [Edu-Flex Repo](https://github.com/sachin1117/Edu-Flex/tree/main)

---

## ✨ Features

* 🔐 **Authentication & Authorization** (JWT-based)
* 📧 **Email Verification & Password Reset** (via Gmail SMTP)
* 💳 **Payment Integration** with Razorpay
* 🎓 **Course Management** for learners & instructors
* 📱 **Frontend & Backend Integration**
* 🚀 **Production-ready deployment** on Render

---

## 🛠 Tech Stack

* **Frontend:** React + Vite
* **Backend:** Node.js + Express
* **Database:** MongoDB (Atlas)
* **Authentication:** JWT, Custom Secrets
* **Payment Gateway:** Razorpay
* **Email Service:** Gmail SMTP

---

## ⚙️ Installation & Setup

Clone the repository:

```bash
 git clone https://github.com/sachin1117/Edu-Flex.git
 cd Edu-Flex
```

Install dependencies:

```bash
 npm install
```

---

## 🔑 Environment Variables

Create a `.env` file in the root directory and add the following variables:

```env
PORT=5000
DB=<your-mongodb-connection-string>

Activation_Secret=<your-activation-secret>
Jwt_sec=<your-jwt-secret>

Gmail=<your-gmail-address>
Password=<your-gmail-app-password>

Razorpay_Key=<your-razorpay-key>
Razorpay_Secret=<your-razorpay-secret>

Forgot_Secret=<your-forgot-secret>
frontendurl=http://localhost:5173
```

⚠️ Do **not** commit your `.env` file to version control!

---

## ▶️ Running the Project

Start the development server:

```bash
 npm run dev
```

The backend will run on: [http://localhost:5000](http://localhost:5000)

---

## 📡 API Endpoints

| Method | Endpoint             | Description               |
| ------ | -------------------- | ------------------------- |
| POST   | `/api/auth/register` | Register a new user       |
| POST   | `/api/auth/login`    | User login (JWT issued)   |
| POST   | `/api/payment/order` | Create Razorpay order     |
| GET    | `/api/courses`       | Fetch all courses         |
| GET    | `/api/user/profile`  | Fetch logged-in user info |

---

## 📂 Folder Structure

```bash
Edu-Flex/
├── backend/              # Express server code
│   ├── routes/           # API routes
│   ├── controllers/      # Route handlers
│   ├── models/           # Mongoose models
│   └── utils/            # Helpers & middlewares
├── frontend/             # React + Vite frontend
└── .env                  # Environment variables (not committed)
```

---

## 🤝 Contributing

Contributions are welcome! To contribute:

1. Fork the repository
2. Create a new branch (`feature/new-feature`)
3. Commit your changes
4. Push to your branch and open a Pull Request

---

## 📧 Contact

**Author:** Sachin
📩 Email: *sachinkumar69355@gmail.com*
🔗 GitHub: [sachin1117](https://github.com/sachin1117)

---

## 🚀 Next Steps

* ✅ Dockerize the application for containerized deployment
* ✅ Add unit & integration tests (Jest / Mocha)
* ✅ Implement CI/CD pipeline (GitHub Actions)
* ✅ Scale MongoDB using Atlas sharding for production
* ✅ Deploy frontend separately on Vercel/Netlify for better performance
