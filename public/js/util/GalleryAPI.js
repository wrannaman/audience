import Request from 'superagent';
import AppDispatcher from '../dispatcher/AppDispatcher';
import {
  BASE_URL,
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

/* HEADERS */
// authorization: Bearer we9Jk7lJaZYK0y21JUMYQxYJiBALifnH0B+QgLAGGUlkmwML0xNpc6YfNvlgUnHN


export default {
  create_gallery( payload ){
    var firstImage = 'https://images.unsplash.com/photo-1438109491414-7198515b166b';
    if (payload.type == 1)
    {
      firstImage = 'https://images.unsplash.com/photo-1436891620584-47fd0e565afb';
    }
    var url = BASE_URL
              + 'gallery/create?owner='
              + payload.user_id
              + '&galleryName='
              +  payload.gallery_name
              + '&visibility='
              + (payload.private ? 'private' : 'public')
              + '&first_image='
              + firstImage
              + '&type=' + payload.type;
    Request.get(url)
      .end(function(err, res) {
        //console.log('err', err);
        if (err != null || !res.body.id) {
        return AppDispatcher.dispatch({
                actionType: CREATE_GALLERY_ERROR,
                error: err
              });
        }
        //console.log('res', res.body);
        return AppDispatcher.dispatch({
                actionType: CREATE_GALLERY_SUCCESS,
                gallery: res.body
              });
      })
  },
  update_gallery( payload ) {
    var url = BASE_URL + 'gallery/';

  },
  delete_gallery( payload ) {
    var url = BASE_URL + 'gallery/';

  },
  fetch_gallery( user_id, type ) {
    var url = BASE_URL + 'gallery?owner=' + user_id + '&type=' + type;
    Request.get(url)
      .end(function(err, res) {
        //console.log('err', err);
        //console.log('res.body', res.body);
        if (err != null) {
        return AppDispatcher.dispatch({
                actionType: FETCH_GALLERY_ERROR,
                error: err
              });
        }
        return AppDispatcher.dispatch({
                actionType: FETCH_GALLERY_SUCCESS,
                gallery: res.body,
                type: type
              });
      })
  }

};
