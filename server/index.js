import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./database/db.js";
import Razorpay from "razorpay"; 
// importing routes
import userRoutes from "./routes/user.js";
import courseRoutes from "./routes/course.js";
import adminRoutes from "./routes/admin.js";

dotenv.config();

export const instance = new Razorpay({
  key_id: process.env.Razorpay_Key,
  key_secret: process.env.Razorpay_Secret,
});
const app = express();
const port = process.env.PORT;

app.use(
  cors({
    origin: [
      // Production frontends
      "https://edu-flex-1.onrender.com",
      "https://edu-flex.onrender.com",
      // Local development
      "http://localhost:5173",
      "http://127.0.0.1:5173",
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "token"],
    credentials: true,
  })
);

app.options("*", cors());
// using middlewares
app.use(express.json());

// using routes
app.use("/api", userRoutes);
app.use("/api", courseRoutes);
app.use("/api", adminRoutes);
app.use("/uploads", express.static("uploads"));

app.get("/", (req, res) => {
  res.send("Server is working");
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
  connectDB();
});
