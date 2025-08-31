import jwt from "jsonwebtoken";
import { User } from "../models/User.js";
import bcrypt from "bcrypt";
import { sendOtpMail, sendForgotMail, sendResendMail } from "../middlewares/sendMail.js";
import TryCatch from "./../middlewares/TryCatch.js";

export const register = TryCatch(async (req, res) => {
  const { name, email, password } = req.body;
  let user = await User.findOne({ email });

  if (user)
    return res.status(400).json({
      message: "User already exists",
    });

  const hashPassword = await bcrypt.hash(password, 10);

  user = {
    name,
    email,
    password: hashPassword,
  };

  const otp = Math.floor(Math.random() * 1000000);

  const activationToken = jwt.sign(
    {
      user,
      otp,
    },
    process.env.Activation_Secret,
    {
      expiresIn: "5m",
    }
  );

  const data = {
    name,
    otp,
  };

  await sendMail(email, "Edu-Flex", data);

  res.status(200).json({
    message: "OTP send your mail",
    activationToken,
  });
});

export const VerifyUser = TryCatch(async (req, res) => {
  const { otp, activationToken } = req.body;
  const verify = jwt.verify(activationToken, process.env.Activation_Secret);

  if (!verify)
    return res.status(400).json({
      message: "OTP Expired",
    });

  if (verify.otp !== otp)
    return res.status(400).json({
      message: "Wrong OTP",
    });

  await User.create({
    name: verify.user.name,
    email: verify.user.email,
    password: verify.user.password,
  });

  res.json({
    message: "User Registered",
  });
});

export const loginUser = TryCatch(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user)
    return res.status(400).json({
      message: "No User with this email",
    });

  const matchPassword = await bcrypt.compare(password, user.password);

  if (!matchPassword)
    return res.status(400).json({
      message: "Wrong Password",
    });

  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "15d",
  });

  res.json({
    message: `Welcome back ${user.name}`,
    token,
    user,
  });
});

export const myProfile = TryCatch(async (req, res) => {
  const user = await User.findById(req.user._id);
  res.json({ user });
});

export const forgotPassword = TryCatch(async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });

  if (!user)
    return res.status(404).json({
      message: "No User with this email",
    });

  const token = jwt.sign({ email }, process.env.Forgot_Secret);

  const data = { email, token };

  await sendForgotMail("E-Learning", data);

  user.resetPasswordExpired = Date.now() + 5 * 60 * 1000;

  await user.save();
  res.json({
    message: "Reset Password Link is send to you mail",
  });
});

export const resetPassword = TryCatch(async (req, res) => {
  const decodedData = jwt.verify(req.query.token, process.env.Forgot_Secret);

  const user = await User.findOne({ email: decodedData.email });

  if (!user)
    return res.status(404).json({
      message: "No User with this email",
    });

  if (user.resetPasswordExpired === null)
    return res.status(400).json({
      message: "Token Expired",
    });

  if (user.resetPasswordExpired < Date.now())
    return res.status(400).json({
      message: "Token Expired",
    });

  const password = await bcrypt.hash(req.body.password, 10);

  user.password = password;

  user.resetPasswordExpired = null;

  await user.save();

  res.json({
    message: "Password Reset",
  });
});
