import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserData } from '../../context/UserContext';
import "./auth.css";

const Verify = () => {
  const [otp, setOtp] = useState("");
  const { btnLoading, verifyOtp } = UserData();
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    await verifyOtp(Number(otp), navigate);
  }
  
  return (
    <div className="auth-container">
      <div className="auth-card">
        <form onSubmit={submitHandler}>
          <h1 className="auth-title">Verify Account</h1>
          <div className="mb-4">
            <label htmlFor="otp" className="form-label">Verification Code</label>
            <input 
              type="number" 
              value={otp} 
              onChange={(e) => setOtp(e.target.value)} 
              className="form-control" 
              required 
              placeholder="Enter the OTP sent to your email"
            />
          </div>
          <button disabled={btnLoading} type="submit">
            {btnLoading ? "Verifying..." : "Verify Account"}
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