import React from 'react';
import { content, title, button, signIn } from './Home.module.scss';
import logo from '../../assets/Logo_white_splash.svg';
import { Link } from 'react-router-dom';
export const Home = () => {
  return (
    <div className={content}>
      <img alt='company logo' src={logo} />
      <h1 className={title}>Every kid can become multi-talent</h1>
      <h3>Track your kid's progress and share your experiences</h3>
      <Link to='/sign-up' className={button}>
        Sign Up
      </Link>
      <div className={signIn}>
        <p>
          Already have an account? <Link to='/sign-in'>Sign in</Link>
        </p>
      </div>
    </div>
  );
};

export default Home;
