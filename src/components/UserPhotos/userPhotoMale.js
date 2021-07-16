import React from "react";

import userImg from "../../assets/images/user-img.png";
import styles from "./UserPhotoMale.module.css";

const logo = () => {
  return (
    <div>
      <img className={styles.Img} src={userImg} alt="User." />
    </div>
  );
};

export default logo;
