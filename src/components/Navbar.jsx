import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { getCurrentUser, clearCurrentUser } from "../utils/storage.js";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const user = getCurrentUser();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      if (scrollTop > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const isDashboardActive = location.pathname === "/dashboard";
  const isProfileActive = location.pathname.startsWith("/profile");

  const handleLogout = () => {
    clearCurrentUser();
    navigate("/");
    setIsMobileMenuOpen(false);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <nav
      className={`navbar ${isScrolled ? "navbar-scrolled" : ""}`}
      style={{
        padding: "1rem",
        borderBottom: "1px solid #ddd",
      }}
    >
      <Link id="logo" to="/" style={{ marginRight: "1rem" }}>
        Creative Showcase
      </Link>

      {/* Desktop Navigation */}
      <div className="navbar-desktop">
        {user ? (
          <>
            <Link
              to="/dashboard"
              style={{
                marginRight: "1rem",
                textDecoration: isDashboardActive ? "underline" : "none",
              }}
            >
              Dashboard
            </Link>
            <Link
              to={`/profile/${user.username}`}
              title="Open public profile page"
              aria-label="Open public profile page"
              style={{
                marginRight: "1rem",
                textDecoration: isProfileActive ? "underline" : "none",
              }}
            >
              Profile
            </Link>
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <div className="authGate">
              <Link to="/login">
                <button className="login-btn">Login</button>
              </Link>

              <Link to="/signup">
                <button className="signup-btn">Signup</button>
              </Link>
            </div>
          </>
        )}
      </div>

      {/* Hamburger Icon for Mobile */}
      <button
        className="hamburger-icon"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        aria-label="Toggle mobile menu"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
          <path d="M3 4H21V6H3V4ZM3 11H21V13H3V11ZM3 18H21V20H3V18Z"></path>
        </svg>
      </button>

      {/* Mobile Menu Panel */}
      <div className={`mobile-menu-panel ${isMobileMenuOpen ? 'open' : ''}`}>
        <button 
          className="close-menu-btn"
          onClick={closeMobileMenu}
          aria-label="Close mobile menu"
        >
          ×
        </button>
        
        <div className="mobile-menu-content">
          {user ? (
            <>
              <Link
                to="/dashboard"
                onClick={closeMobileMenu}
                className={isDashboardActive ? "active" : ""}
              >
                Dashboard
              </Link>
              <Link
                to={`/profile/${user.username}`}
                onClick={closeMobileMenu}
                className={isProfileActive ? "active" : ""}
              >
                Profile
              </Link>
              <button onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" onClick={closeMobileMenu}>
                <button className="login-btn">Login</button>
              </Link>
              <Link to="/signup" onClick={closeMobileMenu}>
                <button className="signup-btn">Signup</button>
              </Link>
            </>
          )}
        </div>
      </div>

      {/* Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="mobile-menu-overlay"
          onClick={closeMobileMenu}
        ></div>
      )}
    </nav>
  );
}

export default Navbar;
