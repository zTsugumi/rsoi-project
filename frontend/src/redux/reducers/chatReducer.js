import { CHAT_REQUEST, CHAT_SUCCESS, CHAT_FAILURE, CHAT_RECV } from '../actions/allTypes';

const chat = (
  state = {
    isLoading: null,
    msgs: [],
  },
  action
) => {
  switch (action.type) {
    case CHAT_REQUEST:
      return {
        ...state,
        isLoading: true,
        msgs: null,
      };
    case CHAT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        msgs: action.payload,
      };
    case CHAT_FAILURE:
      return {
        ...state,
        isLoading: false,
        msgs: action.payload,
      };
    case CHAT_RECV:
      return {
        ...state,
        isLoading: false,
        msgs: [...state.msgs, action.payload],
      };
    default:
      return state;
  }
};

export default chat;
