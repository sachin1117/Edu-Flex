🚀 Edu-Flex – Smart Learning Platform

Edu-Flex is a modern and flexible online learning platform designed to make education accessible, interactive, and engaging.
With a clean UI, intelligent chatbot support, payment integration, and modular features, Edu-Flex empowers learners and educators with seamless digital learning experiences.

✨ Features

🎓 Course Management – Create, manage, and explore structured courses.

🤖 AI-Powered Chatbot – Smart assistant for instant learning support.

📚 Content Management System (CMS) – Simple yet powerful CMS for educators.

💳 Payment Integration (Razorpay) – Secure payment gateway for course enrollments.

📧 Email Notifications – Automated email verification, password reset, and OTPs.

📱 Responsive Design – Works smoothly on desktop, tablet, and mobile.

🔒 Secure & Scalable – Built with JWT authentication and MongoDB Atlas.

🎨 Modern UI/UX – Minimal, clean, and learner-friendly interface.

🛠️ Tech Stack

Edu-Flex is built using cutting-edge web technologies:

Frontend: React.js, TailwindCSS

Backend: Node.js, Express.js

Database: MongoDB Atlas

Authentication: JWT, Email Verification

AI Chatbot: Botpress / OpenAI Integration

Payments: Razorpay API

Deployment: Vercel / Render / Netlify / Heroku

📂 Project Structure
Edu-Flex/
│── frontend/        # React.js frontend
│── backend/         # Express.js backend APIs
│── chatbot/         # AI-powered chatbot integration
│── cms/             # Content Management System
│── assets/          # Images, icons, styles
│── .env.example     # Example environment variables file
│── README.md        # Documentation

⚙️ Environment Variables

Edu-Flex requires a .env file for configuration.
⚠️ Never push your real .env file to GitHub. Use .env.example as a guide.

Example .env file
# ==============================
# 🔌 Server Configuration
# ==============================
PORT=5000

# ==============================
# 🗄️ Database
# ==============================
DB=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0

# ==============================
# 🔑 Authentication Secrets
# ==============================
Activation_Secret=activation_secret_key_12345
Jwt_sec=jwt_secret_key_67890
Forgot_Secret=forgot_secret_key_54321

# ==============================
# 📧 Email Service
# ==============================
Gmail=examplemail@gmail.com
Password=app_password_123456

# ==============================
# 💳 Payment Gateway (Razorpay)
# ==============================
Razorpay_Key=rzp_test_randomKey12345
Razorpay_Secret=randomSecret67890

# ==============================
# 🌐 Frontend URL
# ==============================
frontendurl=http://localhost:5173


👉 For full details about each variable, check Environment Setup Guide
 (you can create this file if you want).

🚀 Getting Started

Follow these steps to set up Edu-Flex locally:

1️⃣ Clone the Repository
git clone https://github.com/sachin1117/Edu-Flex.git
cd Edu-Flex

2️⃣ Install Dependencies
# Frontend
cd frontend
npm install

# Backend
cd ../backend
npm install

3️⃣ Setup Environment Variables

Create .env in backend (use .env.example as reference).

4️⃣ Run the App
# Start backend
cd backend
npm start

# Start frontend
cd frontend
npm start


👉 Frontend: http://localhost:5173
👉 Backend: http://localhost:5000

📸 Screenshots
Dashboard	Chatbot	Courses	Payments

	
	
	
🌍 Deployment

You can deploy Edu-Flex easily using:

Frontend → Vercel / Netlify

Backend → Render / Heroku

Database → MongoDB Atlas

🤝 Contributing

We welcome contributions to improve Edu-Flex! 🎉

Fork the repo

Create a new branch (feature-new)

Commit changes

Push and create a Pull Request

📜 License

Edu-Flex is released under the MIT License.
You are free to use, modify, and distribute it.

👨‍💻 Author

Sachin – GitHub Profile

💡 Edu-Flex – Empowering Education with Technology!
