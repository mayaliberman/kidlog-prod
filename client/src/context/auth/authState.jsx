import React, { useReducer } from 'react';
import axios from 'axios';
import authReducer from './authReducer';
import AuthContext from './authContext';
import cookies from 'react-cookies';
import axiosService from '../../services/axios';
import {
  LOGIN_SUCCESS,
  USER_LOADED,
  LOGOUT,
  REGISTER_SUCCESS,
  LOGIN_FAIL,
  REGISTER_FAIL,
  CLEAR_ERRORS,
  UPDATE_PASSWORD,
  SET_UPDATING,
  UPDATE_PASSWORD_FAIL,
  FORGOT_PASSWORD_FAIL,
  RESET_PASSWORD_FAIL,
} from '../types';
import { withRouter } from 'react-router-dom';
import { setUser } from '../../services/cookies';
const AuthState = (props) => {
  const initialState = {
    isLogged: false,
    token: {},
    user: null,
    error: null,
    updating: false,
  };
  const [state, dispatch] = useReducer(authReducer, initialState);

  const login = async (email, password) => {
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/api/users/signin`,
        {
          email,
          password,
        }
      );
      if (res) {
        const user = JSON.parse(atob(res.data.token.split('.')[1]));
        const id = user.user.id;
        dispatch({
          type: LOGIN_SUCCESS,
          payload: res.data.token,
        });
        dispatch({
          type: USER_LOADED,
          payload: {
            user: id,
          },
        });
        cookies.save('auth', res.data.token, { path: '/' });
        setUser(res.data.data.user);

        props.history.push('/posts');
      }
    } catch (err) {
      console.log('error at catach', err);
      dispatch({ type: LOGIN_FAIL, payload: err });
    }
  };

  const signup = async (
    firstName,
    lastName,
    email,
    password,
    passwordConfirm
  ) => {
    dispatch({ type: LOGOUT });
    cookies.remove('auth', { path: '/' });
    cookies.remove('user', { path: '/' });
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/api/users/signup`,
        {
          firstName,
          lastName,
          email,
          password,
          passwordConfirm,
        }
      );
      if (res) {
        const user = JSON.parse(atob(res.data.token.split('.')[1]));

        const id = user.user.id;
        dispatch({
          type: REGISTER_SUCCESS,
          payload: res.data.token,
        });
        dispatch({
          type: USER_LOADED,
          payload: { user: id },
        });

        cookies.save('auth', res.data.token, { path: '/' });
        setUser(res.data.data.user);
        props.history.push('/add-kid');
      }
    } catch (err) {
      dispatch({ type: REGISTER_FAIL, payload: err.response });
    }
  };

  const updatePassword = async (passwordCurrent, password, passwordConfirm) => {
    setUpdating();
    try {
      const res = await axiosService.patch(
        `${process.env.REACT_APP_BASE_URL}/api/users/updateMyPassword`,
        { passwordCurrent, password, passwordConfirm }
      );

      if (res) {
        const user = JSON.parse(atob(res.data.token.split('.')[1]));
        const id = user.user.id;
        dispatch({
          type: UPDATE_PASSWORD,
          payload: res.data.token,
        });
        dispatch({
          type: USER_LOADED,
          payload: {
            user: id,
          },
        });
        cookies.save('auth', res.data.token, { path: '/' });
        setUser(res.data.data.user);
        dispatch({ SET_UPDATING, payload: false });
        props.history.push('/my-account');
      }
    } catch (err) {
      dispatch({ type: UPDATE_PASSWORD_FAIL, payload: err.response });
    }
  };

  const forgotPassword = async (email) => {
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/api/users/forgotPassword`,
        {
          email,
        }
      );
      if (res.data.status === 'success') {
        return true;
      }
    } catch (err) {
      dispatch({ type: FORGOT_PASSWORD_FAIL, payload: err.response });
      return false;
    }
  };

  const resetPassword = async (token, password, passwordConfirm) => {
    try {
      const res = await axios.patch(
        `${process.env.REACT_APP_BASE_URL}/api/users/resetPassword/${token}`,
        { password, passwordConfirm }
      );
      if (res) {
        const user = JSON.parse(atob(res.data.token.split('.')[1]));
        const id = user.user.id;
        dispatch({
          type: LOGIN_SUCCESS,
          payload: res.data.token,
        });
        dispatch({
          type: USER_LOADED,
          payload: {
            user: id,
          },
        });
        cookies.save('auth', res.data.token, { path: '/' });
        setUser(res.data.data.user);

        props.history.push('/posts');
      }
    } catch (err) {
      dispatch({ type: RESET_PASSWORD_FAIL, payload: err.response });
    }
  };

  const logout = () => {
    dispatch({ type: LOGOUT });
    cookies.remove('auth', { path: '/' });
    cookies.remove('user', { path: '/' });

    props.history.push('/');
  };

  const setUpdating = () => dispatch({ type: SET_UPDATING });

  const clearErrors = () => dispatch({ type: CLEAR_ERRORS });
  return (
    <AuthContext.Provider
      value={{
        isLogged: state.isLogged,
        token: state.token,
        user: state.user,
        error: state.error,
        updating: state.updating,
        login,
        logout,
        signup,
        updatePassword,
        forgotPassword,
        resetPassword,
        clearErrors,
        setUpdating,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default withRouter(AuthState);
