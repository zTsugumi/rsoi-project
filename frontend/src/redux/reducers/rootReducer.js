import { combineReducers } from 'redux';
import user from './userReducer';
import room from './roomReducer';

const rootReducer = combineReducers({
  user,
  room,
});

export default rootReducer;
