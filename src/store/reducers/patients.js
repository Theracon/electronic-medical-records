import * as actionTypes from "../action-types/index";
import updateObject from "../../shared/utils/updateObject";

const initialState = {
  allPatients: null,
  loading: false,
  error: null,
};

const getPatientsStarted = (state) => {
  return updateObject(state, { loading: true });
};

const getPatientsSuccessful = (state, action) => {
  return updateObject(state, { loading: false, allPatients: action.patients });
};

const getPatientsFailed = (state, action) => {
  return updateObject(state, { loading: false, error: action.error });
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
