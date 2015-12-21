import BaseStore from './BaseStore';
import AppDispatcher from '../dispatcher/AppDispatcher';
import MessagesAPI from '../util/MessagesAPI';

import {
  GET_MESSAGES,
  SEND_MESSAGE,
  FETCH_MESSAGES,
  FETCH_MESSAGES_SUCCESS,
  FETCH_MESSAGES_ERROR
} from '../constants/AppConstants';

let messages = [];

class MessagesStore extends BaseStore {

  emitChange() {
    ////console.log("STORE: emitting change");
    this.emit(FETCH_MESSAGES_SUCCESS);
  }

  addChangeListener(callback) {
    this.on(FETCH_MESSAGES_SUCCESS, callback);
  }

  removeChangeListener(callback) {
    this.removeListener(FETCH_MESSAGES_SUCCESS, callback);
  }
  fetchMessages(user_id) {
    //console.log('STORE:  fetching messages');
    return MessagesAPI.getMessages(user_id);
    emitChange();
  }
  updateMessages(d) {
    //console.log("STORE: updating messages store")
    messages = d;
  }
  getMessages() {
    //console.log("STORE: messages ", messages)
    return messages;
  }
  sendMessage(obj) {
    //console.log("STORE: send message ", obj )
    return MessagesAPI.sendMessage(obj);
  }
}

let store = new MessagesStore();

AppDispatcher.register((action) => {
  //console.log('STORE: ', action);
  switch(action.actionType) {
    case FETCH_MESSAGES:
      store.fetchMessages(action.user_id);
      break;
    case GET_MESSAGES:
      store.fetchMessages();
      break;
    case SEND_MESSAGE:
      store.sendMessage(action);
      break;
    case FETCH_MESSAGES_SUCCESS:
      store.updateMessages(action.data);
      store.emitChange();
      break
    case FETCH_MESSAGES_ERROR:
      //console.log('STORE:  messages cams error');
      store.emitChange();
      break;
    default:
      //console.log('STORE: messages default fallthrough');
  }
});

export default store;
