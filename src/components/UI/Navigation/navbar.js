import React from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";

import styles from "./navbar.module.css";
import * as actionCreators from "../../../store/action-creators/authentication";

class Navbar extends React.Component {
  switchUserType = () => {
    this.props.onSwitchUserType();
  };

  render() {
    let navLinks = null;
    if (!this.props.isAuthenticated) {
      navLinks = (
        <React.Fragment>
          <li>
            <NavLink
              to="/"
              exact
              activeClassName={styles.Active}
              style={{ textDecoration: "none" }}
            >
              <span style={{ color: "#DFEEEA" }}>HOME</span>
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/signup"
              exact
              activeClassName={styles.Active}
              style={{ textDecoration: "none" }}
            >
              <span style={{ color: "#DFEEEA" }}>SIGNUP</span>
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/login"
              exact
              activeClassName={styles.Active}
              style={{ textDecoration: "none" }}
            >
              <span style={{ color: "#DFEEEA" }}>LOGIN</span>
            </NavLink>
          </li>
        </React.Fragment>
      );
    } else if (
      this.props.isAuthenticated &&
      this.props.currentUserMode === "hw"
    ) {
      navLinks = (
        <React.Fragment>
          <li>
            <NavLink
              to="/hw-dashboard"
              exact
              activeClassName={styles.Active}
              style={{ textDecoration: "none" }}
            >
              <span style={{ color: "#DFEEEA" }}>DASHBOARD</span>
            </NavLink>
          </li>

          <li onClick={this.switchUserType}>
            <NavLink
              to="/signup"
              exact
              activeClassName={styles.Active}
              style={{ textDecoration: "none" }}
            >
              <span style={{ color: "#DFEEEA" }}>REGISTER A PATIENT</span>
            </NavLink>
          </li>

          <li onClick={this.switchUserType}>
            <NavLink
              to="/my-encounters"
              exact
              activeClassName={styles.Active}
              style={{ textDecoration: "none" }}
            >
              <span style={{ color: "#DFEEEA" }}>ENCOUNTERS</span>
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/logout"
              exact
              activeClassName={styles.Active}
              style={{ textDecoration: "none" }}
            >
              <span style={{ color: "#DFEEEA" }}>LOGOUT</span>
            </NavLink>
          </li>
        </React.Fragment>
      );
    } else if (
      this.props.isAuthenticated &&
      this.props.currentUserMode === "patient"
    ) {
      navLinks = (
        <React.Fragment>
          <li>
            <NavLink
              to="/patient-dashboard"
              exact
              activeClassName={styles.Active}
              style={{ textDecoration: "none" }}
            >
              <span style={{ color: "#DFEEEA" }}>DASHBOARD</span>
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/logout"
              exact
              activeClassName={styles.Active}
              style={{ textDecoration: "none" }}
            >
              <span style={{ color: "#DFEEEA" }}>LOGOUT</span>
            </NavLink>
          </li>
        </React.Fragment>
      );
    }

    return (
      <nav
        className="navbar navbar-expand-lg"
        style={{
          backgroundColor: "#2F5D62",
          minHeight: "10vh",
          color: "white",
        }}
      >
        <div className="container-fluid">
          <div className={styles.HeaderDiv}>
            <h1 className={styles.HeaderText}>EMR</h1>
            <i
              className={"fas fa-stethoscope " + styles.Logo}
              style={{ color: "#DFEEEA" }}
            ></i>
          </div>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" style={{ color: "#DFEEEA" }}>
              <i className="fas fa-bars"></i>
            </span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className={styles.List}>{navLinks}</ul>
          </div>
        </div>
      </nav>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token !== null,
    currentUserMode: state.userMode.userMode,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSwitchUserType: () => dispatch(actionCreators.switchUserType()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
