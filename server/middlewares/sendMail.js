import { createTransport } from "nodemailer";

const sendMail = async (email, subject, data) => {
  const transport = createTransport({
    host: "smtp.gmail.com",
    port: 465,
    auth: {
      user: process.env.Gmail,
      pass: process.env.Password,
    },
  });

 const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Edu-Flex OTP Verification</title>
  <style>
    body {
      font-family: 'Poppins', Arial, sans-serif;
      margin: 0;
      padding: 0;
      background: #f5f7fb;
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
    }
    .container {
      background-color: #ffffff;
      padding: 40px;
      border-radius: 16px;
      box-shadow: 0 8px 25px rgba(0,0,0,0.1);
      max-width: 550px;
      width: 100%;
      text-align: center;
    }
    .logo {
      font-size: 26px;
      font-weight: bold;
      color: #4a4ae6;
      margin-bottom: 20px;
    }
    h1 {
      color: #2c2c54;
      font-size: 24px;
      margin-bottom: 10px;
    }
    p {
      color: #555;
      font-size: 15px;
      line-height: 1.6;
      margin-bottom: 20px;
    }
    .otp-box {
      background: linear-gradient(135deg, #6a5acd, #4a90e2);
      border-radius: 12px;
      display: inline-block;
      padding: 18px 35px;
      margin: 20px 0;
    }
    .otp {
      font-size: 34px;
      font-weight: bold;
      color: #fff;
      letter-spacing: 4px;
    }
    .cta-btn {
      display: inline-block;
      margin-top: 25px;
      padding: 12px 30px;
      background: #4a90e2;
      color: #fff;
      text-decoration: none;
      border-radius: 30px;
      font-size: 15px;
      font-weight: bold;
      transition: 0.3s;
    }
    .cta-btn:hover {
      background: #3a78c2;
    }
    .footer {
      font-size: 12px;
      color: #888;
      margin-top: 30px;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="logo">📚 Edu-Flex Platform</div>
    <h1>🔐 OTP Verification</h1>
    <p>Hello <strong>${data.name}</strong>,</p>
    <p>To continue learning with us, please use the following One-Time Password (OTP).  
    This code is valid for <strong>5 minutes</strong>.</p>

    <div class="otp-box">
      <p class="otp">${data.otp}</p>
    </div>

    <a href="https://your-elearning-site.com/verify" class="cta-btn">Verify Now</a>

    <div class="footer">
      <p>If you didn’t request this OTP, please ignore this email.</p>
      <p>© 2025 Edu-Flex Platform. All Rights Reserved.</p>
    </div>
  </div>
</body>
</html>`;


  await transport.sendMail({
    from: process.env.Gmail,
    to: email,
    subject,
    html,
  });
};

export default sendMail;

export const sendForgotMail = async (subject, data) => {
  const transport = createTransport({
    host: "smtp.gmail.com",
    port: 465,
    auth: {
      user: process.env.Gmail,
      pass: process.env.Password,
    },
  });

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Reset Your Password</title>
  <style>
    body {
      font-family: 'Poppins', Arial, sans-serif;
      background-color: #f4f6f9;
      margin: 0;
      padding: 0;
    }
    .container {
      background-color: #ffffff;
      padding: 40px;
      margin: 30px auto;
      border-radius: 12px;
      box-shadow: 0 6px 18px rgba(0, 0, 0, 0.1);
      max-width: 600px;
      text-align: center;
    }
    h1 {
      color: #4a4ae6;
      font-size: 26px;
      margin-bottom: 15px;
    }
    p {
      color: #555;
      font-size: 15px;
      line-height: 1.6;
      margin-bottom: 20px;
    }
    .button {
      display: inline-block;
      padding: 14px 32px;
      margin: 20px 0;
      background: linear-gradient(135deg, #6a5acd, #4a90e2);
      color: #ffffff;
      text-decoration: none;
      border-radius: 30px;
      font-size: 16px;
      font-weight: bold;
      transition: 0.3s;
    }
    .button:hover {
      background: linear-gradient(135deg, #4a90e2, #6a5acd);
    }
    .footer {
      margin-top: 30px;
      color: #888;
      font-size: 12px;
      text-align: center;
    }
    .footer a {
      color: #4a4ae6;
      text-decoration: none;
      font-weight: bold;
    }
    .logo {
      font-size: 22px;
      font-weight: bold;
      color: #4a4ae6;
      margin-bottom: 20px;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="logo">📚 Edu-Flex Platform</div>
    <h1>🔑 Reset Your Password</h1>
    <p>Hello,</p>
    <p>You requested to reset your password. Please click the button below to continue:</p>
    <a href="${https://edu-flex-1.onrender.com/}/reset-password/${data.token}" class="button">Reset Password</a>
    <p>If you did not request this, please ignore this email.</p>
    <div class="footer">
      <p>Thank you,<br>Your Website Team</p>
      <p><a href="https://yourwebsite.com">yourwebsite.com</a></p>
    </div>
  </div>
</body>
</html>
`;

  await transport.sendMail({
    from: process.env.Gmail,
    to: data.email,
    subject,
    html,
  });
};
