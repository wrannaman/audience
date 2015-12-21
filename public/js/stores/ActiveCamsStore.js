import BaseStore from './BaseStore';
import AppDispatcher from '../dispatcher/AppDispatcher';
import ActiveCamsAPI from '../util/ActiveCamsAPI';

import {
  GET_ACTIVE_CAMS,
  FETCH_ACTIVE_CAMS,
  FETCH_ACTIVE_CAMS_SUCCESS,
  FETCH_ACTIVE_CAMS_ERROR
} from '../constants/AppConstants';

let activeCams = [];

class ActiveCamsStore extends BaseStore {

  emitChange() {
    //console.log("STORE: emitting change");
    this.emit(FETCH_ACTIVE_CAMS_SUCCESS);
  }

  addChangeListener(callback) {
    this.on(FETCH_ACTIVE_CAMS_SUCCESS, callback);
  }

  removeChangeListener(callback) {
    this.removeListener(FETCH_ACTIVE_CAMS_SUCCESS, callback);
  }
  fetchActiveCams() {
    //console.log('STORE:  fetching active cams');
    return ActiveCamsAPI.getActive();
    emitChange();
  }
  updateActiveCams(d) {
    //console.log("STORE: updating active cams store")
    activeCams = d;
  }
  getActiveCams() {
    //console.log("STORE: get active cams", activeCams)
    return activeCams;
  }
}

let store = new ActiveCamsStore();

AppDispatcher.register((action) => {
  //console.log('STORE: ', action);
  switch(action.actionType) {
    case FETCH_ACTIVE_CAMS:
      store.fetchActiveCams();
      break;
    case GET_ACTIVE_CAMS:
      store.fetchActiveCams();
      break;
    case FETCH_ACTIVE_CAMS_SUCCESS:
      store.updateActiveCams(action.data);
      store.emitChange();
      break
    case FETCH_ACTIVE_CAMS_ERROR:
      //console.log('STORE:  get active cams error');
      store.emitChange();
      break;
    default:
      //console.log('STORE: active cams default fallthrough');
  }
});

export default store;
