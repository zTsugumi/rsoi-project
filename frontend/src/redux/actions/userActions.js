import {
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,
  SIGNIN_REQUEST,
  SIGNIN_SUCCESS,
  SIGNIN_FAILURE,
  SIGNOUT_REQUEST,
  SIGNOUT_SUCCESS,
  SIGNOUT_FAILURE,
  AUTH_REQUEST,
  AUTH_SUCCESS,
  AUTH_FAILURE,
} from './allTypes';
import { URL_GW } from '../../shared/config';
import axios from 'axios';

/****************************************** SIGNUP ******************************************/
const signupRequest = () => {
  return {
    type: SIGNUP_REQUEST,
  };
};

const signupSuccess = () => {
  return {
    type: SIGNUP_SUCCESS,
  };
};

const signupError = (message) => {
  return {
    type: SIGNUP_FAILURE,
    payload: message,
  };
};

const signupUser = (creds) => (dispatch) => {
  dispatch(signupRequest());

  const url = `${URL_GW}/signup`;

  return axios({
    method: 'post',
    url: url,
    data: creds,
  })
    .then((response) => {
      // WIP handle this
      dispatch(signupSuccess());
    })
    .catch((error) => {
      dispatch(signupError(error.response.data.message));
    });
};

/****************************************** SIGNIN ******************************************/
const signinRequest = () => {
  return {
    type: SIGNIN_REQUEST,
  };
};

const signinSuccess = (creds) => {
  return {
    type: SIGNIN_SUCCESS,
    payload: creds,
  };
};

const signinError = (message) => {
  return {
    type: SIGNIN_FAILURE,
    payload: message,
  };
};

const signinUser = (creds) => (dispatch) => {
  dispatch(signinRequest());

  const url = `${URL_GW}/signin`;

  return axios({ method: 'post', url: url, data: creds, withCredentials: true })
    .then((response) => {
      dispatch(signinSuccess(response.data));
    })
    .catch((error) => {
      dispatch(signinError(error.response.data.message));
    });
};

/****************************************** SIGNOUT *****************************************/
const signoutRequest = () => {
  return {
    type: SIGNOUT_REQUEST,
  };
};

const signoutSuccess = () => {
  return {
    type: SIGNOUT_SUCCESS,
  };
};

const signoutError = (message) => {
  return {
    type: SIGNOUT_FAILURE,
    payload: message,
  };
};

const signoutUser = () => (dispatch) => {
  dispatch(signoutRequest());

  const url = `${URL_GW}/signout`;

  return axios({
    method: 'get',
    url: url,
    withCredentials: true,
  })
    .then((response) => {
      dispatch(signoutSuccess());
    })
    .catch((error) => {
      dispatch(signoutError(error.response.data.message));
    });
};

/******************************************* AUTH *******************************************/
const authRequest = () => {
  return {
    type: AUTH_REQUEST,
  };
};

const authSuccess = (creds) => {
  return {
    type: AUTH_SUCCESS,
    payload: creds,
  };
};

const authError = (message) => {
  return {
    type: AUTH_FAILURE,
    payload: message,
  };
};

const authUser = () => (dispatch) => {
  dispatch(authRequest());

  const url = `${URL_GW}/auth`;

  return axios({
    method: 'get',
    url: url,
    withCredentials: true,
  })
    .then((response) => {
      dispatch(authSuccess(response.data));
    })
    .catch((error) => {
      dispatch(authError(error.response.data.message));
    });
};

const userActions = {
  signupUser,
  signinUser,
  signoutUser,
  authUser,
};

export default userActions;
