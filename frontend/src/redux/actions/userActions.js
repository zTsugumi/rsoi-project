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
import { URL_GW, PFX } from '../../shared/config';
import axios from 'axios';

/****************************************** SIGNUP ******************************************/
const signupRequest = () => ({
  type: SIGNUP_REQUEST,
});

const signupSuccess = () => ({
  type: SIGNUP_SUCCESS,
});

const signupError = (msg) => ({
  type: SIGNUP_FAILURE,
  payload: msg,
});

const signupUser = (creds) => async (dispatch) => {
  dispatch(signupRequest());

  const url = `${URL_GW}${PFX}/signup`;

  return await axios({
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
const signinRequest = () => ({
  type: SIGNIN_REQUEST,
});

const signinSuccess = (creds) => ({
  type: SIGNIN_SUCCESS,
  payload: creds,
});

const signinError = (msg) => ({
  type: SIGNIN_FAILURE,
  payload: msg,
});

const signinUser = (creds) => async (dispatch) => {
  dispatch(signinRequest());

  const url = `${URL_GW}${PFX}/signin`;

  return await axios({ method: 'post', url: url, data: creds, withCredentials: true })
    .then((response) => {
      dispatch(signinSuccess(response.data));
    })
    .catch((error) => {
      dispatch(signinError(error.response.data.message));
    });
};

/****************************************** SIGNOUT *****************************************/
const signoutRequest = () => ({
  type: SIGNOUT_REQUEST,
});

const signoutSuccess = () => ({
  type: SIGNOUT_SUCCESS,
});

const signoutError = (msg) => ({
  type: SIGNOUT_FAILURE,
  payload: msg,
});

const signoutUser = () => async (dispatch) => {
  dispatch(signoutRequest());

  const url = `${URL_GW}${PFX}/signout`;

  return await axios({
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
const authRequest = () => ({
  type: AUTH_REQUEST,
});

const authSuccess = (creds) => ({
  type: AUTH_SUCCESS,
  payload: creds,
});

const authError = (msg) => ({
  type: AUTH_FAILURE,
  payload: msg,
});

const authUser = () => async (dispatch) => {
  dispatch(authRequest());

  const url = `${URL_GW}${PFX}/auth`;

  return await axios({
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
