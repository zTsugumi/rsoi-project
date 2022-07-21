import UserActions from './userActions';
import RoomActions from './roomActions';
import ChatActions from './chatActions';
import ProfileActions from './profileActions';
import StatActions from './statActions';

// Action is a function that create an action object
// The view will trigger the action, which then be sent to reducer to update store
//      type: get from ActionTypes
//      payload: the data that needs to be carried in the action object to the reducer
const AllActions = {
  UserActions,
  RoomActions,
  ChatActions,
  ProfileActions,
  StatActions,
};

export default AllActions;
