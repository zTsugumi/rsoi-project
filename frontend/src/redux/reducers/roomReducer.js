import { ROOM_REQUEST, ROOM_SUCCESS, ROOM_FAILURE } from '../actions/allTypes';

const room = (
  state = {
    isLoading: true,
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
    default:
      return state;
  }
};

export default room;
