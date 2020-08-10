import React, { useState, useContext, useEffect } from 'react';
import {
  content,
  logoIcon,
  subtitle,
  container,
  button,
  addButton,
  actionButtons,
} from './AddKid.module.scss';
import { Link } from 'react-router-dom';
import KidForm from '../KidForm/KidForm';
import KidContainer from '../KidContainer/KidContainer';
import logo from '../../../../assets/logo-purple.svg';
import PlusIcon from '../../../../assets/Plus_icon.svg';
import UserContext from '../../../../context/user/userContext';
import { getUser } from '../../../../services/cookies';
const AddKid = () => {
  const userContext = useContext(UserContext);
  const { isUpdated, child } = userContext;
  const [showKidForm, setshowKidFormd] = useState(true);
  let user = getUser();
  useEffect(() => {
    user = getUser();
  }, [isUpdated, child, user]);

  const toggleKidForm = () => {
    setshowKidFormd(!showKidForm);
  };
  return (
    <div className={content}>
      <img alt='company logo' src={logo} className={logoIcon} />
      <h4 className={subtitle}>Finel step - fill you kid's details</h4>
      <div className={container}>
        {user.children && <KidContainer />}

        {!showKidForm && (
          <div className={actionButtons}>
            <button className={addButton} onClick={toggleKidForm}>
              <img src={PlusIcon} />
              <span>Add Kid</span>
            </button>
            <Link to='/posts'>
              <button className={button}>Let's Go!</button>
            </Link>
          </div>
        )}
        {showKidForm && <KidForm cancel={toggleKidForm} />}
      </div>
    </div>
  );
};

export default AddKid;
