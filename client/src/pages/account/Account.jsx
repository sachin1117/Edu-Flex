import React from 'react';
import { MdDashboard } from "react-icons/md";
import { IoMdLogOut } from "react-icons/io";
import "./account.css";
import { UserData } from '../../context/UserContext';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const Account = ({ user }) => {
  const { setIsAuth, setUser } = UserData();
  const navigate = useNavigate();

  const logoutHandler = () => {
    localStorage.clear();
    setUser([]);
    setIsAuth(false);
    toast.success("Logged Out Successfully");
    navigate("/login");
  }

  return (
    <div className='my-container'>
      {user && (
        <div className="profile">
          <h2>My Profile</h2>
          <div className="profile-info">
            <p>
              <strong>Name:</strong> {user.name}
            </p>
            <p>
              <strong>Email:</strong> {user.email}
            </p>
            {user.role === "user" && (
              <button 
                onClick={() => navigate(`/${user._id}/dashboard`)} 
                className="common-btn"
              >
                <MdDashboard />
                Dashboard
              </button>
            )}
            {user.role === "admin" && (
              <button 
                onClick={() => navigate(`/admin/dashboard`)} 
                className="common-btn"
              >
                <MdDashboard />
                Admin Dashboard
              </button>
            )}
            <button 
              onClick={logoutHandler} 
              className="common-btn bg-danger"
            >
              <IoMdLogOut />
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Account;