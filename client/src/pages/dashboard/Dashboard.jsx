import React from 'react'
import "./dashboard.css"
import { CourseData } from '../../context/CourseContext'
import CourseCard from '../../components/coursecard/CourseCard';

const Dashboard = () => {
  const { mycourse } = CourseData();

  return (
    <div className="student-dashboard">
      <div className="dashboard-header">
        <h2>My Enrolled Courses</h2>
        <div className="dashboard-stats">
          <div className="stat-card">
            <div className="stat-number">{mycourse?.length || 0}</div>
            <div className="stat-label">Total Courses</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">{mycourse?.filter(course => course.completed).length || 0}</div>
            <div className="stat-label">Completed</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">{mycourse?.filter(course => !course.completed).length || 0}</div>
            <div className="stat-label">In Progress</div>
          </div>
        </div>
      </div>
      
      <div className="dashboard-content">
        {mycourse && mycourse.length > 0 ? (
          mycourse.map((course) => (
            <CourseCard key={course._id} course={course} />
          ))
        ) : (
          <p>No courses enrolled yet. Start your learning journey today!</p>
        )}
      </div>
    </div>
  )
}

export default Dashboard