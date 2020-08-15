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
  accountForm,
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
  const { child } = userContext;

  let user = getUser();
  useEffect(() => {
    user = getUser();
  }, [child, user]);
  const [showEditChild, setShowEditChild] = useState(false);
  const toggleEditChild = () => {
    setShowEditChild(!showEditChild);
  };

  return (
    <div className={content}>
      <div className={text}>
        <div className={avatar}></div>
        <div className={accountForm}>
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
        {showEditChild && (
          <KidForm cancel={toggleEditChild} childValue={child[0]} />
        )}

        {!showEditChild && (
          <button className={button} onClick={toggleEditChild}>
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
