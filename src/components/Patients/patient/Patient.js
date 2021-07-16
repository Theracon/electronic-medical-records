import React from "react";

import styles from "./Patient.module.css";
import UserImg from "../../UserPhotos/userPhotoMale";

const patient = (props) => {
  const patientName = props.name;
  const nameArr = patientName.split(" ");
  const newNameArr = [];
  newNameArr.push(nameArr[0]);
  for (let i = 1; i < nameArr.length; i++) {
    newNameArr.push(nameArr[i].charAt(0) + ".");
  }
  const newPatientName = newNameArr.join(" ");

  return (
    <div className={styles.Patient}>
      <div>
        <UserImg />
      </div>
      <h5>{newPatientName}</h5>
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
    </div>
  );
};

export default patient;
