import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../../actions/auth";

const Navbar = ({
  auth: { isAuthenticated, loading, admin, instructor, isInstructor, isAdmin },
  logout,
}) => {
  const processLink = (
    <ul>
      <li>
        <div>
          {isAuthenticated && isAdmin ? (
            <Link to={`Profile/${admin.ID}`} style={{ background: "green" }}>
              {" "}
              <i className="fas fa-user"></i>{" "}
              <span className="hide-sm">Profile</span>
            </Link>
          ) : (
            <Link
              to={`Profile/${instructor.ID}`}
              style={{ background: "green" }}
            >
              {" "}
              <i className="fas fa-user"></i>{" "}
              <span className="hide-sm">Profile</span>
            </Link>
          )}
        </div>
      </li>
      <li>
        <div>
          {isAuthenticated && isAdmin ? (
            <Link to="/adminDashboard" style={{ background: "green" }}>
              <i className="fa fa-home"></i>{" "}
              <span className="hide-sm">Dashboard</span>
            </Link>
          ) : (
            <Link to="/instructorDashboard" style={{ background: "green" }}>
              <i className="fa fa-home"></i>{" "}
              <span className="hide-sm">Dashboard</span>
            </Link>
          )}
        </div>
      </li>
      <li>
        {isAuthenticated && isAdmin ? (
          <a
            onClick={logout}
            href="/"
            style={{ /* color: '#fff',  */ background: "red" }}
          >
            <i className="fa fa-sign-out"></i>{" "}
            <span className="hide-sm">Logout</span>
          </a>
        ) : (
          <a
            onClick={logout}
            href="/"
            style={{ /* color: '#fff',  */ background: "red" }}
          >
            <i className="fa fa-sign-out"></i>{" "}
            <span className="hide-sm">Logoutss</span>
          </a>
        )}
      </li>
    </ul>
  );

  const guestLinks = (
    <ul>
      <li>
        <Link to="/login" style={{ color: "#fff", background: "#17a2b8" }}>
          Admin Login
        </Link>
      </li>
    </ul>
  );

  return (
    <nav className="navbar bg-light">
      <h1>
        <Link to="/">
          <p style={{ float: "left", color: "#17a2b8" }}>
            <i className="fas fa-file"></i> SLIIT IAS
          </p>
        </Link>
      </h1>
      <div>
        {isAuthenticated ? (
          <Fragment>{/* user ? authLinks : */ processLink}</Fragment>
        ) : (
          <Fragment>{/* user ? authLinks : */ guestLinks}</Fragment>
        )}
      </div>
    </nav>
  );
};

Navbar.propTypes = {
  auth: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { logout })(Navbar);
