import { combineReducers } from 'redux';
import user from './userReducer';
import room from './roomReducer';
import chat from './chatReducer';
import profile from './profileReducer';
import stat from './statReducer';

const rootReducer = combineReducers({
  user,
  room,
  chat,
  profile,
  stat,
});

export default rootReducer;
