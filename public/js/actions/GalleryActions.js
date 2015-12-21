import AppDispatcher from '../dispatcher/AppDispatcher';
import GalleryAPI from '../util/GalleryAPI';

import {
  CREATE_GALLERY,
  CREATE_GALLERY_SUCCESS,
  CREATE_GALLERY_ERROR,
  UPDATE_GALLERY,
  UPDATE_GALLERY_SUCCESS,
  UPDATE_GALLERY_ERROR,
  FETCH_GALLERY,
  FETCH_GALLERY_SUCCESS,
  FETCH_GALLERY_ERROR,
  DELETE_GALLERY,
  DELETE_GALLERY_SUCCESS,
  DELETE_GALLERY_ERROR,
  GALLERY_CHANGE
} from '../constants/AppConstants';

export default {
  fetch_gallery( user_id ) {
    AppDispatcher.dispatch({
      actionType: FETCH_GALLERY,
      user_id: user_id
    });
  },
  create_gallery( payload ){
    AppDispatcher.dispatch({
      actionType: CREATE_GALLERY,
      payload: payload
    });
  }
};
