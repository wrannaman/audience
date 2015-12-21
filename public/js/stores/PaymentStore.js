import BaseStore      from './BaseStore';
import AppDispatcher  from '../dispatcher/AppDispatcher';
import PaymentAPI     from '../util/PaymentAPI';

import {
  PAYMENT_CHANGE,
  CREATE_PAYMENT,
  CREATE_PAYMENT_SUCCESS,
  CREATE_PAYMENT_ERROR
} from '../constants/AppConstants';

/* THE profile OBJECT WILL CONTAIN .error PROPERTY IF ANY ERRORS */
let Payment = {};

class PaymentStore extends BaseStore {
  emitChange() {
    //console.log("USERSSTORE: emitting change");
    this.emit(PAYMENT_CHANGE);
  }
  addChangeListener(callback) {
    this.on(PAYMENT_CHANGE, callback);
  }
  removeChangeListener(callback) {
    this.removeListener(PAYMENT_CHANGE, callback);
  }

  create_payment( user ){
    PaymentAPI.create_payment( user );
  }

  create_payment_error( user ){
    console.log('create_payment_error', user);
  }

  create_payment_success( payment ){
    console.log('create_payment_success', payment);
    Payment = payment;
    this.emitChange();
  }
  get_profile() {
    return Profile;
  }

}

let store = new PaymentStore();

AppDispatcher.register((action) => {
  //console.log('USERSSTORE: ', action);
  switch(action.actionType) {

    /* REGISTER */
    case CREATE_PAYMENT:
      store.create_payment( action.user );
      break;
    case CREATE_PAYMENT_SUCCESS:
      store.create_payment_success( action.profile );
      break;
    case CREATE_PAYMENT_ERROR:
      store.create_payment_error( action );
      break;
    default:
  }
});

export default store;
