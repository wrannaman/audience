import BaseStore from './BaseStore';
import AppDispatcher from '../dispatcher/AppDispatcher';
import ProfileAPI from '../util/ProfileAPI';

import {
  PROFILE_CHANGE,
  FETCH_PROFILE,
  FETCH_PROFILE_SUCCESS,
  FETCH_PROFILE_ERROR
} from '../constants/AppConstants';

/* THE profile OBJECT WILL CONTAIN .error PROPERTY IF ANY ERRORS */
let Profile = {};

class ProfileStore extends BaseStore {
  emitChange() {
    //console.log("USERSSTORE: emitting change");
    this.emit(PROFILE_CHANGE);
  }
  addChangeListener(callback) {
    this.on(PROFILE_CHANGE, callback);
  }
  removeChangeListener(callback) {
    this.removeListener(PROFILE_CHANGE, callback);
  }

  fetch_profile( user ){
    ProfileAPI.fetch_profile( user );
  }

  fetch_profile_error( user ){
    console.log('fetch_profile_error', user);
  }

  fetch_profile_success( profile ){
    console.log('fetch_profile_success', profile);
    Profile = profile;
    this.emitChange();
  }
  get_profile() {
    return Profile;
  }

}

let store = new ProfileStore();

AppDispatcher.register((action) => {
  //console.log('USERSSTORE: ', action);
  switch(action.actionType) {

    /* REGISTER */
    case FETCH_PROFILE:
      store.fetch_profile( action );
      break;
    case FETCH_PROFILE_SUCCESS:
      store.fetch_profile_success( action.profile );
      break;
    case FETCH_PROFILE_ERROR:
      store.fetch_profile_error( action );
      break;
    default:
  }
});

export default store;
