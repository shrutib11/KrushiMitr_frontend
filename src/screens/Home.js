import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Carousal from '../components/Carousal';
import { Helmet } from 'react-helmet'
import Footer from '../components/Footer';
import Map from '../components/Map';
import { image1, image2, image3 } from '../assets/images/index'

export default function Home() {
    // const [isLogin, setIsLogin] = useState(false);
    const slides = [
        {
            "image": image1,
            "title": "\"To forget how to dig the earth and to tend the soil is to forget ourselves\"",
            "subtitle": "- Mahatma Gandhi",
        },
        {
            "image": image2,
            "title": "\"The ultimate goal of farming is not the growing of crops, but the cultivation and perfection of human beings\"",
            "subtitle": "- Masanobu Fukuoka",
        },
        {
            "image": image3,
            "title": "\"If agriculture goes wrong, nothing else will have a chance to go right in the country.\"",
            "subtitle": "- M. S. Swaminathan",
        }
    ]

    return (
        <>
            <Navbar />
            <Helmet>
                <link rel="stylesheet" href="https://unpkg.com/bootstrap@5.3.2/dist/css/bootstrap.min.css" />
                <link rel="stylesheet" href="https://unpkg.com/bs-brain@2.0.3/components/services/service-1/assets/css/service-1.css" />
            </Helmet>
            <div style={{ paddingTop: '80px' }}>
                <Carousal slides={slides} />
                <section className="py-5 py-xl-6" style={{ overflowX: 'hidden' }}>
                    <div className="row justify-content-md-center">
                        <div className="col-12 col-md-10 col-lg-8 col-xl-7 col-xxl-6">
                            <h2 className="mb-4 display-5 text-center">Services</h2>
                            <p className="text-secondary mb-5 text-center">Sign up or log in to unlock the full potential of our platform. From educational resources to community forums, there's always something new to discover at our website.</p>
                            <hr className="w-50 mx-auto mb-5 mb-xl-9 border-dark-subtle" />
                        </div>
                    </div>

                    <div className="ml-5 mr-5">
                        <div className="row mb-4">
                            <div className="col-12 col-sm-6 col-lg-4">
                                <div className="text-center px-xl-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="currentColor" className="bi bi-1-circle-fill text-primary mb-4" viewBox="0 0 16 16">
                                        <path fillRule="evenodd" d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0ZM9.283 4.002V12H7.971V5.338h-.065L6.072 6.656V5.385l1.899-1.383h1.312Z" />
                                    </svg>
                                    <h5 className="m-2">Empowering Agriculture and Community</h5>
                                    <p className="m-0 text-secondary">At KrushiMitr, we are dedicated to providing a comprehensive platform for farmers, agricultural enthusiasts, and community members to connect, learn, and grow together. Whether you're a seasoned farmer or expert looking to share your expertise or a newcomer seeking guidance, our platform offers a wide range of features to cater to your needs.</p>
                                </div>
                            </div>
                            <div className="col-12 col-sm-6 col-lg-4">
                                <div className="text-center px-xl-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="currentColor" className="bi bi-2-circle-fill text-primary mb-4" viewBox="0 0 16 16">
                                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0ZM6.646 6.24c0-.691.493-1.306 1.336-1.306.756 0 1.313.492 1.313 1.236 0 .697-.469 1.23-.902 1.705l-2.971 3.293V12h5.344v-1.107H7.268v-.077l1.974-2.22.096-.107c.688-.763 1.287-1.428 1.287-2.43 0-1.266-1.031-2.215-2.613-2.215-1.758 0-2.637 1.19-2.637 2.402v.065h1.271v-.07Z" />
                                    </svg>
                                    <h5 className="m-2">Join Our Community Today</h5>
                                    <p className="m-0 text-secondary">Join thousands of farmers, agricultural experts, and community members who are already benefiting from the resources and support available on KrushiMitr. Whether you're passionate about agriculture or simply curious about rural life, there's a place for you here.</p>
                                </div>
                            </div>
                            <div className="col-12 col-sm-6 col-lg-4">
                                <div className="text-center px-xl-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="currentColor" className="bi bi-3-circle-fill text-primary mb-4" viewBox="0 0 16 16">
                                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0Zm-8.082.414c.92 0 1.535.54 1.541 1.318.012.791-.615 1.36-1.588 1.354-.861-.006-1.482-.469-1.54-1.066H5.104c.047 1.177 1.05 2.144 2.754 2.144 1.653 0 2.954-.937 2.93-2.396-.023-1.278-1.031-1.846-1.734-1.916v-.07c.597-.1 1.505-.739 1.482-1.876-.03-1.177-1.043-2.074-2.637-2.062-1.675.006-2.59.984-2.625 2.12h1.248c.036-.556.557-1.054 1.348-1.054.785 0 1.348.486 1.348 1.195.006.715-.563 1.237-1.342 1.237h-.838v1.072h.879Z" />
                                    </svg>
                                    <h5 className="m-2">Contact Us</h5>
                                    <p className="m-0 text-secondary">We value your input! If you have any questions, or suggestions for improvement, we'd love to hear from you. Get in touch with our team today and help us continue to grow and evolve.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row justify-content-md-center mt-5">
                        <div className="col-12 col-md-10 col-lg-8 col-xl-7 col-xxl-6">
                            <h2 className="mb-4 display-5 text-center">Crops</h2>
                            <p className="text-secondary text-center">Explore crop details by clicking on a state from the map below. Gain insights into the crop year, season, area and production.</p>
                            <hr className="w-50 mx-auto mb-2 mb-xl-9 border-dark-subtle" />
                        </div>
                    </div>
                </section>
                <Map />
            </div>
            <Footer />
        </>
    );
}