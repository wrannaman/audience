import pkg from '../../package';

export const DEBUG                          = (process.env.NODE_ENV !== 'production');
export const APP_TITLE                      = pkg.name;

/* Base URL */
export const BASE_URL                       = 'http://localhost:1337/';

/* Active Cams */
export const GET_ACTIVE_CAMS                = 'GET_ACTIVE_CAMS';
export const FETCH_ACTIVE_CAMS              = 'FETCH_ACTIVE_CAMS';
export const FETCH_ACTIVE_CAMS_SUCCESS      = 'FETCH_ACTIVE_CAMS_SUCCESS';
export const FETCH_ACTIVE_CAMS_ERROR        = 'FETCH_ACTIVE_CAMS_ERROR';

/* Messages */
export const GET_MESSAGES                   = 'GET_MESSAGES';
export const SEND_MESSAGE                   = 'SEND_MESSAGE';
export const FETCH_MESSAGES                 = 'FETCH_MESSAGES';
export const FETCH_MESSAGES_SUCCESS         = 'FETCH_MESSAGES_SUCCESS';
export const FETCH_MESSAGES_ERROR           = 'FETCH_MESSAGES_ERROR';

/* Users */
export const REGISTER_USER                  = 'REGISTER_USER';
export const REGISTER_USER_SUCCESS          = 'REGISTER_USER_SUCCESS';
export const REGISTER_USER_ERROR            = 'REGISTER_USER_ERROR';
export const LOGIN_USER                     = 'LOGIN_USER';
export const LOGIN_USER_SUCCESS             = 'LOGIN_USER_SUCCESS';
export const LOGIN_USER_ERROR               = 'LOGIN_USER_ERROR';
export const LOGOUT_USER                    = 'LOGOUT_USER';
export const LOGOUT_USER_SUCCESS            = 'LOGOUT_USER_SUCCESS';
export const LOGOUT_USER_ERROR              = 'LOGOUT_USER_ERROR';
export const GET_CURRENT_USER               = 'GET_CURRENT_USER';
export const USER_CHANGE                    = 'USER_CHANGE';
export const RESET_PASSWORD                 = 'RESET_PASSWORD';
export const TRIGGER_RESET_PASSWORD_EMAIL   = 'TRIGGER_RESET_PASSWORD_EMAIL';
export const RESET_PASSWORD_EMAIL_ERROR     = 'RESET_PASSWORD_EMAIL_ERROR';
export const RESET_PASSWORD_EMAIL_SUCCESS   = 'RESET_PASSWORD_EMAIL_SUCCESS';
export const RESET_PASSWORD_CHANGE          = 'RESET_PASSWORD_CHANGE';
export const RESET_PASSWORD_CHANGE_SUCCESS  = 'RESET_PASSWORD_CHANGE_SUCCESS';
export const RESET_PASSWORD_CHANGE_ERROR    = 'RESET_PASSWORD_CHANGE_ERROR';
export const TRIGGER_LOGIN_ALERT            = 'TRIGGER_LOGIN_ALERT';
export const UPDATE_USER                    = 'UPDATE_USER';
export const UPDATE_USER_SUCCESS            = 'UPDATE_USER_SUCCESS';
export const UPDATE_USER_ERROR              = 'UPDATE_USER_ERROR';

/* Gallery */
export const CREATE_GALLERY                 = 'CREATE_GALLERY';
export const CREATE_GALLERY_SUCCESS         = 'CREATE_GALLERY_SUCCESS';
export const CREATE_GALLERY_ERROR           = 'CREATE_GALLERY_ERROR';
export const UPDATE_GALLERY                 = 'UPDATE_GALLERY';
export const UPDATE_GALLERY_SUCCESS         = 'UPDATE_GALLERY_SUCCESS';
export const UPDATE_GALLERY_ERROR           = 'GALLERY_UPDATE_ERROR';
export const FETCH_GALLERY                  = 'FETCH_GALLERY';
export const FETCH_GALLERY_SUCCESS          = 'FETCH_GALLERY_SUCCESS';
export const FETCH_GALLERY_ERROR            = 'FETCH_GALLERY_ERROR';
export const DELETE_GALLERY                 = 'DELETE_GALLERY';
export const DELETE_GALLERY_SUCCESS         = 'DELETE_GALLERY_SUCCESS';
export const DELETE_GALLERY_ERROR           = 'DELETE_GALLERY_ERROR';
export const GALLERY_CHANGE                 = 'GALLERY_CHANGE';

/* Images */
export const ADD_IMAGE                      = 'ADD_IMAGE';
export const ADD_IMAGE_SUCCESS              = 'ADD_IMAGE_SUCCESS';
export const ADD_IMAGE_ERROR                = 'ADD_IMAGE_ERROR';
export const DELETE_IMAGE                   = 'DELETE_IMAGE';
export const DELETE_IMAGE_SUCCESS           = 'DELETE_IMAGE_SUCCESS';
export const DELETE_IMAGE_ERROR             = 'DELETE_IMAGE_ERROR';
export const SHOW_IMAGES                    = 'SHOW_IMAGES';
export const SHOW_IMAGES_CHANGE             = 'SHOW_IMAGES_CHANGE';
export const IMAGES_CHANGE                  = 'IMAGES_CHANGE';
export const FETCH_IMAGES                   = 'FETCH_IMAGES';
export const FETCH_IMAGES_SUCCESS           = 'FETCH_IMAGES_SUCCESS';
export const FETCH_IMAGES_ERROR             = 'FETCH_IMAGES_ERROR';
export const ADD_VIDEO                      = 'ADD_VIDEO';
export const ADD_VIDEO_SUCCESS              = 'ADD_VIDEO_SUCCESS';
export const ADD_VIDEO_ERROR                = 'ADD_VIDEO_ERROR';
export const DELETE_VIDEO                   = 'DELETE_VIDEO';
export const DELETE_VIDEO_SUCCESS           = 'DELETE_VIDEO_SUCCESS';
export const DELETE_VIDEO_ERROR             = 'DELETE_VIDEO_ERROR';

/* Profile */
export const PROFILE_CHANGE                 = 'PROFILE_CHANGE';
export const FETCH_PROFILE                  = 'FETCH_PROFILE';
export const FETCH_PROFILE_SUCCESS          = 'FETCH_PROFILE_SUCCESS';
export const FETCH_PROFILE_ERROR            = 'FETCH_PROFILE_ERROR';

/* Payments */
export const PAYMENT_CHANGE                 = 'PAYMENT_CHANGE';
export const CREATE_PAYMENT                 = 'CREATE_PAYMENT';
export const CREATE_PAYMENT_SUCCESS         = 'CREATE_PAYMENT_SUCCESS';
export const CREATE_PAYMENT_ERROR           = 'CREATE_PAYMENT_ERROR';

/* Items */
export const ITEMS_GET_SUCCESS              = 'ITEMS_GET_SUCCESS';
export const ITEMS_GET_ERROR                = 'ITEMS_GET_ERROR';
export const ITEMS_UPDATED                  = 'ITEMS_UPDATED';
