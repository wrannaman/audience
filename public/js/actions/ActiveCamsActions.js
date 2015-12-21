import AppDispatcher from '../dispatcher/AppDispatcher';
import ActiveCamsAPI from '../util/ActiveCamsAPI';

import {
  GET_ACTIVE_CAMS,
  FETCH_ACTIVE_CAMS,
  FETCH_ACTIVE_CAMS_SUCCESS,
  FETCH_ACTIVE_CAMS_ERROR
} from '../constants/AppConstants';

export default {
  fetchActive() {
    //console.log('ACTIONS: dispatching get active in actions')
    AppDispatcher.dispatch({
      actionType: FETCH_ACTIVE_CAMS
    });
  }
};
