import BaseStore from './BaseStore';
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

/* Gallery Structure

Gallery {
  owner: user,
  galleries: [
    {
      galleryName: '',
      visibility: 'public or private',
      images: [ img1, img2, img3, img4, img5 ]
    }
  ]
}

*/

/* THE Gallery OBJECT WILL CONTAIN .error PROPERTY IF ANY ERRORS */
let Gallery = [];

console.warn("GalleryStore STORE TRUTH", Gallery);

class GalleryStore extends BaseStore {
  emitChange() {
    //console.log("GALLERY_STORE: emitting change");
    this.emit(GALLERY_CHANGE);
  }
  addChangeListener(callback) {
    this.on(GALLERY_CHANGE, callback);
  }
  removeChangeListener(callback) {
    this.removeListener(GALLERY_CHANGE, callback);
  }
  fetch_gallery( user_id, type ) {
    Gallery = [];
    return  GalleryAPI.fetch_gallery( user_id, type );
  }
  update_gallery( gallery ) {
    Gallery =  gallery;
    //console.warn('updating gallery', Gallery);
    this.emitChange();
  }
  get_gallery() {
    return Gallery;
  }
  create_gallery( payload ) {
    //console.warn('create_gallery', payload);
    GalleryAPI.create_gallery( payload );
  }
  create_gallery_success( galleryItem ){
    Gallery.push( galleryItem );
    this.emitChange();
  }

}

let store = new GalleryStore();

AppDispatcher.register((action) => {

  switch(action.actionType) {

    case CREATE_GALLERY:
      store.create_gallery( action.payload );
      break;
    case CREATE_GALLERY_SUCCESS:
      store.create_gallery_success( action.gallery )
      break;
    case CREATE_GALLERY_ERROR:
      break;
    case UPDATE_GALLERY:
      break;
    case UPDATE_GALLERY_SUCCESS:
      break;
    case UPDATE_GALLERY_ERROR:
      break;
    case FETCH_GALLERY:
      store.fetch_gallery( action.user_id, action.type );
      break;
    case FETCH_GALLERY_SUCCESS:
      store.update_gallery( action.gallery )
      break;
    case FETCH_GALLERY_ERROR:
      break;
    case DELETE_GALLERY:
      break;
    case DELETE_GALLERY_SUCCESS:
      break;
    case DELETE_GALLERY_ERROR:
      break;
    case GALLERY_CHANGE:
      break;

    default:
      //console.log('USERSSTORE: users default fallthrough');
  }
});

export default store;
