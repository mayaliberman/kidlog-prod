import {
  GET_CHILD,
  SET_LOADING,
  UPDATE_USER,
  CLEAR_CHILD,
  USER_ERROR,
} from '../types';

export default (state, action) => {
  switch (action.type) {
    case UPDATE_USER:
      return {
        ...state,
        isUpdated: action.payload,
        loading: false,
      };

    case GET_CHILD:
      return {
        ...state,
        child: action.payload,
        loading: false,
      };
    case SET_LOADING:
      return {
        ...state,
        loading: true,
      };

    case CLEAR_CHILD:
      return {
        ...state,
        child: null,
      };
    default:
      return state;
  }
};
