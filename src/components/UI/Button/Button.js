import React from "react";

import styles from "./Button.module.css";

const button = (props) => {
  return (
    <button className={styles[props.btnType]} disabled={props.btnDisabled}>
      {props.children}
    </button>
  );
};

export default button;
