import React, { Fragment } from 'react';
import loading from './loading.gif';

// loading spinner component
const Spinner = () => {
  return (
    <Fragment>
      <img
        src={loading}
        style={{
          width: '100px',
          margin: '100px auto',
          display: 'block',
        }}
        alt='Loading...'
      />
    </Fragment>
  );
};

export default Spinner;
