import express from "express";
import {
  checkout,
  fetchLecture,
  fetchLectures,
  getAllCourses,
  getMyCourses,
  getSingleCourse,
  paymentVarification,
} from "../controllers/course.js";
import { isAuth } from "../middlewares/isAuth.js";

const router = express.Router();

// Public endpoint to provide Razorpay key to client
router.get("/razorpay-key", (req, res) => {
  res.json({ key: process.env.Razorpay_Key || "" });
});

router.get("/course/all", getAllCourses);
router.get("/course/:id", getSingleCourse);
router.get("/lectures/:id", isAuth, fetchLectures);
router.get("/lecture/:id", isAuth, fetchLecture);
router.get("/mycourse", isAuth, getMyCourses);
router.post("/course/checkout/:id", isAuth, checkout);
router.post("/varification/:id", isAuth, paymentVarification);

export default router;
