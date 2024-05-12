import React from 'react';
import { Link } from 'react-router-dom';
import "../assets/css/notfound.css";
import PreventBackComponent from './PreventBackComponent';

const NotFound = () => {
  return (
    <>
    <PreventBackComponent />
    <div className="not-found-container">
      <h1 className='heading'>404 - Not Found</h1>
      <p>The page you are looking for does not exist.</p>
      <Link to="/">
        <button className="back-to-home-button mb-5">Go Back to Home</button>
      </Link>
    </div>
    </>
  );
};

export default NotFound;
