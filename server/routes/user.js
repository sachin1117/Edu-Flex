import express from "express";
import { forgotPassword, loginUser, myProfile, register, resetPassword, VerifyUser, testEmail } from "../controllers/user.js";
import { isAuth } from "../middlewares/isAuth.js";

const router = express.Router();
router.post("/user/register", register);
router.post("/user/verify", VerifyUser);
router.post("/user/login", loginUser);
router.get("/user/me", isAuth, myProfile);
router.post("/user/forgot", forgotPassword);
router.post("/user/reset/:token", resetPassword);
router.post("/user/test-email", testEmail);

export default router;
