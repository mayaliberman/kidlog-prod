import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../../assets/Logo_white_splash.svg';
import { content, title, subtitle, button } from './NotFound.module.scss';
//In case the route was not found (status 404) this component will be rendered.
const NotFound = () => {
  return (
    <div className={content}>
      <img alt='company logo' src={logo} />
      <h1 className={title}>Page not Found</h1>
      <p className={subtitle}>
        Sorry! The page you are looking for is not exists.
      </p>

      {/* Refactor - if logged in, return to  post otherwise go home or sign-in */}
      <Link to='/posts' className={button}>
        Return to safe zone
      </Link>
    </div>
  );
};

export default NotFound;
