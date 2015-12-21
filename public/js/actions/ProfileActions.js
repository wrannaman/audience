import AppDispatcher from '../dispatcher/AppDispatcher';
import ProfileAPI from '../util/ProfileAPI';

import {
  REGISTER_USER,
  LOGIN_USER,
  UPDATE_USER,
  LOGOUT_USER,
  RESET_PASSWORD,
  GET_CURRENT_USER,
  TRIGGER_RESET_PASSWORD_EMAIL,
  RESET_PASSWORD_CHANGE
} from '../constants/AppConstants';

export default {
  fetch_profile_success(user) {
    //console.log('USERS ACTIONS: registerUser')
    AppDispatcher.dispatch({
      actionType: REGISTER_USER,
      user: user
    });
  },
  loginUser(user) {
    //console.log('USERS ACTIONS: loginUser')
    AppDispatcher.dispatch({
      actionType: LOGIN_USER,
      user: user
    });
  },
  logoutUser(user) {
    //console.log('USERS ACTIONS: logoutUser')
    AppDispatcher.dispatch({
      actionType: LOGOUT_USER,
      user: user
    });
  },
  getCurrentUser() {
    //console.log('USERS ACTIONS: getCurrentUser')
    AppDispatcher.dispatch({
      actionType: GET_CURRENT_USER
    });
  },
  trigger_reset_password_email( user ) {
    //console.log('USERS ACTIONS: trigger_reset_password_email', user)
    AppDispatcher.dispatch({
      actionType: TRIGGER_RESET_PASSWORD_EMAIL,
      user: user
    });
  },
  reset_password_save_password( user ) {
    //console.log('USERS ACTIONS: reset_password_save_password', user)
    AppDispatcher.dispatch({
      actionType: RESET_PASSWORD_CHANGE,
      user: user
    });
  },
  updateUser(user) {
    AppDispatcher.dispatch({
      actionType: UPDATE_USER,
      user: user
    });
  }
};
