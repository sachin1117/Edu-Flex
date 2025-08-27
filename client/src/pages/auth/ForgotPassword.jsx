import React, { useState } from 'react'
import "./auth.css";
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from 'axios';
import { server } from '../../main';

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [btnLoading, setBtnLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setBtnLoading(true);
    try {
      const { data } = await axios.post(`${server}/api/user/forgot`, { email });
      toast.success(data.message);
      navigate("/login");
      setBtnLoading(false);
    } catch (error) {
      toast.error(error.response.data.message);
      setBtnLoading(false);
    }
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <form onSubmit={handleSubmit}>
          <h2 className="auth-title">Forgot Password</h2>
          <div className="mb-4">
            <label htmlFor="email" className="form-label">Email Address</label>
            <input 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              className="form-control" 
              required 
              placeholder="Enter your email"
            />
          </div>
          <button disabled={btnLoading}>
            {btnLoading ? "Sending Request..." : "Reset Password"}
          </button>
          <p className="text-center mt-3">
            <a href="/login" className="auth-link">Back to Login</a>
          </p>
        </form>
      </div>
    </div>
  )
}

export default ForgotPassword