import Request from 'superagent';
import AppDispatcher from '../dispatcher/AppDispatcher';
import {
  BASE_URL,
  FETCH_PROFILE,
  FETCH_PROFILE_SUCCESS,
  FETCH_PROFILE_ERROR
} from '../constants/AppConstants';

/* HEADERS */
// authorization: Bearer we9Jk7lJaZYK0y21JUMYQxYJiBALifnH0B+QgLAGGUlkmwML0xNpc6YfNvlgUnHN


export default {
  fetch_profile: function( user ) {
    var url = BASE_URL + 'user?username=' + user;
    var profile = {};

     Request.get(url)
    .end(function(err, res) {
      if (err)
      {
        console.log('err', err);
        return;
      }
      console.log('user', res.body[0]);
      profile.user = res.body[0];

      url = BASE_URL + 'galleryImages?owner=' + profile.user.id
      Request.get(url)
      .end(function(err, res) {
        if (err)
        {
          console.log('err', err);
          return;
        }
          console.log('images', res.body[0]);
          profile.images = res.body[0];
          url = BASE_URL + 'videoGallery?owner=' + profile.user.id
          Request.get(url)
          .end(function(err, res) {
            if (err)
            {
              console.log('err', err);
              return;
            }
              console.log('videos', res.body[0]);
              profile.videos = res.body[0];
              AppDispatcher.dispatch({
                actionType: FETCH_PROFILE_SUCCESS,
                profile: profile
              });
          });
      });
    });

  }
};
