import React from 'react'
import './Footer.css';
import { FaFacebook, FaTwitterSquare, FaLinkedin, FaYoutube } from "react-icons/fa";
import { AiFillInstagram } from "react-icons/ai";
import { NavLink } from 'react-router-dom';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-main">
          <div className="footer-brand">
            <div className="footer-logo">EduFlex</div>
            <p className="footer-description">
              Transforming education through technology. Learn from expert instructors, 
              advance your career, and unlock your potential with our comprehensive courses.
            </p>
            <div className='social-links'>
              <NavLink to="#" className="social-icon" aria-label="Facebook">
                <FaFacebook />
              </NavLink>
              <NavLink to="#" className="social-icon" aria-label="Instagram">
                <AiFillInstagram />
              </NavLink>
              <NavLink to="#" className="social-icon" aria-label="Twitter">
                <FaTwitterSquare />
              </NavLink>
              <NavLink to="#" className="social-icon" aria-label="LinkedIn">
                <FaLinkedin />
              </NavLink>
              <NavLink to="#" className="social-icon" aria-label="YouTube">
                <FaYoutube />
              </NavLink>
            </div>
          </div>
          
          <div className="footer-section">
            <h3>Quick Links</h3>
            <ul className="footer-links">
              <li><NavLink to="/" className="footer-link">Home</NavLink></li>
              <li><NavLink to="/courses" className="footer-link">Courses</NavLink></li>
              <li><NavLink to="/about" className="footer-link">About Us</NavLink></li>
              <li><NavLink to="/contact" className="footer-link">Contact</NavLink></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h3>Categories</h3>
            <ul className="footer-links">
              <li><NavLink to="#" className="footer-link">Web Development</NavLink></li>
              <li><NavLink to="#" className="footer-link">Data Science</NavLink></li>
              <li><NavLink to="#" className="footer-link">UX/UI Design</NavLink></li>
              <li><NavLink to="#" className="footer-link">Mobile Development</NavLink></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h3>Support</h3>
            <ul className="footer-links">
              <li><NavLink to="#" className="footer-link">Help Center</NavLink></li>
              <li><NavLink to="#" className="footer-link">Terms of Service</NavLink></li>
              <li><NavLink to="#" className="footer-link">Privacy Policy</NavLink></li>
              <li><NavLink to="#" className="footer-link">Cookie Policy</NavLink></li>
            </ul>
          </div>
        </div>
        
        <div className="footer-bottom">
          <div className="copyright">
            &copy; {new Date().getFullYear()} EduFlex. All rights reserved. Made with ❤️ by{' '}
            <NavLink to="#" className="footer-link">Sachin Kumar</NavLink>
          </div>
          <div className="footer-bottom-links">
            <NavLink to="#" className="footer-link">Terms</NavLink>
            <NavLink to="#" className="footer-link">Privacy</NavLink>
            <NavLink to="#" className="footer-link">Cookies</NavLink>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer;