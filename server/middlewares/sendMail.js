import { createTransport } from "nodemailer";
import jwt from "jsonwebtoken";

const transport = createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.Gmail,
    pass: process.env.Password,
  },
});

// ✅ Helper: Generate JWT
const generateToken = (payload, expiresIn) => {
  if (!process.env.JWT_SECRET) {
    throw new Error("❌ JWT_SECRET is required in .env");
  }
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn });
};

/* =====================================================
   OTP Verification Mail
   Used in: /user/register
   ===================================================== */
export const sendOtpMail = async (email, data) => {
  const token = generateToken({ email, otp: data.otp }, "5m"); // token expires in 5 min

  const html = `
  <div style="font-family:Poppins,Arial,sans-serif;background:#f5f7fb;padding:20px;text-align:center">
    <div style="max-width:550px;margin:auto;background:#fff;padding:40px;border-radius:12px;box-shadow:0 6px 18px rgba(0,0,0,0.1)">
      <h2 style="color:#4a4ae6;">🔐 OTP Verification</h2>
      <p>Hello <b>${data.name}</b>, your OTP is:</p>
      <div style="background:#4a90e2;color:#fff;font-size:28px;font-weight:bold;letter-spacing:4px;padding:15px;border-radius:8px;display:inline-block;margin:20px 0">${data.otp}</div>
      <p>Or click below to verify (valid 5 minutes):</p>
      <a href="${process.env.frontendurl}/verify?token=${token}" 
         style="background:#4a90e2;color:#fff;text-decoration:none;padding:12px 28px;border-radius:30px;font-weight:bold;">Verify Now</a>
    </div>
  </div>`;

  return transport.sendMail({
    from: process.env.Gmail,
    to: email,
    subject: "OTP Verification - Edu Flex",
    html,
  });
};

/* =====================================================
   Forgot Password Mail
   Used in: /user/forgot
   ===================================================== */
export const sendForgotMail = async (email) => {
  const token = generateToken({ email }, "15m"); // token expires in 15 min

  const html = `
  <div style="font-family:Poppins,Arial,sans-serif;background:#f4f6f9;padding:20px;text-align:center">
    <div style="max-width:600px;margin:auto;background:#fff;padding:40px;border-radius:12px;box-shadow:0 6px 18px rgba(0,0,0,0.1)">
      <h2 style="color:#4a4ae6;">🔑 Reset Your Password</h2>
      <p>Click the button below to reset your password (valid 15 minutes):</p>
      <a href="${process.env.frontendurl}/reset-password/${token}" 
         style="background:#6a5acd;color:#fff;text-decoration:none;padding:14px 32px;border-radius:30px;font-weight:bold;">Reset Password</a>
    </div>
  </div>`;

  return transport.sendMail({
    from: process.env.Gmail,
    to: email,
    subject: "Reset Password - Edu Flex",
    html,
  });
};

/* =====================================================
   Resend Verification Link Mail
   Used in: /user/resend
   ===================================================== */
export const sendResendMail = async (email, data) => {
  const token = generateToken({ email }, "10m"); // token expires in 10 min

  const html = `
  <div style="font-family:Poppins,Arial,sans-serif;background:#f5f7fb;padding:20px;text-align:center">
    <div style="max-width:550px;margin:auto;background:#fff;padding:40px;border-radius:12px;box-shadow:0 6px 18px rgba(0,0,0,0.1)">
      <h2 style="color:#4a4ae6;">📩 Verify Your Email</h2>
      <p>Hello <b>${data.name}</b>, please verify your email again:</p>
      <a href="${process.env.frontendurl}/verify-email/${token}" 
         style="background:#4a90e2;color:#fff;text-decoration:none;padding:12px 28px;border-radius:30px;font-weight:bold;">Verify Email</a>
    </div>
  </div>`;

  return transport.sendMail({
    from: process.env.Gmail,
    to: email,
    subject: "Resend Verification Link - Edu Flex",
    html,
  });
};
