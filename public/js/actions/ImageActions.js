import AppDispatcher from '../dispatcher/AppDispatcher';
import ImageAPI from '../util/ImageAPI';

import {
  ADD_IMAGE,
  ADD_IMAGE_SUCCESS,
  ADD_IMAGE_ERROR,
  DELETE_IMAGE,
  DELETE_IMAGE_SUCCESS,
  DELETE_IMAGE_ERROR,
  DELETE_VIDEO,
  DELETE_VIDEO_SUCCESS,
  DELETE_VIDEO_ERROR,
  SHOW_IMAGES,
  SHOW_IMAGES_CHANGE,
  FETCH_IMAGES_SUCCESS,
  FETCH_IMAGES_ERROR,
  FETCH_IMAGES
} from '../constants/AppConstants';

export default {
  add_image( payload ) {
    AppDispatcher.dispatch({
      actionType: ADD_IMAGE,
      payload: payload
    });
  },
  delete_image( payload ){
    AppDispatcher.dispatch({
      actionType: DELETE_IMAGE,
      payload: payload
    });
  },
  show_images( show, gallery, video ){
    AppDispatcher.dispatch({
      actionType: SHOW_IMAGES,
      show: show,
      gallery: gallery,
      video: video
    });
  },
  delete_video( payload ){
    AppDispatcher.dispatch({
      actionType: DELETE_VIDEO,
      payload: payload
    })
  },
};
