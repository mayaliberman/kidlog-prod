import React, { Fragment } from 'react';
import colorfulSpinner from '../../assets/810.gif';
const Spinner = () => {
  return (
    <Fragment>
      <img
        src={colorfulSpinner}
        alt='loading ...'
        style={{
          width: '80px',
          margin: 'auto',
          display: 'block',
          padding: '100px',
        }}
      />
    </Fragment>
  );
};

export default Spinner;
