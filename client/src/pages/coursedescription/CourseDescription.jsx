import React, { useEffect, useState } from "react";
import "./coursedescription.css";
import { useNavigate, useParams } from "react-router-dom";
import { CourseData } from "../../context/CourseContext";
import { server } from "../../main";
import axios from "axios";
import toast from "react-hot-toast";
import { UserData } from "../../context/UserContext";
import Loading from "../../components/loading/Loading";
import Footer from "../../components/footer/Footer";

const CourseDescription = ({ user }) => {
  const params = useParams();
  const navigate = useNavigate();
  const { fetchCourse, course, fetchCourses, fetchMyCourse } = CourseData();
  const { fetchUser } = UserData();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchCourse(params.id);
  }, []);

  // Add Payment System 
  const checkoutHandler = async () => {
    const token = localStorage.getItem("token");
    setLoading(true);

    // Get order from backend
    const { data: { order }, } = await axios.post(`${server}/api/course/checkout/${params.id}`, {}, {
      headers: {
        token,
      },
    });

    // Fetch Razorpay key securely from backend (no hardcoding on client)
    const { data: keyData } = await axios.get(`${server}/api/razorpay-key`);
    const razorpayKey = keyData?.key;

    const options = {
      key: razorpayKey,
      amount: order.amount,
      currency: "INR",
      name: "EduFlex",
      description: "Learn with us",
      order_id: order.id,

      handler: async function (response) {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = response;

        try {
          const { data } = await axios.post(`${server}/api/varification/${params.id}`, {
            razorpay_order_id, razorpay_payment_id, razorpay_signature
          },
            {
              headers: {
                token,
              },
            },
          );

          await fetchUser();
          await fetchCourses();
          await fetchMyCourse();
          toast.success(data.message);
          setLoading(false);
          navigate(`/payment-success/${razorpay_payment_id}`)
        } catch (error) {
          toast.error(error.response.data.message);
          setLoading(false);
        }
      },

      theme: {
        color: "#2563EB",
      },
    };
    const razorpay = new window.Razorpay(options);
    razorpay.open();
    setLoading(false);
  };
  // End Payment

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        course && (
          <>
            <div className="course-description">
              <div className="course-description-container">
                <div className="course-header">
                  <img
                    src={`${server}/${course.image}`}
                    alt={course.title}
                    className="course-image"
                  />
                  <div className="course-info">
                    <h1 className="course-title">{course.title}</h1>
                    
                    <div className="course-meta">
                      <div className="meta-item">
                        <span className="meta-icon">👨‍🏫</span>
                        <span className="meta-label">Instructor:</span>
                        <span>{course.createdBy}</span>
                      </div>
                      
                      <div className="meta-item">
                        <span className="meta-icon">⏱️</span>
                        <span className="meta-label">Duration:</span>
                        <span>{course.duration} weeks</span>
                      </div>
                      
                      <div className="meta-item">
                        <span className="meta-icon">🎯</span>
                        <span className="meta-label">Category:</span>
                        <span>{course.category || 'Programming'}</span>
                      </div>
                      
                      <div className="meta-item">
                        <span className="meta-icon">📊</span>
                        <span className="meta-label">Level:</span>
                        <span>{course.level || 'Beginner to Advanced'}</span>
                      </div>
                    </div>

                    <div className="price-section">
                      <span className="currency">₹</span>
                      <span className="price">{course.price}</span>
                    </div>
                  </div>
                </div>

                {/* Course Features */}
                <div className="course-features">
                  <div className="feature-card">
                    <span className="feature-icon">🎥</span>
                    <div className="feature-title">HD Video Lessons</div>
                    <div className="feature-description">High-quality video content with clear explanations</div>
                  </div>
                  
                  <div className="feature-card">
                    <span className="feature-icon">📱</span>
                    <div className="feature-title">Mobile Friendly</div>
                    <div className="feature-description">Learn anywhere, anytime on any device</div>
                  </div>
                  
                  <div className="feature-card">
                    <span className="feature-icon">🏆</span>
                    <div className="feature-title">Certificate</div>
                    <div className="feature-description">Get certified upon course completion</div>
                  </div>
                  
                  <div className="feature-card">
                    <span className="feature-icon">💬</span>
                    <div className="feature-title">Community Support</div>
                    <div className="feature-description">Connect with fellow students and instructors</div>
                  </div>
                </div>

                {/* Course Description */}
                <div className="course-description-text">
                  <h2 className="description-title">Course Description</h2>
                  <p className="description-content">{course.description}</p>
                </div>

                {/* Action Section */}
                <div className="action-section">
                  {user && (user.role === "admin" || user.role === "superadmin") ? (
                    <>
                      <h3 className="action-title">Admin access enabled</h3>
                      <button
                        onClick={() => navigate(`/lectures/${course._id}`)}
                        className="enroll-btn start-learning-btn"
                      >
                        <span>🛠️</span>
                        Manage Lectures
                      </button>
                    </>
                  ) : user && user.subscription.includes(course._id) ? (
                    <>
                      <h3 className="action-title">You're enrolled! Ready to start learning?</h3>
                      <button
                        onClick={() => navigate(`/course/study/${course._id}`)}
                        className="enroll-btn start-learning-btn"
                      >
                        <span>🚀</span>
                        Start Learning
                      </button>
                    </>
                  ) : (
                    <>
                      <h3 className="action-title">Ready to transform your career?</h3>
                      <button onClick={checkoutHandler} className="enroll-btn">
                        <span>💳</span>
                        Enroll Now - ₹{course.price}
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
            <Footer />
          </>
        )
      )}
    </>
  );
};

export default CourseDescription;