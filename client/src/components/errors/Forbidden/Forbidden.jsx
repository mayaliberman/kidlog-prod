import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../../assets/Logo_white_splash.svg';
import { content, title, subtitle, button } from './Forbidden.module.scss';
//In case the route was authorized (status 403) this component will be rendered.
const Forbidden = () => {
  return (
    <div className={content}>
      <img alt='company logo' src={logo} />
      <h1 className={title}>Forbidden</h1>
      <p className={subtitle}>
        Sorry! You are not authorized to visit this page.
      </p>

      {/* Refactor - if logged in, return to  post otherwise go home or sign-in */}
      <Link to='/posts' className={button}>
        Return to safe zone
      </Link>
    </div>
  );
};

export default Forbidden;
