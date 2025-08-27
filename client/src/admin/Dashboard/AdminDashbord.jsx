import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../Utils/Layout";
import axios from "axios";
import { server } from "../../main";
import "./admindashboard.css";

const AdminDashbord = ({ user }) => {
  const navigate = useNavigate();

  if (user && user.role !== "admin") return navigate("/");

  const [stats, setStats] = useState({
    totalCourses: 0,
    totalLectures: 0,
    totalUsers: 0
  });

  async function fetchStats() {
    try {
      const { data } = await axios.get(`${server}/api/stats`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      });

      setStats(data.stats);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchStats();
  }, []);

  return (
    <Layout>
      <div className="admin-dashboard">
        {/* Stats Cards */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="card-icon">
              <FaBook />
            </div>
            <div className="card-content">
              <h3>Total Courses</h3>
              <p className="stat-number">{stats.totalCourses}</p>
              <span className="stat-trend">+12% from last month</span>
            </div>
          </div>

          <div className="stat-card">
            <div className="card-icon">
              <FaChalkboardTeacher />
            </div>
            <div className="card-content">
              <h3>Total Lectures</h3>
              <p className="stat-number">{stats.totalLectures}</p>
              <span className="stat-trend">+8% from last month</span>
            </div>
          </div>

          <div className="stat-card">
            <div className="card-icon">
              <FaUsers />
            </div>
            <div className="card-content">
              <h3>Total Users</h3>
              <p className="stat-number">{stats.totalUsers}</p>
              <span className="stat-trend">+15% from last month</span>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashbord;