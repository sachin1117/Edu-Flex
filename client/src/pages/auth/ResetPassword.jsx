import React, { useState } from 'react'
import "./auth.css"
import { useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from 'axios';
import { server } from '../../main';

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [btnLoading, setBtnLoading] = useState(false);
  const navigate = useNavigate();
  const params = useParams()

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return;
    }
    
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    
    setBtnLoading(true);
    try {
      const { data } = await axios.post(`${server}/api/user/reset/${params.token}`, { password });
      toast.success(data.message);
      navigate("/login");
      setBtnLoading(false);
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred");
      setBtnLoading(false);
    }
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <form onSubmit={handleSubmit}>
          <h2 className="auth-title">Reset Password</h2>
          <div className="mb-4">
            <label htmlFor="password" className="form-label">New Password</label>
            <input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              className="form-control" 
              required 
              placeholder="Enter your new password"
              minLength={6}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
            <input 
              type="password" 
              value={confirmPassword} 
              onChange={(e) => setConfirmPassword(e.target.value)} 
              className="form-control" 
              required 
              placeholder="Confirm your new password"
              minLength={6}
            />
          </div>
          <button disabled={btnLoading}>
            {btnLoading ? "Updating Password..." : "Reset Password"}
          </button>
          <p className="text-center mt-3">
            <a href="/login" className="auth-link">Back to Login</a>
          </p>
        </form>
      </div>
    </div>
  )
}

export default ResetPassword