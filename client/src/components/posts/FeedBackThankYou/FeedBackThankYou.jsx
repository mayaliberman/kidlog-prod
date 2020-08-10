import React from 'react';
import {
  content,
  header,
  text,
  message,
  subtext,
  modal,
} from './FeedBackThankYou.module.scss';
import exitIcon from '../../../assets/Exit_icon.svg';
import thankYouIcon from '../../../assets/Thanks_icon.svg';
const FeedBackThankYou = (props) => {
  return (
    <div className={modal}>
      <div className={content}>
        <div className={header}>
          <h6>Activity feedback</h6>
          <img src={exitIcon} alt='exit-icon' onClick={props.togglePop} />
        </div>
        <div className={text}>
          <img src={thankYouIcon} alt='thank-you-icon' />
          <h1 className={message}>We got it!</h1>
          <p className={subtext}>Thank you for your feedback</p>
        </div>
      </div>
    </div>
  );
};

export default FeedBackThankYou;
