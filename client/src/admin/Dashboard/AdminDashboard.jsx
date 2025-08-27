// File: AdminDashboard.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Layout from '../Utils/Layout';
import axios from 'axios';
import { server } from './../../main';
import './admindashboard.css';

// Import icons
import { 
  FaBook, 
  FaChalkboardTeacher, 
  FaUsers, 
  FaChartLine, 
  FaPlus, 
  FaCog,
  FaBell,
  FaSearch,
  FaUserCircle,
  FaSignOutAlt
} from 'react-icons/fa';

const AdminDashboard = ({ user }) => {
  const navigate = useNavigate();
  useEffect(() => {
    if (user && user.role !== "admin" && user.role !== "superadmin") {
      navigate("/");
    }
  }, [user, navigate]);

  const [stats, setStats] = useState({
    totalCourses: 0,
    totalLectures: 0,
    totalUsers: 0,
    recentUsers: []
  });
  const [loading, setLoading] = useState(true);

  async function fetchStats() {
    try {
      setLoading(true);
      const { data } = await axios.get(`${server}/api/stats`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      });

      setStats(data.stats);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchStats();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <Layout>
      <div className="admin-dashboard">
        {/* Header */}
        <header className="dashboard-header">
          <div className="header-left">
            <h1>Dashboard</h1>
            <p>Welcome back, {user?.name}</p>
          </div>
          <div className="header-right">
            <div className="search-bar">
              <FaSearch />
              <input type="text" placeholder="Search..." />
            </div>
            <button className="icon-btn">
              <FaBell />
            </button>
            <div className="user-menu">
              <FaUserCircle />
              <span>{user?.name}</span>
              <div className="dropdown-menu">
                <button onClick={handleLogout}>
                  <FaSignOutAlt /> Logout
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Stats Cards */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="card-icon">
              <FaBook />
            </div>
            <div className="card-content">
              <h3>Total Courses</h3>
              <p className="stat-number">{loading ? '--' : stats.totalCourses}</p>
              <span className="stat-trend">+12% from last month</span>
            </div>
          </div>

          <div className="stat-card">
            <div className="card-icon">
              <FaChalkboardTeacher />
            </div>
            <div className="card-content">
              <h3>Total Lectures</h3>
              <p className="stat-number">{loading ? '--' : stats.totalLectures}</p>
              <span className="stat-trend">+8% from last month</span>
            </div>
          </div>

          <div className="stat-card">
            <div className="card-icon">
              <FaUsers />
            </div>
            <div className="card-content">
              <h3>Total Users</h3>
              <p className="stat-number">{loading ? '--' : stats.totalUsers}</p>
              <span className="stat-trend">+15% from last month</span>
            </div>
          </div>

          <div className="stat-card">
            <div className="card-icon">
              <FaChartLine />
            </div>
            <div className="card-content">
              <h3>Engagement Rate</h3>
              <p className="stat-number">87%</p>
              <span className="stat-trend">+5% from last month</span>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="dashboard-content">
          {/* Charts Section */}
          <div className="charts-section">
            <div className="chart-container">
              <div className="chart-header">
                <h3>Monthly Users</h3>
                <select>
                  <option>Last 6 months</option>
                  <option>Last year</option>
                </select>
              </div>
              <div className="chart-placeholder">
                <div className="bar-chart">
                  {[65, 59, 80, 81, 56, 55, 40].map((height, index) => (
                    <div key={index} className="bar" style={{ height: `${height}%` }}></div>
                  ))}
                </div>
              </div>
            </div>

            <div className="chart-container">
              <div className="chart-header">
                <h3>Course Popularity</h3>
                <select>
                  <option>All categories</option>
                </select>
              </div>
              <div className="chart-placeholder">
                <div className="pie-chart"></div>
              </div>
            </div>
          </div>

          {/* Recent Activity & Quick Actions */}
          <div className="activity-section">
            <div className="recent-users">
              <h3>Recent Users</h3>
              <div className="user-list">
                {stats.recentUsers && stats.recentUsers.length > 0 ? (
                  stats.recentUsers.map(user => (
                    <div key={user._id} className="user-item">
                      <div className="user-avatar">
                        {user.name.charAt(0)}
                      </div>
                      <div className="user-info">
                        <h4>{user.name}</h4>
                        <p>{user.email}</p>
                      </div>
                      <span className="user-date">2 days ago</span>
                    </div>
                  ))
                ) : (
                  <div className="empty-state">
                    <p>No recent users</p>
                  </div>
                )}
              </div>
            </div>

            <div className="quick-actions">
              <h3>Quick Actions</h3>
              <div className="action-buttons">
                <button className="action-btn" onClick={() => navigate('/admin/courses')}>
                  <FaPlus />
                  <span>Add Course</span>
                </button>
                <Link to="/admin/users" className="action-btn">
                  <FaUsers />
                  <span>Manage Users</span>
                </Link>
                <Link to="/admin/courses" className="action-btn">
                  <FaBook />
                  <span>Content Management</span>
                </Link>
                <button className="action-btn" onClick={() => { localStorage.removeItem('token'); navigate('/login'); }}>
                  <FaCog />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;