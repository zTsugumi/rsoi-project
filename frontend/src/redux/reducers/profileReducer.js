import {
  PROFILE_REQUEST,
  PROFILE_SUCCESS,
  PROFILE_FAILURE,
  PROFILE_RESET,
} from '../actions/allTypes';

const profile = (
  state = {
    isLoading: null,
    info: null,
    errMess: null,
  },
  action
) => {
  switch (action.type) {
    case PROFILE_REQUEST:
      return {
        ...state,
        isLoading: true,
        info: null,
        errMess: null,
      };
    case PROFILE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        info: action.payload,
        errMess: null,
      };
    case PROFILE_FAILURE:
      return {
        ...state,
        isLoading: false,
        info: null,
        errMess: action.payload,
      };
    case PROFILE_RESET:
      return {
        ...state,
        isLoading: false,
        info: null,
        errMess: null,
      };

    default:
      return state;
  }
};

export default profile;
