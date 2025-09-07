import { createTransport } from "nodemailer";
import jwt from "jsonwebtoken";

// Validate required environment variables
if (!process.env.Gmail || !process.env.Password) {
  console.error("❌ Email configuration missing. Please set Gmail and Password in .env file");
}

const transport = createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.Gmail,
    pass: process.env.Password,
  },
});

// Verify email configuration
transport.verify((error, success) => {
  if (error) {
    console.error("❌ Email configuration error:", error);
  } else {
    console.log("✅ Email server is ready to send messages");
  }
});

const generateToken = (payload, expiresIn) => {
  if (!process.env.JWT_SECRET) {
    throw new Error("❌ JWT_SECRET is required in .env");
  }
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn });
};

export const sendOtpMail = async (email, data) => {
  try {
    if (!process.env.Gmail || !process.env.Password) {
      throw new Error("Email configuration missing");
    }

    const token = generateToken({ email, otp: data.otp }, "5m");
    
    // Ensure frontend URL doesn't have trailing slash to avoid double slashes
    const frontendUrl = process.env.frontendurl?.replace(/\/$/, '') || 'https://edu-flex-1.onrender.com';

    const html = `
    <div style="font-family:Poppins,Arial,sans-serif;background:#f5f7fb;padding:20px;text-align:center">
      <div style="max-width:550px;margin:auto;background:#fff;padding:40px;border-radius:12px;box-shadow:0 6px 18px rgba(0,0,0,0.1)">
        <h2 style="color:#4a4ae6;">🔐 OTP Verification</h2>
        <p>Hello <b>${data.name}</b>, your OTP is:</p>
        <div style="background:#4a90e2;color:#fff;font-size:28px;font-weight:bold;letter-spacing:4px;padding:15px;border-radius:8px;display:inline-block;margin:20px 0">${data.otp}</div>
        <p>Or click below to verify (valid 5 minutes):</p>
        <a href="${frontendUrl}/verify?token=${token}" 
           style="background:#4a90e2;color:#fff;text-decoration:none;padding:12px 28px;border-radius:30px;font-weight:bold;">Verify Now</a>
      </div>
    </div>`;

    const result = await transport.sendMail({
      from: process.env.Gmail,
      to: email,
      subject: "OTP Verification - Edu Flex",
      html,
    });

    console.log("✅ OTP email sent successfully to:", email);
    return result;
  } catch (error) {
    console.error("❌ Error sending OTP email:", error);
    throw error;
  }
};

export const sendForgotMail = async (email, data) => {
  try {
    if (!process.env.Gmail || !process.env.Password) {
      throw new Error("Email configuration missing");
    }

    const token = generateToken({ email }, "15m");
    
    // Ensure frontend URL doesn't have trailing slash to avoid double slashes
    const frontendUrl = process.env.frontendurl?.replace(/\/$/, '') || 'https://edu-flex-1.onrender.com';

    const html = `
    <div style="font-family:Poppins,Arial,sans-serif;background:#f4f6f9;padding:20px;text-align:center">
      <div style="max-width:600px;margin:auto;background:#fff;padding:40px;border-radius:12px;box-shadow:0 6px 18px rgba(0,0,0,0.1)">
        <h2 style="color:#4a4ae6;">🔑 Reset Your Password</h2>
        <p>Click the button below to reset your password (valid 15 minutes):</p>
        <a href="${frontendUrl}/reset-password/${token}" 
           style="background:#6a5acd;color:#fff;text-decoration:none;padding:14px 32px;border-radius:30px;font-weight:bold;">Reset Password</a>
      </div>
    </div>`;

    const result = await transport.sendMail({
      from: process.env.Gmail,
      to: email,
      subject: "Reset Password - Edu Flex",
      html,
    });

    console.log("✅ Reset password email sent successfully to:", email);
    return result;
  } catch (error) {
    console.error("❌ Error sending reset password email:", error);
    throw error;
  }
};

export const sendResendMail = async (email, data) => {
  try {
    if (!process.env.Gmail || !process.env.Password) {
      throw new Error("Email configuration missing");
    }

    const token = generateToken({ email }, "10m");
    
    // Ensure frontend URL doesn't have trailing slash to avoid double slashes
    const frontendUrl = process.env.frontendurl?.replace(/\/$/, '') || 'https://edu-flex-1.onrender.com';

    const html = `
    <div style="font-family:Poppins,Arial,sans-serif;background:#f5f7fb;padding:20px;text-align:center">
      <div style="max-width:550px;margin:auto;background:#fff;padding:40px;border-radius:12px;box-shadow:0 6px 18px rgba(0,0,0,0.1)">
        <h2 style="color:#4a4ae6;">📩 Verify Your Email</h2>
        <p>Hello <b>${data.name}</b>, please verify your email again:</p>
        <a href="${frontendUrl}/verify-email?token=${token}" 
           style="background:#4a90e2;color:#fff;text-decoration:none;padding:12px 28px;border-radius:30px;font-weight:bold;">Verify Email</a>
      </div>
    </div>`;

    const result = await transport.sendMail({
      from: process.env.Gmail,
      to: email,
      subject: "Resend Verification Link - Edu Flex",
      html,
    });

    console.log("✅ Resend verification email sent successfully to:", email);
    return result;
  } catch (error) {
    console.error("❌ Error sending resend verification email:", error);
    throw error;
  }
};
