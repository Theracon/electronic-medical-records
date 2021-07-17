import React from "react";

import styles from "./UserPhoto.module.css";

const Image = (props) => {
  return (
    <div>
      <img
        className={styles.Img}
        src={props.image}
        style={props.style}
        alt="User."
      />
    </div>
  );
};

export default Image;