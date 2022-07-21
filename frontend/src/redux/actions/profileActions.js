import { PROFILE_REQUEST, PROFILE_SUCCESS, PROFILE_FAILURE, PROFILE_RESET } from './allTypes';
import { URL_GW, PFX } from '../../shared/config';
import axios from 'axios';

const profileRequest = () => ({
  type: PROFILE_REQUEST,
});

const profileSuccess = (info) => ({
  type: PROFILE_SUCCESS,
  payload: info,
});

const profileError = (msg) => ({
  type: PROFILE_FAILURE,
  payload: msg,
});

const profileGet = (userUUID) => async (dispatch) => {
  dispatch(profileRequest());

  const url = `${URL_GW}${PFX}/u/${userUUID}`;

  return await axios({
    method: 'get',
    url: url,
  })
    .then((response) => {
      dispatch(profileSuccess(response.data));
    })
    .catch((error) => {
      dispatch(profileError(error.response.data.message));
    });
};

const profileReset = () => ({
  type: PROFILE_RESET,
});

const profileActions = {
  profileGet,
  profileReset,
};

export default profileActions;
