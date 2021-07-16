import axios from "axios";
import axiosInstance from "../../axios/index";
import * as actionTypes from "../action-types/index";

export const authenticationStarted = () => {
  return { type: actionTypes.AUTH_START };
};

export const authenticationSuccessful = (idToken, localId) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    idToken: idToken,
    userId: localId,
  };
};

export const authenticationFailed = (error) => {
  return { type: actionTypes.AUTH_FAIL, error: error };
};

export const signup = (email, password, props, redirectPath) => {
  return (dispatch) => {
    dispatch(authenticationStarted());
    const API_KEY = "AIzaSyCe1DfCRnQlDSoOVOeRE1O9Ck-9tOra4Fg";
    const userData = {
      email: email,
      password: password,
      returnSecureToken: true,
    };
    axios
      .post(
        `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`,
        userData
      )
      .then((response) => {
        const expirationDate = new Date(
          new Date().getTime() + response.data.expiresIn * 1000
        );
        localStorage.setItem("userId", response.data.localId);
        localStorage.setItem("token", response.data.idToken);
        localStorage.setItem("expirationDate", expirationDate);
        dispatch(
          authenticationSuccessful(response.data.idToken, response.data.localId)
        );
        dispatch(logout(response.data.expiresIn));
        props.history.push(redirectPath);
      })
      .catch((error) => {
        dispatch(authenticationFailed(error.response.data.error));
      });
  };
};

export const login = (email, password, props) => {
  return (dispatch) => {
    dispatch(authenticationStarted());
    const API_KEY = "AIzaSyCe1DfCRnQlDSoOVOeRE1O9Ck-9tOra4Fg";
    const userData = {
      email: email,
      password: password,
      returnSecureToken: true,
    };
    axios
      .post(
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`,
        userData
      )
      .then((response) => {
        axiosInstance
          .get("/doctors.json")
          .then((response) => {
            const doctors = [];
            for (let key in response.data) {
              doctors.push(response.data[key]);
            }
            const emails = doctors.map((doctor) => doctor.email);
            if (emails.indexOf(email) >= 0) {
              props.history.push("/hw-dashboard");
            } else {
              props.history.push("/patient-dashboard");
            }
          })
          .catch((error) => {
            console.log(error);
          });

        const expirationDate = new Date(
          new Date().getTime() + response.data.expiresIn * 1000
        );
        localStorage.setItem("userId", response.data.localId);
        localStorage.setItem("token", response.data.idToken);
        localStorage.setItem("expirationDate", expirationDate);
        dispatch(
          authenticationSuccessful(response.data.idToken, response.data.localId)
        );
        dispatch(logout(response.data.expiresIn));
      })
      .catch((error) => {
        dispatch(authenticationFailed(error.response.data.error));
      });
  };
};

export const authCheckState = () => {
  return (dispatch) => {
    const token = localStorage.getItem("token");
    if (!token) {
      dispatch(authLogout());
    } else {
      const expirationDate = new Date(localStorage.getItem("expirationDate"));
      if (expirationDate <= new Date()) {
        dispatch(authLogout());
      } else {
        const userId = localStorage.getItem("userId");
        dispatch(authenticationSuccessful(token, userId));
        dispatch(
          logout((expirationDate.getTime() - new Date().getTime()) / 1000)
        );
      }
    }
  };
};

export const authLogout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("expirationDate");
  localStorage.removeItem("userId");
  localStorage.removeItem("username");
  return { type: actionTypes.AUTH_LOGOUT };
};

export const logout = (expirationTime) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(authLogout());
    }, expirationTime * 1000);
  };
};

export const switchUserType = () => {
  return { type: actionTypes.SWITCH_USER_TYPE };
};
