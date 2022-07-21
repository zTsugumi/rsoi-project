import { CHAT_REQUEST, CHAT_SUCCESS, CHAT_FAILURE, CHAT_RECV } from './allTypes';
import { URL_GW, PFX } from '../../shared/config';
import axios from 'axios';

const chatRequest = () => ({
  type: CHAT_REQUEST,
});

const chatSuccess = (chats) => ({
  type: CHAT_SUCCESS,
  payload: chats,
});

const chatError = (msg) => ({
  type: CHAT_FAILURE,
  payload: msg,
});

const chatGet = (roomUUID) => async (dispatch) => {
  dispatch(chatRequest());

  const url = `${URL_GW}${PFX}/chats/${roomUUID}`;

  return await axios({
    method: 'get',
    url: url,
  })
    .then((response) => {
      dispatch(chatSuccess(response.data));
    })
    .catch((error) => {
      dispatch(chatError(error.response.data.message));
    });
};

const chatRecv = (msg) => ({
  type: CHAT_RECV,
  payload: msg,
});

const chatActions = {
  chatGet,
  chatRecv,
};

export default chatActions;
