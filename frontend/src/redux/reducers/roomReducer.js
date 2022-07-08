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
} from '../actions/allTypes';

const room = (
  state = {
    isLoading: null,
    joinedRoom: null,
    leftRoom: null,
    rooms: [],
  },
  action
) => {
  switch (action.type) {
    case ROOM_REQUEST:
      return {
        ...state,
        isLoading: true,
        rooms: [],
      };
    case ROOM_SUCCESS:
      return {
        ...state,
        isLoading: false,
        rooms: action.payload,
      };
    case ROOM_FAILURE:
      return {
        ...state,
        isLoading: false,
        rooms: action.payload,
      };
    case JOIN_ROOM_REQUEST:
      return {
        ...state,
        joinedRoom: null,
      };
    case JOIN_ROOM_SUCCESS:
      return {
        ...state,
        joinedRoom: true,
      };
    case JOIN_ROOM_FAILURE:
      return {
        ...state,
        joinedRoom: false,
      };
    case LEAVE_ROOM_REQUEST:
      return {
        ...state,
        leftRoom: null,
      };
    case LEAVE_ROOM_SUCCESS:
      return {
        ...state,
        leftRoom: true,
      };
    case LEAVE_ROOM_FAILURE:
      return {
        ...state,
        leftRoom: false,
      };
    default:
      return state;
  }
};

export default room;
