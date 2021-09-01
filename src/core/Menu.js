import React from "react";
import { Link, withRouter } from "react-router-dom";
import { signout, isAuthenticated } from "../auth";
import logo from "../images/logo.png";

const isActive = (history, path) => {
  if (history.location.pathname === path) {
    return { color: "#fc0" };
  } else {
    return { color: "#fff" };
  }
};

const Menu = ({ history }) => {
  return (
    <div>
      <nav
        className="navbar navbar-expand-lg navbar-dark"
        style={{
          paddingRight: 60,
          paddingLeft: 60,
          paddingTop: 15,
          paddingBottom: 15,
          backgroundColor: "#232323",
        }}
      >
        <Link className="navbar-brand" style={isActive(history, "/")} to="/">
          {/* <span style={{ fontWeight: "bold" }}>LIZZY</span> */}
          <img src={logo} alt="logo" style={{ height: 70 }} />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span
            className="navbar-toggler-icon"
            style={{ color: "#fff" }}
          ></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav text-center">
            {isAuthenticated() && (
              <li className="nav-item">
                <Link
                  className="nav-link menu-items"
                  style={isActive(history, "/users")}
                  to="/users"
                >
                  Users
                </Link>
              </li>
            )}
            {isAuthenticated() && (
              <li className="nav-item">
                <Link
                  to={`/findpeople`}
                  className="nav-link menu-items"
                  style={isActive(history, `/findpeople`)}
                >
                  Find People
                </Link>
              </li>
            )}
          </ul>
          <ul className="navbar-nav ml-auto text-center">
            {isAuthenticated() && (
              <li className="nav-item">
                <Link
                  to={`/post/create`}
                  className="nav-link menu-items"
                  style={isActive(history, `/post/create`)}
                >
                  Create Post
                </Link>
              </li>
            )}
            {isAuthenticated() && (
              <li className="nav-item">
                <Link
                  to={`/user/${isAuthenticated().user._id}`}
                  className="nav-link menu-items"
                  style={isActive(
                    history,
                    `/user/${isAuthenticated().user._id}`
                  )}
                >
                  {`${isAuthenticated().user.name}'s profile`}
                </Link>
              </li>
            )}
            {!isAuthenticated() && (
              <li className="nav-item">
                <Link
                  className="nav-link menu-items"
                  style={isActive(history, "/signin")}
                  to="/signin"
                >
                  Sign In
                </Link>
              </li>
            )}
            {!isAuthenticated() && (
              <li className="nav-item">
                <Link
                  className="nav-link menu-items"
                  style={isActive(history, "/signup")}
                  to="/signup"
                >
                  Sign Up
                </Link>
              </li>
            )}

            {isAuthenticated() && (
              <li className="nav-item">
                <a
                  href="/"
                  className="nav-link menu-items"
                  style={
                    (isActive(history, "/signout"),
                    {
                      cursor: "pointer",
                      color: "#fff",
                    })
                  }
                  onClick={() => {
                    signout(() => {
                      history.push("/");
                    });
                  }}
                >
                  Sign Out
                </a>
              </li>
            )}
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default withRouter(Menu);
