import AppDispatcher from '../dispatcher/AppDispatcher';
import MessagesAPI from '../util/MessagesAPI';

import {
  GET_MESSAGES,
  SEND_MESSAGE,
  FETCH_MESSAGES,
  FETCH_MESSAGES_SUCCESS,
  FETCH_MESSAGES_ERROR
} from '../constants/AppConstants';

export default {
  fetchMessages(user_id) {
    //console.log('ACTIONS: dispatching get messages in actions')
    AppDispatcher.dispatch({
      actionType: FETCH_MESSAGES,
      user_id: user_id
    });
  },
  sendMessage(message, user_id) {
    //console.log('ACTIONS: dispatching get messages in actions')
    AppDispatcher.dispatch({
      actionType: SEND_MESSAGE,
      user_id: user_id,
      message: message
    });
  }
};
