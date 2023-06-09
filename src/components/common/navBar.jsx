import React from "react";
import { Link, NavLink } from "react-router-dom";
import { LogoutOutlined, SettingOutlined } from "@ant-design/icons";

export default function Navbar({ userAuth }) {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div className="navbar-nav">
          {!userAuth && (
            <div className="nav-links-container">
              <NavLink className="nav-item nav-link" to="/login">
                Login
              </NavLink>
              <NavLink className="nav-item nav-link" to="/signUp">
                Sign Up
              </NavLink>
            </div>
          )}
          {userAuth && (
            <>
            <div className="nav-links-container">
              <NavLink className="nav-item nav-link" to="/logout">
                <LogoutOutlined className="logout-icon"/>
                LogOut
              </NavLink>
              <NavLink className="nav-item nav-link" to="/">
                {" "}
                Hi, {userAuth.userName}
              </NavLink>
              {userAuth.Role === "Admin" && (
                <NavLink className="nav-item nav-link" to="/postsDetails">
                  <SettingOutlined className="logout-icon"/>
                  Admin Panel
                </NavLink>
              )}
            </div>
              <Link className="navbar-brand" to="/">
                OpenU-Social
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
