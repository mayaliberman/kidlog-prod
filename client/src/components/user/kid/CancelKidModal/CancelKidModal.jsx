import React from 'react';
import {
  modal,
  content,
  title,
  button,
  subtitle,
  buttonArea,
} from './CancelKidModal.module.scss';
const CancelKidModal = (props) => {
  return (
    <div className={modal}>
      <div className={content}>
        <h2 className={title}> Are you sure you want to delete this profile</h2>
        <h3 className={subtitle}>
          This is permanently delete your kid's account
        </h3>
        <div className={buttonArea}>
          <button className={button} onClick={props.cancel}>
            Cancel
          </button>

          <button className={button} onClick={props.delete}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default CancelKidModal;
