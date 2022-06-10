import { ROOM_REQUEST, ROOM_SUCCESS, ROOM_FAILURE } from './allTypes';
import { URL_GW } from '../../shared/config';
import axios from 'axios';

const roomRequest = () => {
  return {
    type: ROOM_REQUEST,
  };
};

const roomSuccess = (rooms) => {
  return {
    type: ROOM_SUCCESS,
    payload: rooms,
  };
};

const roomError = (message) => {
  return {
    type: ROOM_FAILURE,
    payload: message,
  };
};

const roomGet = (pagination) => async (dispatch) => {
  dispatch(roomRequest());

  const url = `${URL_GW}/rooms`;

  return await axios({
    method: 'get',
    url: url,
    params: pagination,
  })
    .then((response) => {
      dispatch(roomSuccess(response.data));
    })
    .catch((error) => {
      dispatch(roomError(error.response.data.message));
    });
};

const roomActions = {
  roomGet,
};

export default roomActions;
