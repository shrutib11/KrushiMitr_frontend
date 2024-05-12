import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from './Navbar';
import '../assets/css/cropinfo.css';
import jsonData from '../assets/district_names.json';
import { Helmet } from 'react-helmet';

function CropInfo() {
  const [data, setData] = useState(null);
  const { stateName } = useParams();
  const [cityData, setCityData] = useState();
  const [city, setCity] = useState('');
  const [districts, setDistricts] = useState([]);

  const handleCitySelect = async () => {
    if (city) {
      // const apiKey = process.env.API_KEY;
      const apiKey = '579b464db66ec23bdd0000010d1f7b00c91e424e7924cf7159fd5e61'
      const format = 'json';
      const cityName = encodeURIComponent(city.toUpperCase());
      console.log(cityName)

      try {
        const response = await fetch(`https://api.data.gov.in/resource/35be999b-0208-4354-b557-f6ca9a5355de?api-key=${apiKey}&format=${format}&filters[state_name]=${stateName}&filters[district_name]=${cityName}`);
        const responseData = await response.json();
        setData(responseData);
        console.log(responseData.records);

      } catch (error) {
        console.error('Error:', error);
      }
    }
  };

  useEffect(() => {
    // Get districts from imported JSON data
    const state = jsonData.states.find(state => state.state === stateName);
    if (state) {
      setDistricts(state.districts);
    }
  }, [stateName]);

  useEffect(() => {
    cityData && setCity(cityData[0]);
  }, [cityData]);

  const cropNames = [
    "wheat",
    "rice",
    "corn",
    "barley",
    "Oil palm",
    "potato",
    "tomato",
    "Sugar beet",
    "Void Seeds",
    "Maize"
  ];

  return (
    <div>
      <Navbar />
      <Helmet>
        <link rel="stylesheet" href="https://unpkg.com/bootstrap@5.3.2/dist/css/bootstrap.min.css" />
        <style>
          {`
            @media (max-width: 767px) {
              #city-dropdown {
                width: 70%;
              }
            }
          `}
        </style>
      </Helmet>
      <div style={{ paddingTop: '80px' }}>
        <section className="light">
          <div className=" py-2">
            <div className="h1 text-center text-dark" id="pageHeaderTitle">{stateName}</div>

            <div style={{ display: 'flex', margin: '3px' }}>
              <select id="city-dropdown" className='form-select' value={city} onChange={(e) => setCity(e.target.value)}>
                {districts.map((district, index) => (
                  <option key={index} value={district}>
                    {district}
                  </option>
                ))}
              </select>
              &nbsp;
              <a className='text-secondary m-2' style={{ fontSize: '1.25rem', fontWeight: 'bold' }} onClick={handleCitySelect}>Find</a>
            </div>
            <br />
            {data && data.records && data.records.length > 0 ? (data.records.map((record, index) => (
              <article className={`postcard light ${index % 4 === 0 ? 'blue' : index % 4 === 1 ? 'green' : index % 4 === 2 ? 'red' : 'yellow'}`} key={index}
                style={{ margin: 'auto', marginBottom: '2rem' }}
              >
                <a className="postcard__img_link" href="/">
                  <img className="postcard__img" src={`https://source.unsplash.com/random/900×700/?${cropNames[index % cropNames.length]}`} alt="Image Title" style={{ maxHeight: '280px' }} />
                </a>
                <div className="postcard__text t-dark">
                  <h1 className={`postcard__title ${index % 4 === 0 ? 'blue' : index % 4 === 1 ? 'green' : index % 4 === 2 ? 'red' : 'yellow'}`}>
                    <a href="#">{record.district_name}</a>
                  </h1>
                  <div className="postcard__subtitle small">
                    <p>Crop Year: {record.crop_year}</p>
                    <p>Season: {record.season}</p>
                    <p>Crop: {record.crop}</p>
                    <p>Area: {record.area_}</p>
                    <p>Production: {record.production_}</p>
                  </div>
                  <div className="postcard__bar"></div>
                </div>
              </article>
            ))) : (
              <p style={{ fontSize: "1.5rem", textAlign: "center" }}>No Record Found</p>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}

export default CropInfo;
