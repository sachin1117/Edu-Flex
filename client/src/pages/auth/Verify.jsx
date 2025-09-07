import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { UserData } from '../../context/UserContext';
import "./auth.css";

const Verify = () => {
  const [otp, setOtp] = useState("");
  const [email, setEmail] = useState("");
  const [searchParams] = useSearchParams();
  const { btnLoading, verifyOtp, resendOtp } = UserData();
  const navigate = useNavigate();

  // Check if there's a token in the URL
  const token = searchParams.get('token');

  useEffect(() => {
    if (token) {
      // Handle URL-based verification
      handleTokenVerification(token);
    }
  }, [token]);

  const handleTokenVerification = async (token) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_SERVER || 'https://edu-flex.onrender.com'}/api/user/verify/${token}`);
      const data = await response.json();
      
      if (data.success) {
        navigate('/login');
      } else {
        // Token verification failed, show OTP form
        console.log('Token verification failed, please use OTP');
      }
    } catch (error) {
      console.error('Token verification error:', error);
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!otp) {
      alert('Please enter the OTP');
      return;
    }
    await verifyOtp(Number(otp), navigate);
  }

  const handleResendOtp = async () => {
    if (!email) {
      alert('Please enter your email address');
      return;
    }
    await resendOtp(email);
  }
  
  return (
    <div className="auth-container">
      <div className="auth-card">
        <form onSubmit={submitHandler}>
          <h1 className="auth-title">Verify Account</h1>
          <div className="mb-4">
            <label htmlFor="email" className="form-label">Email Address (for resend)</label>
            <input 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              className="form-control" 
              placeholder="Enter your email address"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="otp" className="form-label">Verification Code</label>
            <input 
              type="number" 
              value={otp} 
              onChange={(e) => setOtp(e.target.value)} 
              className="form-control" 
              required 
              placeholder="Enter the OTP sent to your email"
              minLength={4}
              maxLength={6}
            />
          </div>
          <button disabled={btnLoading} type="submit">
            {btnLoading ? "Verifying..." : "Verify Account"}
          </button>
          <button 
            type="button" 
            onClick={handleResendOtp} 
            disabled={btnLoading}
            className="btn btn-outline-primary mt-2 w-100"
          >
            {btnLoading ? "Sending..." : "Resend OTP"}
          </button>
          <div className="auth-link-container mt-3">
            <span>Go to</span>
            <Link to="/login">Login Page</Link>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Verify