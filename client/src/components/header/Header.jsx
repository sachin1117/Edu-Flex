import React, { useState, useEffect } from 'react'
import { NavLink, useLocation } from "react-router-dom"
import "./header.css"

const Header = ({ isAuth, user }) => {
  const [isScrolled, setIsScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header>
      <nav className={`navbar navbar-expand-lg ${isScrolled ? 'navbar-scrolled' : ''}`}>
        <div className="container">
          <NavLink to="/" className="navbar-brand">
            EduFlex
          </NavLink>
          
          <button 
            className="navbar-toggler" 
            type="button" 
            data-bs-toggle="collapse" 
            data-bs-target="#navbarNavAltMarkup" 
            aria-controls="navbarNavAltMarkup" 
            aria-expanded="false" 
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav ms-auto">
              <NavLink 
                to="/" 
                className="nav-link"
                isActive={() => location.pathname === '/'}
              >
                Home
              </NavLink>
              
              <NavLink 
                to="/courses" 
                className="nav-link"
                isActive={() => location.pathname === '/courses'}
              >
                Courses
              </NavLink>
              
              <NavLink 
                to="/about" 
                className="nav-link"
                isActive={() => location.pathname === '/about'}
              >
                About
              </NavLink>
              
              {isAuth ? (
                <>
                  {(user?.role === 'admin' || user?.role === 'superadmin') && (
                    <NavLink 
                      to="/admin/dashboard" 
                      className="nav-link"
                      isActive={() => location.pathname.startsWith('/admin')}
                    >
                      Admin Dashboard
                    </NavLink>
                  )}
                  <NavLink 
                    to="/account" 
                    className="nav-link"
                    isActive={() => location.pathname === '/account'}
                  >
                    My Account
                  </NavLink>
                </>
              ) : (
                <NavLink 
                  to="/login" 
                  className="nav-link"
                  isActive={() => location.pathname === '/login'}
                >
                  Login
                </NavLink>
              )}
            </div>
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Header