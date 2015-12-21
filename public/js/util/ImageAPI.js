import Request from 'superagent';
import AppDispatcher from '../dispatcher/AppDispatcher';

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
  SHOW_IMAGES,
  SHOW_IMAGES_CHANGE,
  FETCH_IMAGES_SUCCESS,
  FETCH_IMAGES_ERROR,
  FETCH_IMAGES,
  BASE_URL
} from '../constants/AppConstants';

/* HEADERS */
// authorization: Bearer we9Jk7lJaZYK0y21JUMYQxYJiBALifnH0B+QgLAGGUlkmwML0xNpc6YfNvlgUnHN


export default {
  fetch_images( gallery ) {
    //console.log( 'imageapi', gallery );
    var url = BASE_URL
              + 'galleryImages?where={"gallery":"'
              +  gallery.id
              +  '"}';
    //console.log('url', url);
    Request.get(url)
      .end(function(err, res) {
        //console.log('err', err);
        if (err != null || !res.body) {
        return AppDispatcher.dispatch({
                actionType: FETCH_IMAGES_ERROR,
                error: err
              });
        }
        //console.log('res', res.body);
        return AppDispatcher.dispatch({
                actionType: FETCH_IMAGES_SUCCESS,
                images: res.body
              });
      })
  },
  fetch_video( gallery ) {
    //console.log( 'imageapi', gallery );
    var url = BASE_URL
              + 'videoGallery?where={"gallery":"'
              +  gallery.id
              +  '"}';
    //console.log('url', url);
    Request.get(url)
      .end(function(err, res) {
        //console.log('err', err);
        if (err != null || !res.body) {
        return AppDispatcher.dispatch({
                actionType: FETCH_IMAGES_ERROR,
                error: err
              });
        }
        //console.log('res', res.body);
        return AppDispatcher.dispatch({
                actionType: FETCH_IMAGES_SUCCESS,
                images: res.body
              });
      })
  },
  add_image( payload ){
    //console.warn('add_image API', payload);

    payload.files.forEach( (file, i) => {
      //console.log('file', i);

      var url = BASE_URL
                + 'upload_image/'
                + payload.gallery.id
                + '/'
                + payload.user
                + '/'
                + file.name;
      var req = Request.post(url);

      req.field('name', file.name)
      req.field('altText', file.altText)
      req.field('caption', file.caption)
      req.field('size', file.size)
      req.attach(file.name, file, file.name);
      //console.log('file', file);

      req.end(function(err,res){
      //  console.log('err', err);
        //console.log('res', res);

        return AppDispatcher.dispatch({
                actionType: ADD_IMAGE_SUCCESS,
                gallery: payload.gallery,
                video: false
              });

      });
    });
  },
  add_video( payload ){
  //  console.warn('add_video API', payload);

    payload.files.forEach( (file, i) => {
      //console.log('file', i);

      var url = BASE_URL
                + 'process_videos/'
                + payload.gallery.id
                + '/'
                + payload.user
                + '/'
                + file.name;
      var req = Request.post(url);

      req.field('name', file.name)
      req.field('altText', file.altText)
      req.field('caption', file.caption)
      req.field('size', file.size)
      req.attach(file.name, file, file.name);
      //console.log('file', file);

      req.end(function(err,res){
        //console.log('err', err);
        //console.log('res', res);

        if (err)
        {
          return AppDispatcher.dispatch({
                  actionType: ADD_IMAGE_ERROR,
                  gallery: payload.gallery,
                  video: true
                });
        }

        var url = BASE_URL + 'upload_video'
        Request.post(url)
        .send({data: res.body})
        .end(function(err, res){
          //console.log('err', err);
          //console.log('res', res.body);
          return AppDispatcher.dispatch({
                  actionType: ADD_VIDEO_SUCCESS,
                  gallery: payload.gallery,
                  video: true,
                  items: typeof(res.body.videoGallery) != 'undefined' ? res.body.videoGallery : []
                });
        })
        // return AppDispatcher.dispatch({
        //         actionType: ADD_IMAGE_SUCCESS,
        //         gallery: payload.gallery,
        //         video: true
        //       });
      });
    });
  },
  delete_image( payload ) {
    //console.log('delete_image API', payload);
    var url = BASE_URL + 'delete_image';
    var d = payload.payload;
    //console.log('d', d);

    Request
    .post(url)
    .send({ d })
    .end(function(err, res) {
      //console.log('err', err);
      //console.log('res', res.body);
      return AppDispatcher.dispatch({
              actionType: DELETE_IMAGE_SUCCESS,
              images: res.body.images,
              video: false
            });
    })
  },
  delete_video( payload ) {
    //console.warn('delete_video !!!!!', payload);
    var url = BASE_URL + 'delete_video';

    Request
    .post(url)
    .send({ payload })
    .end(function(err, res) {
      //console.log('err', err);
      //console.log('res', res.body);
    return AppDispatcher.dispatch({
            actionType: DELETE_VIDEO_SUCCESS,
            images: res.body.images,
            video: true,
            active_gallery: payload.gallery
          });
    })
  },
};
