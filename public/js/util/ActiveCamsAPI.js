import Request from 'superagent';
import AppDispatcher from '../dispatcher/AppDispatcher';
import {
  FETCH_ACTIVE_CAMS,
  FETCH_ACTIVE_CAMS_SUCCESS,
  FETCH_ACTIVE_CAMS_ERROR,
  BASE_URL
} from '../constants/AppConstants';


export default {

  // authorization: Bearer we9Jk7lJaZYK0y21JUMYQxYJiBALifnH0B+QgLAGGUlkmwML0xNpc6YfNvlgUnHN
  getActive() {
    var url = BASE_URL + 'activeCams';
    Request.get(url)
      .end( function(err, res){
        if (err){
          return AppDispatcher.dispatch({
            actionType: FETCH_ACTIVE_CAMS_ERROR
          });
        }
        //console.log('API: from active cams api');
        ////console.log('API: from active cams api', res.body.data);
        AppDispatcher.dispatch({
          actionType: FETCH_ACTIVE_CAMS_SUCCESS,
          data: res.body.data
        });
      });
  }
};
