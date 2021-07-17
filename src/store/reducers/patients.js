import * as actionTypes from "../action-types/index";
import updateObject from "../../shared/utils/updateObject";

const initialState = {
  allPatients: [],
  malePatients: [],
  femalePatients: [],
  neonates: [],
  children: [],
  adults: [],
  elderly: [],
  loading: false,
  error: "",
};

const getPatientsStarted = (state) => {
  return updateObject(state, { loading: true });
};

const getPatientsSuccessful = (state, action) => {
  return updateObject(state, {
    loading: false,
    allPatients: action.patients,
    malePatients: getPatientsByGender(action.patients)[0],
    femalePatients: getPatientsByGender(action.patients)[1],
    neonates: getPatientsByAge(action.patients)[0],
    children: getPatientsByAge(action.patients)[1],
    adults: getPatientsByAge(action.patients)[2],
    elderly: getPatientsByAge(action.patients)[3],
  });
};

const getPatientsFailed = (state, action) => {
  return updateObject(state, { loading: false, error: action.error });
};

const getPatientsByGender = (patients) => {
  const malePatients = patients.filter((patient) => patient.gender === "male");
  const femalePatients = patients.filter(
    (patient) => patient.gender === "female"
  );
  return [malePatients, femalePatients];
};

const getPatientsByAge = (patients) => {
  const neonates = patients.filter((patient) => Number(patient.age) < 1);
  const children = patients.filter(
    (patient) => Number(patient.age) >= 1 && Number(patient.age) <= 17
  );
  const adults = patients.filter(
    (patient) => Number(patient.age) >= 18 && Number(patient.age) <= 64
  );
  const elderly = patients.filter((patient) => Number(patient.age) >= 65);
  return [neonates, children, adults, elderly];
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_PATIENTS_START:
      return getPatientsStarted(state);
    case actionTypes.GET_PATIENTS_SUCCESS:
      return getPatientsSuccessful(state, action);
    case actionTypes.GET_PATIENTS_FAIL:
      return getPatientsFailed(state, action);
    default:
      return state;
  }
};

export default reducer;
