import axiosInstance from "../../axios/index";
import * as actionTypes from "../action-types/index";

export const getPatientsStarted = () => {
  return { type: actionTypes.GET_PATIENTS_START };
};

export const getPatientsSuccessful = (patients) => {
  return { type: actionTypes.GET_PATIENTS_SUCCESS, patients: patients };
};

export const getPatientsFailed = (error) => {
  return { type: actionTypes.GET_PATIENTS_FAIL, error: error };
};

export const getPatients = () => {
  return (dispatch) => {
    dispatch(getPatientsStarted());
    axiosInstance
      .get("/patients.json")
      .then((response) => {
        const allPatients = [];
        for (let key in response.data) {
          allPatients.push({
            id: key,
            ...response.data[key],
            bmi:
              response.data[key].weight /
              Math.pow(response.data[key].height / 100, 2),
          });
        }
        dispatch(getPatientsSuccessful(allPatients));
        console.log(allPatients);
      })
      .catch((error) => {
        console.log("ERROR MESSAGE: ", error);
      })
      .catch((error) => {
        dispatch(getPatientsFailed(error));
        console.log("ERROR MESSAGE: ", error);
      });
  };
};
