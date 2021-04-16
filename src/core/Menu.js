import React from "react";
import { Link, withRouter } from "react-router-dom";
import { signout, isAuthenticated } from "../auth";

const isActive = (history, path) => {
  if (history.location.pathname === path) {
    return { color: "#fc0" };
  } else {
    return { color: "#fff" };
  }
};

const Menu = ({ history }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <Link className="navbar-brand" style={isActive(history, "/")} to="/">
        <span style={{ fontWeight: "bold" }}>HOME</span>
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
        <span className="navbar-toggler-icon" style={{ color: "#fff" }}></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav text-center">
          <li className="nav-item">
            <Link
              className="nav-link"
              style={isActive(history, "/users")}
              to="/users"
            >
              Users
            </Link>
          </li>

          {isAuthenticated() && (
            <li className="nav-item">
              <Link
                to={`/findpeople`}
                className="nav-link"
                style={isActive(history, `/findpeople`)}
              >
                Find People
              </Link>
            </li>
          )}
          {isAuthenticated() && (
            <li className="nav-item">
              <Link
                to={`/post/create`}
                className="nav-link"
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
                className="nav-link"
                style={isActive(history, `/user/${isAuthenticated().user._id}`)}
              >
                {`${isAuthenticated().user.name}'s profile`}
              </Link>
            </li>
          )}
        </ul>
        <ul className="navbar-nav ml-auto text-center">
          {!isAuthenticated() && (
            <li className="nav-item">
              <Link
                className="nav-link"
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
                className="nav-link"
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
                className="nav-link"
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
  );
  // return (
  //   <div>
  //     <ul className="nav nav-tabs bg-primary">
  //       <li className="nav-item">
  //         <Link className="nav-link" style={isActive(history, "/")} to="/">
  //           Home
  //         </Link>
  //       </li>
  //       <li className="nav-item">
  //         <Link
  //           className="nav-link"
  //           style={isActive(history, "/users")}
  //           to="/users"
  //         >
  //           Users
  //         </Link>
  //       </li>
  //       {!isAuthenticated() && (
  //         <li className="nav-item  ml-auto">
  //           <Link
  //             className="nav-link"
  //             style={isActive(history, "/signin")}
  //             to="/signin"
  //           >
  //             Sign In
  //           </Link>
  //         </li>
  //       )}
  //       {!isAuthenticated() && (
  //         <li className="nav-item">
  //           <Link
  //             className="nav-link"
  //             style={isActive(history, "/signup")}
  //             to="/signup"
  //           >
  //             Sign Up
  //           </Link>
  //         </li>
  //       )}
  //       {isAuthenticated() && (
  //         <li className="nav-item">
  //           <Link
  //             to={`/findpeople`}
  //             className="nav-link"
  //             style={isActive(history, `/findpeople`)}
  //           >
  //             Find People
  //           </Link>
  //         </li>
  //       )}
  //       {isAuthenticated() && (
  //         <li className="nav-item">
  //           <Link
  //             to={`/post/create`}
  //             className="nav-link"
  //             style={isActive(history, `/post/create`)}
  //           >
  //             Create Post
  //           </Link>
  //         </li>
  //       )}
  //       {isAuthenticated() && (
  //         <li className="nav-item">
  //           <Link
  //             to={`/user/${isAuthenticated().user._id}`}
  //             className="nav-link"
  //             style={isActive(history, `/user/${isAuthenticated().user._id}`)}
  //           >
  //             {`${isAuthenticated().user.name}'s profile`}
  //           </Link>
  //         </li>
  //       )}
  //       {isAuthenticated() && (
  //         <li className="nav-item  ml-auto">
  //           <a
  //             href="/"
  //             className="nav-link"
  //             style={
  //               (isActive(history, "/signout"),
  //               {
  //                 cursor: "pointer",
  //                 color: "#fff",
  //               })
  //             }
  //             onClick={() => {
  //               signout(() => {
  //                 history.push("/");
  //               });
  //             }}
  //           >
  //             Sign Out
  //           </a>
  //         </li>
  //       )}
  //     </ul>
  //   </div>
  // );
};

export default withRouter(Menu);
