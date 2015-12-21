import Request from 'superagent';
import AppDispatcher from '../dispatcher/AppDispatcher';
import {
  FETCH_MESSAGES,
  FETCH_MESSAGES_SUCCESS,
  FETCH_MESSAGES_ERROR,
  BASE_URL
} from '../constants/AppConstants';


export default {

  // authorization: Bearer we9Jk7lJaZYK0y21JUMYQxYJiBALifnH0B+QgLAGGUlkmwML0xNpc6YfNvlgUnHN
  getMessages(user_id) {
    var url = BASE_URL + 'getMessages';
    Request.post(url)
      .send({ id: user_id })
      .end( function(err, res){
        if (err){
          return AppDispatcher.dispatch({
            actionType: FETCH_MESSAGES_ERROR
          });
        }
        //console.log('API: getMessages from messages api');
        //console.log('API: from active cams api', res.body.data);
        AppDispatcher.dispatch({
          actionType: FETCH_MESSAGES_SUCCESS,
          data: res.body.data
        });
      });
  },
  sendMessage(obj) {
    var url = BASE_URL + 'sendMessage';
    Request.post(url)
      .send({data: obj})
      .end(function(err,res){
        if (err){
          return AppDispatcher.dispatch({
            actionType: FETCH_MESSAGES_ERROR
          });
        }
        //console.log('API: sendMessage from messages api');
        //console.log('API: from active cams api', res.body.data);
        AppDispatcher.dispatch({
          actionType: FETCH_MESSAGES_SUCCESS,
          data: res.body.data
        });
      })
  }
};
