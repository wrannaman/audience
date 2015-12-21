import Request from 'superagent';
import AppDispatcher from '../dispatcher/AppDispatcher';
import {
  CREATE_PAYMENT,
  CREATE_PAYMENT_SUCCESS,
  CREATE_PAYMENT_ERROR,
  BASE_URL
} from '../constants/AppConstants';

/* HEADERS */
// authorization: Bearer we9Jk7lJaZYK0y21JUMYQxYJiBALifnH0B+QgLAGGUlkmwML0xNpc6YfNvlgUnHN


export default {
  create_payment( user ) {
    //console.log('API sending this user', user)
    var url = BASE_URL + 'payments/create_new';
    Request.post(url)
      .send({ user: user })
      .end( function(err, res){
        if (err){
          return AppDispatcher.dispatch({
            actionType: CREATE_PAYMENT_ERROR
          });
        }
        //console.log('USERS API: registerUser ');
        console.log(' create_new payment', req.body);
        AppDispatcher.dispatch({
          actionType: CREATE_PAYMENT_SUCCESS,
          payment: res.body
        });
      });
  },

};
