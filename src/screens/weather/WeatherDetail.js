import React, { useState } from "react";
import Weather from "./currentLocation";
import "../../App.css"
import Navbar from "../../components/Navbar";
import { Helmet } from "react-helmet";

function WeatherDetail() {
  return (
    <React.Fragment>
      <Navbar />
      <Helmet>
        <link rel="stylesheet" href="https://unpkg.com/bootstrap@5.3.2/dist/css/bootstrap.min.css" />
      </Helmet>
      <div style={{ paddingTop: '80px' }}>
        <div className="container mt-3 mb-5">
          <Weather />
        </div>
      </div>
    </React.Fragment>
  );
}

export default WeatherDetail;