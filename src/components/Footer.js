import React from 'react';
import {Helmet} from 'react-helmet';

const Footer = () => {
  return (
    <footer className="text-center text-white align-items-center mt-4" style={{ backgroundColor: '#f1f1f1', height: '148px', width: '100%' }}>
      <Helmet>
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" />
      </Helmet>
      {/* Section: Social media */}
      <section className="d-flex justify-content-center pt-3">
        {/* Facebook */}
        <a
          className="text-dark m-3"
          href="#!"
          role="button"
          data-mdb-ripple-color="dark"
        ><i className="fa fa-facebook-f" style={{ fontSize: '25px', marginRight: '20px' }}></i></a>

        {/* Twitter */}
        <a
          className="text-dark m-3"
          href="#!"
          role="button"
          data-mdb-ripple-color="dark"
        ><i className="fa fa-twitter" style={{ fontSize: '25px', marginRight: '20px' }}></i></a>

        {/* Google */}
        <a
          className="text-dark m-3"
          href="#!"
          role="button"
          data-mdb-ripple-color="dark"
        ><i className="fa fa-google" style={{ fontSize: '25px', marginRight: '20px' }}></i></a>

        {/* Instagram */}
        <a
          className="text-dark m-3"
          href="#!"
          role="button"
          data-mdb-ripple-color="dark"
        ><i className="fa fa-instagram" style={{ fontSize: '25px', marginRight: '20px' }}></i></a>

        {/* Linkedin */}
        <a
          className="text-dark m-3"
          href="#!"
          role="button"
          data-mdb-ripple-color="dark"
        ><i className="fa fa-linkedin" style={{ fontSize: '25px', marginRight: '20px' }}></i></a>

        {/* Github */}
        <a
          className="text-dark m-3"
          href="#!"
          role="button"
          data-mdb-ripple-color="dark"
        ><i className="fa fa-github" style={{ fontSize: '25px', marginRight: '20px' }}></i></a>
      </section>

      {/* Copyright */}
      <div className="text-dark p-4" style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)', width: '100%' }}>
        © 2024 Copyright:
        <a className="text-dark" href="https://mdbootstrap.com/">KrushiMitr.com</a>
      </div>
      {/* Copyright */}
    </footer>
  );
};

export default Footer;
