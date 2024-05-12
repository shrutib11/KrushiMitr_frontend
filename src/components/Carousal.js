import React from 'react';
import '../assets/css/carousel.css'

export default function Carousal({ slides }) {
    return (
        <div>
            <div>
                <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel">
                    <div className="carousel-inner">
                        {slides.map((slide, index) => (
                            <div key={index} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
                                <img src={slide.image} className="d-block w-100" style={{ filter: "brightness(35%)", maxHeight: "600px" }} alt={`Slide ${index}`} />
                                <div className="carousel-caption d-md-block">
                                    <h5 className="title">{slide.title}</h5>
                                    <p className="subtitle">{slide.subtitle}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>
            </div>
        </div>
    );
}
