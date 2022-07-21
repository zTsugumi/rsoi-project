import { STAT_REQUEST, STAT_SUCCESS, STAT_FAILURE } from '../actions/allTypes';

const stat = (
  state = {
    isLoading: null,
    stats: [],
  },
  action
) => {
  switch (action.type) {
    case STAT_REQUEST:
      return {
        ...state,
        isLoading: true,
        stats: [],
      };
    case STAT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        stats: action.payload,
      };
    case STAT_FAILURE:
      return {
        ...state,
        isLoading: false,
        stats: action.payload,
      };

    default:
      return state;
  }
};

export default stat;
