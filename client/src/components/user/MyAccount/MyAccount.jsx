import React, { useState, useContext, useEffect } from 'react';
import {
  content,
  header,
  text,
  avatar,
  button,
  kidContainer,
  passwordButton,
  exitButton,
} from './MyAccount.module.scss';
import { Link } from 'react-router-dom';

import KidContainer from '../kid/KidContainer/KidContainer';
import AccountForm from '../AccountForm/AccountForm';
import KidForm from '../kid/KidForm/KidForm';
import PlusIcon from '../../../assets/Plus_icon.svg';
import logoutIcon from '../../../assets/logout.svg';
import { getUser } from '../../../services/cookies';
import UserContext from '../../../context/user/userContext';
import AuthContext from '../../../context/auth/authContext';
const MyAccount = () => {
  const userContext = useContext(UserContext);
  const authContext = useContext(AuthContext);
  const { logout } = authContext;
  const { child, clearChild } = userContext;

  let user = getUser();
  useEffect(() => {
    user = getUser();
  }, [child, user]);
  const [showForm, toggleForm] = useState(false);
  const clickHandler = () => {
    toggleForm(!showForm);
  };

  return (
    <div className={content}>
      <div className={text}>
        <div className={avatar}></div>
        <div>
          <AccountForm />
          <Link to='update-password'>
            <button className={passwordButton}>Update My Password</button>
          </Link>
        </div>
      </div>
      <div className={header} style={{ borderRadius: ' 0px', m: '20px' }}>
        <h6>My Kids</h6>
      </div>
      <div className={kidContainer}>
        <KidContainer />
        {showForm && <KidForm cancel={clickHandler} />}

        {!showForm && (
          <button className={button} onClick={clickHandler}>
            <img src={PlusIcon} alt='add-child-icon' />
            <span>Add Kid</span>
          </button>
        )}
      </div>
      <button className={exitButton} onClick={logout}>
        <img src={logoutIcon} />
        <span>Logout</span>
      </button>
    </div>
  );
};

export default MyAccount;
