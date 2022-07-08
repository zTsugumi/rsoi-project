import { combineReducers } from 'redux';
import user from './userReducer';
import room from './roomReducer';
import chat from './chatReducer';

const rootReducer = combineReducers({
  user,
  room,
  chat,
});

export default rootReducer;
