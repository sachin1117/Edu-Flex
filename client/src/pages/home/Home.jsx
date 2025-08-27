import React from 'react'
import { useNavigate } from 'react-router-dom'
import './Home.css'
import Testimonials from '../../components/testimonials/Testimonials'
import Footer from '../../components/footer/Footer'

const Home = () => {
  const navigate = useNavigate()

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">
            Learn Without <span className="highlight">Limits</span>
          </h1>
          <p className="hero-subtitle">
            Access thousands of courses, learn from expert instructors, and advance your career
            with EduFlex - the flexible learning platform.
          </p>
          <div className="hero-buttons">
            <button
              className="hero-btn hero-btn-primary"
              onClick={() => navigate("/courses")}
            >
              Start Learning Today →
            </button>
            <button
              className="hero-btn hero-btn-secondary"
              onClick={() => {
                // Demo video functionality would go here
                console.log("Watch demo clicked")
              }}
            >
              <div className="play-icon">▶</div>
              Watch Demo
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="features-container">
          <div className="features-header">
            <h2 className="features-title">Why Choose EduFlex?</h2>
            <p className="features-subtitle">
              Discover the features that make our platform the perfect choice for your learning journey
            </p>
          </div>

          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">📚</div>
              <h3 className="feature-title">Rich Content</h3>
              <p className="feature-description">
                Access video lessons, PDFs, quizzes, and interactive content across various subjects.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">👨‍🏫</div>
              <h3 className="feature-title">Expert Instructors</h3>
              <p className="feature-description">
                Learn from industry professionals and certified educators with years of experience.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">🎥</div>
              <h3 className="feature-title">HD Video Lessons</h3>
              <p className="feature-description">
                High-quality video content with subtitles and adjustable playback speeds.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">🏆</div>
              <h3 className="feature-title">Certificates</h3>
              <p className="feature-description">
                Earn certificates upon course completion to showcase your new skills.
              </p>
            </div>
          </div>

          {/* Stats Section */}
          <div className="stats-section">
            <div className="stats-container">
              <div className="stats-grid">
                <div className="stat-item">
                  <span className="stat-number">10,000+</span>
                  <span className="stat-label">Students Enrolled</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">500+</span>
                  <span className="stat-label">Courses Available</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">50+</span>
                  <span className="stat-label">Expert Instructors</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Testimonials />
 
      <script src="https://cdn.botpress.cloud/webchat/v3.2/inject.js" defer></script>

      <script src="https://files.bpcontent.cloud/2025/08/24/08/20250824085351-CRUKKLCH.js" defer></script>
      <Footer />
    </div>
  )
}

export default Home