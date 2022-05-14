import React from 'react';
import { Link } from 'react-router-dom';
import { MdHomeFilled } from 'react-icons/md';

// unknown route component
const NotFound = () => {
  return (
    <div className='center'>
      <i class='fas fa-bug x-large'></i>
      <h1 className='x-large'>#404 Error</h1>
      <p className='mt-05'>
        Sorry, the page you thought exists...doesn't!
        <br />
        Heading home would be best for you.
      </p>
      <Link to='/' className='btn btn-primary mt'>
        <MdHomeFilled /> Go Back Home
      </Link>
    </div>
  );
};

export default NotFound;
