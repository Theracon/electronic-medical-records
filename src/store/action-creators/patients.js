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
      })
      .catch((error) => {
        dispatch(getPatientsFailed(error));
      });
  };
};

export const syncGetPatientsByGender = (patients) => {
  return { type: actionTypes.GET_PATIENTS_BY_GENDER, patients: patients };
};

export const getPatientsByGender = (gender) => {
  return (dispatch) => {
    dispatch(getPatientsStarted());

    const queryParams = `?orderBy="gender"&equalTo="${gender}"`;

    axiosInstance
      .get(`/patients.json${queryParams}`)
      .then((response) => {
        const patientsByGender = [];

        for (let key in response.data) {
          patientsByGender.push({
            id: key,
            ...response.data[key],
            bmi:
              response.data[key].weight /
              Math.pow(response.data[key].height / 100, 2),
          });
        }
        dispatch(syncGetPatientsByGender(patientsByGender));
      })
      .catch((error) => {
        dispatch(getPatientsFailed(error));
      });
  };
};

export const syncGetPatientsByAge = (patients) => {
  return { type: actionTypes.GET_PATIENTS_BY_AGE, patients: patients };
};

export const getPatientsByAge = (ageFrom, ageTo) => {
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

        const patientsByAge = allPatients.filter(
          (patient) => +patient.age >= +ageFrom && +patient.age <= +ageTo
        );
        dispatch(syncGetPatientsByAge(patientsByAge));
      })
      .catch((error) => {
        dispatch(getPatientsFailed(error));
      });
  };
};

export const syncGetPatientsByBMI = (patients) => {
  return { type: actionTypes.GET_PATIENTS_BY_BMI, patients: patients };
};

export const getPatientsByBMI = (bmiFrom, bmiTo) => {
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

        const patientsByBMI = allPatients.filter(
          (patient) => +patient.bmi >= +bmiFrom && +patient.bmi <= +bmiTo
        );
        dispatch(syncGetPatientsByBMI(patientsByBMI));
      })
      .catch((error) => {
        dispatch(getPatientsFailed(error));
      });
  };
};
