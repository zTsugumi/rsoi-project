import axios from 'axios';
import {
  ROOM_REQUEST,
  ROOM_SUCCESS,
  ROOM_FAILURE,
  JOIN_ROOM_REQUEST,
  JOIN_ROOM_SUCCESS,
  JOIN_ROOM_FAILURE,
  LEAVE_ROOM_REQUEST,
  LEAVE_ROOM_SUCCESS,
  LEAVE_ROOM_FAILURE,
} from './allTypes';
import { URL_GW, PFX } from '../../shared/config';

const roomRequest = () => ({
  type: ROOM_REQUEST,
});

const roomSuccess = (rooms) => ({
  type: ROOM_SUCCESS,
  payload: rooms,
});

const roomError = (msg) => ({
  type: ROOM_FAILURE,
  payload: msg,
});

const roomGet = (pagination) => async (dispatch) => {
  dispatch(roomRequest());

  const url = `${URL_GW}${PFX}/rooms`;

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

const joinRoomRequest = () => ({
  type: JOIN_ROOM_REQUEST,
});

const joinRoomSuccess = () => ({
  type: JOIN_ROOM_SUCCESS,
});

const joinRoomError = () => ({
  type: JOIN_ROOM_FAILURE,
});

const leaveRoomRequest = () => ({
  type: LEAVE_ROOM_REQUEST,
});

const leaveRoomSuccess = () => ({
  type: LEAVE_ROOM_SUCCESS,
});

const leaveRoomError = () => ({
  type: LEAVE_ROOM_FAILURE,
});

const roomActions = {
  roomGet,
  joinRoomRequest,
  joinRoomSuccess,
  joinRoomError,
  leaveRoomRequest,
  leaveRoomSuccess,
  leaveRoomError,
};

export default roomActions;
