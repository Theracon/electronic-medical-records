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
            <ul className={styles.List}>
              {!this.props.isAuthenticated ? (
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
              ) : null}

              {!this.props.isAuthenticated ? (
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
              ) : null}

              {!this.props.isAuthenticated ? (
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
              ) : null}

              {this.props.isAuthenticated ? (
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
              ) : null}

              {this.props.isAuthenticated ? (
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
              ) : null}

              {this.props.isAuthenticated ? (
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
              ) : null}
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token !== null,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSwitchUserType: () => dispatch(actionCreators.switchUserType()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
