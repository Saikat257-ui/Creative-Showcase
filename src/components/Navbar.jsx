import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { getCurrentUser, clearCurrentUser } from "../utils/storage.js";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const user = getCurrentUser();

  const isDashboardActive = location.pathname === "/dashboard";
  const isProfileActive = location.pathname.startsWith("/profile");

  const handleLogout = () => {
    clearCurrentUser();
    navigate("/");
  };

  return (
    <nav
      className="navbar"
      style={{
        padding: "1rem",
        backgroundColor: "#fff",
        borderBottom: "1px solid #ddd",
      }}
    >
      <Link id="logo" to="/" style={{ marginRight: "1rem" }}>
        Creative Showcase
      </Link>

      <div>
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
    </nav>
  );
}

export default Navbar;
