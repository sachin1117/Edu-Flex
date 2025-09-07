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

  await sendOtpMail(email, data);

  res.status(200).json({
    message: "OTP send your mail",
    activationToken,
  });
});

export const VerifyUser = TryCatch(async (req, res) => {
  const { otp, activationToken } = req.body;
  
  if (!activationToken) {
    return res.status(400).json({
      message: "Activation token is required",
    });
  }

  if (!otp) {
    return res.status(400).json({
      message: "OTP is required",
    });
  }

  try {
    const verify = jwt.verify(activationToken, process.env.Activation_Secret);

    if (!verify) {
      return res.status(400).json({
        message: "Invalid activation token",
      });
    }

    if (verify.otp !== Number(otp)) {
      return res.status(400).json({
        message: "Wrong OTP",
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email: verify.user.email });
    if (existingUser) {
      return res.status(400).json({
        message: "User already registered",
      });
    }

    await User.create({
      name: verify.user.name,
      email: verify.user.email,
      password: verify.user.password,
    });

    res.json({
      message: "User Registered Successfully",
    });
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(400).json({
        message: "OTP Expired",
      });
    }
    if (error.name === 'JsonWebTokenError') {
      return res.status(400).json({
        message: "Invalid activation token",
      });
    }
    throw error;
  }
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

  const data = { email };

  await sendForgotMail(email, data);

  user.resetPasswordExpired = Date.now() + 15 * 60 * 1000; // 15 minutes

  await user.save();
  res.json({
    message: "Reset Password Link is sent to your email",
  });
});

export const resetPassword = TryCatch(async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  if (!token) {
    return res.status(400).json({
      message: "Token is required",
    });
  }

  const decodedData = jwt.verify(token, process.env.JWT_SECRET);

  const user = await User.findOne({ email: decodedData.email });

  if (!user)
    return res.status(404).json({
      message: "No User with this email",
    });

  if (!user.resetPasswordExpired)
    return res.status(400).json({
      message: "Token Expired",
    });

  if (user.resetPasswordExpired < Date.now())
    return res.status(400).json({
      message: "Token Expired",
    });

  const hashedPassword = await bcrypt.hash(password, 10);

  user.password = hashedPassword;
  user.resetPasswordExpired = null;

  await user.save();

  res.json({
    message: "Password Reset Successfully",
  });
});

// URL-based verification endpoint
export const verifyByToken = TryCatch(async (req, res) => {
  const { token } = req.params;
  
  if (!token) {
    return res.status(400).json({
      message: "Verification token is required",
    });
  }

  try {
    const verify = jwt.verify(token, process.env.JWT_SECRET);

    if (!verify) {
      return res.status(400).json({
        message: "Invalid verification token",
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email: verify.email });
    if (existingUser) {
      return res.status(400).json({
        message: "User already registered",
      });
    }

    // For URL-based verification, we need to get user data from somewhere
    // This is a simplified version - in production, you might want to store temp user data
    res.json({
      message: "Please use the OTP verification method",
      success: false,
    });
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(400).json({
        message: "Verification token expired",
      });
    }
    if (error.name === 'JsonWebTokenError') {
      return res.status(400).json({
        message: "Invalid verification token",
      });
    }
    throw error;
  }
});

// Resend OTP endpoint
export const resendOtp = TryCatch(async (req, res) => {
  const { email } = req.body;
  
  if (!email) {
    return res.status(400).json({
      message: "Email is required",
    });
  }

  // Check if user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({
      message: "User already registered",
    });
  }

  // Generate new OTP and token
  const otp = Math.floor(Math.random() * 1000000);
  
  const activationToken = jwt.sign(
    {
      email,
      otp,
    },
    process.env.Activation_Secret,
    {
      expiresIn: "5m",
    }
  );

  const data = {
    name: email.split('@')[0], // Use email prefix as name
    otp,
  };

  try {
    await sendOtpMail(email, data);
    res.json({
      message: "OTP resent successfully",
      activationToken,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to resend OTP",
      error: error.message,
    });
  }
});

// Test email endpoint for debugging
export const testEmail = TryCatch(async (req, res) => {
  const { email } = req.body;
  
  if (!email) {
    return res.status(400).json({
      message: "Email is required for testing",
    });
  }

  try {
    await sendForgotMail(email, { email });
    res.json({
      message: "Test email sent successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to send test email",
      error: error.message,
    });
  }
});
