import AppDispatcher from '../dispatcher/AppDispatcher';
import PaymentAPI from '../util/PaymentAPI';

import {
  CREATE_PAYMENT,
  CREATE_PAYMENT_SUCCESS,
  CREATE_PAYMENT_ERROR
} from '../constants/AppConstants';

export default {
  create_payment( user ) {
    AppDispatcher.dispatch({
      actionType: CREATE_PAYMENT,
      user: user
    });
  },
};
