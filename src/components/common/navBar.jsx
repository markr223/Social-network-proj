import React from "react";
import { Link, NavLink } from "react-router-dom";
import { HomeOutlined, LogoutOutlined, SettingOutlined } from "@ant-design/icons";
import { Divider } from "antd";

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
                <LogoutOutlined className="navBar-icon"/>
                LogOut
              </NavLink>
              <Divider className="nav-item-divider" type="vertical" />
              <NavLink className="nav-item nav-link" to="/">
                <HomeOutlined className="navBar-icon" />
                Hi, {userAuth.userName}
              </NavLink>
              {userAuth.Role === "Admin" && (
                <>
                <Divider className="nav-item-divider" type="vertical" />
                <NavLink className="nav-item nav-link" to="/postsDetails">
                  <SettingOutlined className="navBar-icon"/>
                  Admin Panel
                </NavLink>
                </>
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
