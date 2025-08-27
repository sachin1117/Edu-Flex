import React, { useEffect } from "react";
import "./coursestudy.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import { CourseData } from "../../context/CourseContext";
import { server } from "../../main";

const CourseStudy = ({ user }) => {
  const params = useParams();
  const { fetchCourse, course } = CourseData();
  const navigate = useNavigate();

  // Check if user has access to this course
  if (user && user.role !== "admin" && !user.subscription.includes(params.id)) {
    return navigate("/");
  }

  useEffect(() => {
    fetchCourse(params.id);
  }, []);

  return (
    <>
      {course && (
        <div className="course-study-page">
          <img 
            src={`${server}/${course.image}`} 
            alt={course.title}
          />
          
          <h2>{course.title}</h2>
          <h4>{course.description}</h4>
          
          <div className="course-meta">
            <h5>By - {course.createdBy}</h5>
            <h5>Duration - {course.duration} Weeks</h5>
          </div>
          
          <Link to={`/lectures/${course._id}`}>
            <span>View Lectures</span>
          </Link>
        </div>
      )}
    </>
  );
};

export default CourseStudy;