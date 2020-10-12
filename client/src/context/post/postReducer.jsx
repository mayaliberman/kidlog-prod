import {
  GET_POSTS,
  GET_FILTERED_POSTS,
  DELETE_POST,
  UPDATE_POST,
  SET_LOADING,
  GET_UNSPLASH_PHOTOS,
  GET_USER_DATA,
  POST_ERROR,
  CURRENT_POST,
  CLEAR_CURRENT_POST,
  REMOVE_LOADING,
} from '../types';

export default (state, action) => {
  switch (action.type) {
    case GET_POSTS:
      return {
        ...state,
        posts: action.payload,
        loading: false,
      };
    case GET_FILTERED_POSTS:
      return {
        ...state,
        filteredPosts: action.payload,
        loading: false,
      };
    case GET_UNSPLASH_PHOTOS:
      return {
        ...state,
        photos: action.payload,
        loading: false,
      };

    case GET_USER_DATA:
      return {
        ...state,
        user: action.payload,
        loading: false,
      };

    case CURRENT_POST:
      return {
        ...state,
        currentPost: action.payload,
        loading: false,
      };

    case UPDATE_POST:
      return {
        ...state,
        isUpdated: action.payload,
        loading: false,
      };
    case DELETE_POST:
      return {
        ...state,
        isDeleted: action.payload,
        loading: false,
      };
    case CLEAR_CURRENT_POST:
      return {
        ...state,
        currentPost: {},
        loading: false,
      };
    case SET_LOADING:
      return {
        ...state,
        loading: true,
      };
    case REMOVE_LOADING:
      return {
        ...state,
        loading: false,
      };
    case POST_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};
