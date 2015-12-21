import BaseStore from './BaseStore';
import AppDispatcher from '../dispatcher/AppDispatcher';
import ImageAPI from '../util/ImageAPI';

import {
  ADD_IMAGE,
  ADD_IMAGE_SUCCESS,
  ADD_IMAGE_ERROR,
  ADD_VIDEO,
  ADD_VIDEO_SUCCESS,
  ADD_VIDEO_ERROR,
  DELETE_IMAGE,
  DELETE_IMAGE_SUCCESS,
  DELETE_IMAGE_ERROR,
  DELETE_VIDEO,
  DELETE_VIDEO_SUCCESS,
  DELETE_VIDEO_ERROR,
  IMAGES_CHANGE,
  FETCH_IMAGES_SUCCESS,
  FETCH_IMAGES_ERROR,
  FETCH_IMAGES,
  SHOW_IMAGES,
  SHOW_IMAGES_CHANGE
} from '../constants/AppConstants';

/* Images Structure

Image {
  showImages: bool,
  images: [
    {
      galleryName: '',
      visibility: 'public or private',
      images: [ img1, img2, img3, img4, img5 ]
    }
  ]
}

*/

/* THE Image OBJECT WILL CONTAIN .error PROPERTY IF ANY ERRORS */
let Images = {
  showImages: false,
  images: [],
  active_gallery: {}
};

//console.warn("ImageStore STORE TRUTH", Images);

class ImageStore extends BaseStore {
  emitChange() {
    //console.log("IMAGE_STORE: emitting change", Images);
    this.emit(IMAGES_CHANGE);
  }
  addChangeListener(callback) {
    this.on(IMAGES_CHANGE, callback);
  }
  removeChangeListener(callback) {
    this.removeListener(IMAGES_CHANGE, callback);
  }
  show_images( show, gallery, video ){
    //console.log('show images store', show, gallery, video);
    Images.showImages = show;
    if (gallery)
    {
      Images.active_gallery = gallery;
      // call the api to get the gallery images
      if (video)
      {
        ////console.log('fetching video!')
        ImageAPI.fetch_video(gallery);
      }
      else
      {
        //console.log('fetching gallery!')
        ImageAPI.fetch_images(gallery);
      }
    }
    this.emitChange();
  }
  get_show_images() {
    return Images.showImages;
  }
  fetch_images_success( images ){
    //console.log('fetch_image_success', images);
    Images.showImages = true;
    Images.images = images;
    this.emitChange();
  }
  get_images(){
    return Images.images;
  }
  get_active_gallery() {
    return Images.active_gallery;
  }
  delete_video( payload ){
    ImageAPI.delete_video( payload );
  }
  delete_video_success( payload ){
    //console.log('payload', payload.images);
    Images.images = payload.images;
    Images.showImages = 1;
    Images.active_gallery = payload.active_gallery;
    //console.log('this.get_show_images()', this.get_show_images());
    this.emitChange();
    //console.log('done')
  }
  add_video_success( gallery, video, items ) {
    Images.images = items;
    Images.showImages = true;
    Images.active_gallery = gallery;
    this.emitChange();
  }
  add_image_success( gallery, video ) {
    //console.log('gallery?', gallery, video)
    //console.log('add_image_success show_images');
    this.show_images(true, gallery, video);
  }
  add_image( payload ){
    //console.warn('files image store with active gallery', payload);
    if (payload.video)
    {
      return ImageAPI.add_video( payload );
    }
    return ImageAPI.add_image( payload );
  }
  delete_image( payload ) {
    //console.log('DELETE_IMAGE', payload);
    ImageAPI.delete_image( payload );
  }
  delete_image_success( images ) {
    //console.log('delete_image_success', images);
    Images.images = images;
    Images.showImages = true;
    //console.warn('image state', Images);
    this.emitChange();
  }
}

let store = new ImageStore();

AppDispatcher.register((action) => {

  switch(action.actionType) {

    case ADD_IMAGE:
      store.add_image( action.payload );
      break;
    case ADD_IMAGE_SUCCESS:
      store.add_image_success( action.gallery, action.video );
      break;
    case ADD_IMAGE_ERROR:
      break;
    case ADD_VIDEO_SUCCESS:
      store.add_video_success( action.gallery, action.video, action.items );
      break;
    case DELETE_IMAGE:
      store.delete_image( action );
      break;
    case DELETE_IMAGE_SUCCESS:
      store.delete_image_success( action.images );
      break;
    case DELETE_IMAGE_ERROR:
      break;
    case DELETE_VIDEO:
      store.delete_video( action.payload );
      break;
    case DELETE_VIDEO_SUCCESS:
      store.delete_video_success( action );
    case SHOW_IMAGES:
      //console.log('store show_images', action);
      store.show_images( action.show, action.gallery, action.video );
      break;
    case FETCH_IMAGES_SUCCESS:
      store.fetch_images_success( action.images );
    default:

  }
});

export default store;
