import React, { useState, useContext, useEffect } from 'react';
import {
  modal,
  content,
  header,
  text,
  button,
  message,
  subtext,
  feedbackQuestion,
  iconImage,
  radios,
  emojiBox,
  checked,
} from './PostFeedback.module.scss';

import exitIcon from '../../../assets/Exit_icon.svg';
import challengingIcon from '../../../assets/Challenging_icon.svg';
import difficultIcon from '../../../assets/Difficult_icon.svg';
import easyIcon from '../../../assets/Easy_icon.svg';
import justRightIcon from '../../../assets/Just_right_icon.svg';
import tooHardIcon from '../../../assets/Too_hard_icon.svg';
import PostContext from '../../../context/post/postContext';
const PostFeedback = (props) => {
  const [difficultyLevel, setDifficultLevel] = useState(0);
  const [levelValue, setLevelValue] = useState(0);
  useEffect(() => {}, [difficultyLevel]);
  const postContext = useContext(PostContext);
  const { posts, updateDifficult } = postContext;

  const formSubmit = async (event) => {
    event.preventDefault();
    const requestBody = {
      difficultyLevel: parseInt(difficultyLevel),
    };

    if (posts[0]._id !== undefined) {
      await updateDifficult(posts[0]._id, requestBody);
      props.submit();
    }
  };
  const handleChange = (e) => {
    setDifficultLevel(e.target.value);
    setLevelValue(e.target.value);
  };
  return (
    <div className={modal}>
      <div className={content}>
        <div className={header}>
          <h6>Activity feedback</h6>
          <img src={exitIcon} alt='exit-icon' onClick={props.togglePop} />
        </div>
        <div className={text}>
          <h3 className={message}>Success! Your activity was uploaded</h3>
          <p className={subtext}>
            By providing us feedback on this activity, you're helping us improve
            our lesson plans
          </p>
          <h6 className={feedbackQuestion}>How difficult was the activity?</h6>
          <form onSubmit={formSubmit}>
            <div className={radios}>
              <label>
                <input
                  type='radio'
                  name='difficultyLevel'
                  value='1'
                  checked={difficultyLevel === '1'}
                  onChange={handleChange}
                  onClick={handleChange}
                />
                <div className={emojiBox}>
                  <img
                    src={easyIcon}
                    alt='easy-icon'
                    className={levelValue !== '1' ? iconImage : checked}
                  />
                  <span>Easy</span>
                </div>
              </label>

              <label>
                <input
                  type='radio'
                  value='2'
                  name='difficultyLevel'
                  checked={difficultyLevel === '2'}
                  onChange={handleChange}
                  onClick={handleChange}
                />
                <div className={emojiBox}>
                  <img
                    src={justRightIcon}
                    alt='easy-icon'
                    className={difficultyLevel !== '2' ? iconImage : checked}
                  />
                  <span>Just Right</span>
                </div>
              </label>

              <label>
                <input
                  type='radio'
                  name='difficultyLevel'
                  value='3'
                  checked={difficultyLevel === '3'}
                  onChange={handleChange}
                />
                <div className={emojiBox}>
                  <img
                    src={difficultIcon}
                    alt='easy-icon'
                    className={difficultyLevel !== '3' ? iconImage : checked}
                  />
                  <span>Difficult</span>
                </div>
              </label>

              <label>
                <input
                  type='radio'
                  name='difficultyLevel'
                  value='4'
                  checked={difficultyLevel === '4'}
                  onChange={handleChange}
                />
                <div className={emojiBox}>
                  <img
                    src={challengingIcon}
                    alt='easy-icon'
                    className={levelValue !== '4' ? iconImage : checked}
                  />
                  <span>Challenging</span>
                </div>
              </label>

              <label>
                <input
                  type='radio'
                  name='difficultyLevel'
                  value='5'
                  checked={difficultyLevel === '5'}
                  onChange={handleChange}
                />
                <div className={emojiBox}>
                  <img
                    src={tooHardIcon}
                    alt='easy-icon'
                    className={levelValue !== '5' ? iconImage : checked}
                  />
                  <span>Too hard!</span>
                </div>
              </label>
            </div>
            <button type='submit' className={button}>
              Send Feedback
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PostFeedback;
