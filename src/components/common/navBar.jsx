import React from "react";
import { Link, NavLink } from "react-router-dom";

export default function Navbar({ userAuth }) {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link className="navbar-brand m-2" to="/">
        Facebook
      </Link>
      <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div className="navbar-nav">
          {!userAuth && (
            <React.Fragment>
              <NavLink className="nav-item nav-link" to="/login">
                Login
              </NavLink>
              <NavLink className="nav-item nav-link" to="/signUp">
                Sign Up
              </NavLink>
            </React.Fragment>
          )}
          {userAuth && (
            <React.Fragment>
              <NavLink className="nav-item nav-link" to="/">
                {" "}
                Hi, {userAuth.userName}
              </NavLink>
              {userAuth.Role === "Admin" && (
                <NavLink className="nav-item nav-link" to="/postsDetails">
                  Posts Details
                </NavLink>
              )}
              <NavLink className="nav-item nav-link" to="/logout">
                Log Out
              </NavLink>
            </React.Fragment>
          )}
        </div>
      </div>
    </nav>
  );
}
