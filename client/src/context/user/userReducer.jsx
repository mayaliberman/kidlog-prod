import { GET_CHILD, SET_LOADING, UPDATE_USER } from '../types';

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
    default:
      return state;
  }
};
