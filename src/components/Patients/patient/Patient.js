import React from "react";

import styles from "./Patient.module.css";
import Image from "../../UserPhoto/userPhoto";
import formatName from "../../../shared/utils/formatName";

const patient = (props) => {
  return (
    <div className={styles.Patient}>
      <div>
        <Image image={props.image} />
      </div>
      <h5>{formatName(props.surname, props.name)}.</h5>
      <div>
        <p className={styles.Header}>Age</p>
        <p>{props.age}Y</p>
      </div>
      <div>
        <p className={styles.Header}>gender</p>
        <p>{props.gender}</p>
      </div>
      <div>
        <p className={styles.Header}>BMI</p>
        <p>{props.bmi}</p>
      </div>
      <div>
        <p className={styles.Header}>Height</p>
        <p>{props.height}cm</p>
      </div>
      <div>
        <p className={styles.Header}>Weight</p>
        <p>{props.weight}kg</p>
      </div>
      <div className={styles.IconsHolder}>
        <span className={styles.IconsHolderSpan}>
          <i className="fas fa-comment-alt"></i>
          <small className={styles.HiddenTextDesc}>Start chat</small>
        </span>
        <span className={styles.IconsHolderSpan}>
          <i className="fas fa-file-alt"></i>
          <small className={styles.HiddenTextDesc}>Create an encounter</small>
        </span>
      </div>
    </div>
  );
};

export default patient;
