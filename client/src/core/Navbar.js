import React, { Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import { isAuthenticated, signout } from "../auth/apihelper/apicall";

const currentTab = (history, path) => {
  if (history.location.pathname === path) {
    return { color: "#fff" };
  } else {
    return { color: "#000" };
  }
};

const Navbar = ({ history }, user = user) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg3">
      <Link className="navbar-brand" to="/">
        Logo
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item active">
            <Link className="nav-link" to="/" style={currentTab(history, "/")}>
              Home
            </Link>
          </li>

          {/* <Link
              className="nav-link"
              to="/link"
              style={currentTab(history, "/")}
            >
              Link
            </Link> */}

          {isAuthenticated() && isAuthenticated().user.role === 0 && (
            <li>
              <Link
                to="/subjects"
                style={currentTab(history, "/subjects")}
                className="nav-link"
              >
                Subjects
              </Link>
            </li>
          )}
          {isAuthenticated() && isAuthenticated().user.role === 1 && (
            <Fragment>
              <li>
                <Link
                  to="/teacher/createchapter"
                  style={currentTab(history, "/teacher/createchapter")}
                  className="nav-link"
                >
                  Add chapter
                </Link>
              </li>
              <li>
                <Link
                  to="/teacher/createlecture"
                  style={currentTab(history, "/teacher/createlecture")}
                  className="nav-link"
                >
                  Add lecture
                </Link>
              </li>
              <li>
                <Link
                  to="/teacher/chapters"
                  style={currentTab(history, "/teacher/chapters")}
                  className="nav-link"
                >
                  Chapters
                </Link>
              </li>
            </Fragment>
          )}
          {isAuthenticated() && isAuthenticated().user.role === 5 && (
            <Fragment>
              <li>
                <Link
                  to="/admin/createteacher"
                  style={currentTab(history, "/admin/createteacher")}
                  className="nav-link"
                >
                  Add Teacher
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/createstudent"
                  style={currentTab(history, "/admin/createstudent")}
                  className="nav-link"
                >
                  Add Student
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/teachers"
                  style={currentTab(history, "/admin/teachers")}
                  className="nav-link"
                >
                  Teachers
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/students"
                  style={currentTab(history, "/admin/students")}
                  className="nav-link"
                >
                  Students
                </Link>
              </li>
            </Fragment>
          )}
        </ul>
        <ul className="navbar-nav ml-auto">
          {isAuthenticated() && (
            <Fragment>
              <li>
                <Link to="/profile" className="btn btn-outline-dark ">
                  {isAuthenticated().user.name}
                </Link>
              </li>

              <li>
                <button
                  className="btn btn-outline-light"
                  onClick={() => {
                    signout(() => {
                      history.push("/");
                    });
                  }}
                >
                  Signout
                </button>
              </li>
            </Fragment>
          )}
          {!isAuthenticated() && (
            <Fragment>
              <li>
                <Link
                  to="/signin"
                  style={currentTab(history, "/singin")}
                  className="nav-link"
                >
                  <button className="btn btn-outline-light">Signin</button>
                </Link>
              </li>
              <li>
                <Link
                  to="/signup"
                  style={currentTab(history, "/singup")}
                  className="nav-link"
                >
                  <button className="btn btn-outline-light">Signup</button>
                </Link>
              </li>
            </Fragment>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default withRouter(Navbar);
