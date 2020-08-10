import React, { useReducer } from 'react';
import Unsplash, { toJson } from 'unsplash-js';
import { UNSPLASH_ACESS_KEY, UNSPLAH_SECRET_KEY, BASE_URL } from '../../config';
import PostContext from './postContext';
import postReducer from './postReducer';
import {
  GET_POSTS,
  GET_UNSPLASH_PHOTOS,
  SET_LOADING,
  DELETE_POST,
  POST_ERROR,
  UPDATE_POST,
  CURRENT_POST,
  CLEAR_CURRENT_POST,
} from '../types';
import axios from '../../services/axios';
import { getToken } from '../../services/cookies';

const unsplash = new Unsplash({
  accessKey: UNSPLASH_ACESS_KEY,
  secret: UNSPLAH_SECRET_KEY,
});

const PostState = (props) => {
  const initialState = {
    posts: [],
    loading: true,
    photos: [],
    currentPost: {},
    isDeleted: false,
    isUpdated: false,
    error: null,
  };

  const [state, dispatch] = useReducer(postReducer, initialState);

  const getPosts = async () => {
    setLoading();
    try {
      const response = await axios.get('/posts/myposts');
      dispatch({ type: GET_POSTS, payload: response.data.data });
    } catch (err) {
      dispatch({ type: POST_ERROR, payload: err.response });
    }
  };

  const createPost = async (body) => {
    setLoading();
    try {
      await fetch(`${BASE_URL}/posts`, {
        method: 'POST',
        body,
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });

      await getPosts();
      await getUnsplashPhoto();
    } catch (err) {
      dispatch({ type: POST_ERROR, payload: err.response });
    }
  };
  const getUnsplashPhoto = async () => {
    setLoading();
    try {
      if (state.photos) {
        await unsplash.search
          .photos('children', 15, 30, {
            orientation: 'portrait',
          })
          .then(toJson)
          .then((json) => {
            dispatch({ type: GET_UNSPLASH_PHOTOS, payload: json });
          });
      }
    } catch (err) {
      dispatch({ type: POST_ERROR, payload: err.response });
    }
  };

  const showCurrentPost = (data) => {
    setLoading();
    try {
      dispatch({ type: CURRENT_POST, payload: data });
    } catch (err) {
      dispatch({ type: POST_ERROR, payload: err.response });
    }
  };

  const updatePost = async (postId, body) => {
    setLoading();
    try {
      const res = await fetch(`${BASE_URL}/posts/${postId}`, {
        method: 'PATCH',
        body,
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });

      if (res) {
        dispatch({ UPDATE_POST, payload: true });
        await getPosts();
        await getUnsplashPhoto();
        clearCurrentPost();
        dispatch({ UPDATE_POST, payload: false });
      }
    } catch (err) {
      dispatch({ type: POST_ERROR, payload: err.response });
    }
  };

  const updateDifficult = async (postId, body) => {
    try {
      const res = await fetch(`${BASE_URL}/posts/update-difficult/${postId}`, {
        method: 'PATCH',
        body: JSON.stringify(body),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getToken()}`,
        },
      });

      if (res) {
        dispatch({ UPDATE_POST, payload: true });
        await getPosts();
        await getUnsplashPhoto();
        dispatch({ UPDATE_POST, payload: false });
      }
    } catch (err) {
      dispatch({ type: POST_ERROR, payload: err.response });
    }
  };
  const clearCurrentPost = () => {
    dispatch({ type: CLEAR_CURRENT_POST });
  };

  const deletePost = async (postId) => {
    setLoading();
    try {
      await axios.delete(`/posts/${postId}`);
      dispatch({ DELETE_POST, payload: true });
      await getPosts();
      dispatch({ DELETE_POST, payload: false });
    } catch (err) {
      dispatch({ type: POST_ERROR, payload: err.response });
    }
  };

  const setLoading = () => dispatch({ type: SET_LOADING });

  return (
    <PostContext.Provider
      value={{
        posts: state.posts,
        photos: state.photos,
        loading: state.loading,
        error: state.error,
        isDeleted: state.isDeleted,
        isUpdated: state.isUpdated,
        currentPost: state.currentPost,
        getUnsplashPhoto,
        getPosts,
        updateDifficult,
        createPost,
        updatePost,
        deletePost,
        showCurrentPost,
        clearCurrentPost,
      }}
    >
      {props.children}
    </PostContext.Provider>
  );
};

export default PostState;
