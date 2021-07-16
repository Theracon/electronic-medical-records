import React from "react";

import styles from "./Searchbar.module.css";

class Searchbar extends React.Component {
  render() {
    return (
      <nav
        className="navbar navbar-expand-lg navbar-light"
        style={{ position: "relative" }}
      >
        <div className="container-fluid">
          <div className={styles.Div}>
            <form className={`d-flex ${styles.Form}`}>
              <input
                className={`form-control me-2 ${styles.Input}`}
                type="search"
                placeholder="search..."
                aria-label="Search"
              ></input>
              <button className="btn btn-outline-success" type="submit">
                <i className="fas fa-search"></i>
              </button>
            </form>
          </div>
        </div>
      </nav>
    );
  }
}

export default Searchbar;
