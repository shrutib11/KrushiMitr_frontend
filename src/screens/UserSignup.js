import React from 'react'
import { useState } from 'react'
import '../assets/css/style.css'
import yourImage from '../assets/images/asian_farmers_03.jpg'
import { Link, useNavigate } from 'react-router-dom'
import videoFile from '../assets/images/farmer4.gif'

export default function UserSignup({ handleSubmit, credentials, onChange, onLoginClick }) {
    return (
        <>
            <div className='container-fluid'>
                <section className="vh-100">
                    <div className="h-100">
                        <div className="row d-flex justify-content-center align-items-center h-100">
                            <div className="col-lg-12 col-xl-7">
                                <div className="card text-black" style={{ borderRadius: '25px' }}>
                                    <div className="card-body p-md-5">
                                        <div className="row justify-content-center">
                                            <div className="col-md-10 col-lg-5 col-xl-4 order-2 order-lg-1">

                                                <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign up</p>

                                                <form onSubmit={handleSubmit} className="mx-1 mx-md-4" style={{ width: '100%' }}>

                                                    <div className="d-flex flex-row align-items-center mb-4" >
                                                        <div className="form-outline flex-fill mb-0">
                                                            <input type="text" name="user_name" id="name" className="form-control" placeholder="Your Name" value={credentials.user_name} onChange={onChange} />
                                                        </div>
                                                    </div>
                                                    <div className="d-flex flex-row align-items-center mb-4">
                                                        <div className="form-outline flex-fill mb-0">
                                                            <input type="email" name="email" id="email" className="form-control" placeholder="Your Email" value={credentials.email} onChange={onChange} />
                                                        </div>
                                                    </div>
                                                    <div className="d-flex flex-row align-items-center mb-4">
                                                        <div className="form-outline flex-fill mb-0">
                                                            <input type="password" name="password" id="password" className="form-control" placeholder="Your Password" value={credentials.password} onChange={onChange} />
                                                        </div>
                                                    </div>
                                                    <div className="d-flex flex-row align-items-center mb-4">
                                                        <div className="form-outline flex-fill mb-0">
                                                            <select className="form-control" name="user_type" id="user_type" value={credentials.user_type} onChange={onChange} style={{ width: '100%' }}>
                                                                <option value="">Select Role</option>
                                                                <option value="Farmer">Farmer</option>
                                                                <option value="Expert">Expert</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                                                        <input type="submit" id="submit" class="btn btn-secondary btn-lg" value="Signup" />
                                                    </div>
                                                    {/* <Link to="/login" className="signup-image-link">Already user</Link> */}
                                                    <p className="text-center mb-0">
                                                        Already a user? <span className="text-primary" style={{ cursor: 'pointer' }} onClick={onLoginClick}>Login</span>
                                                    </p>
                                                </form>
                                                {/* <Link to="/" className="text-secondary">Login as Admin</Link> */}

                                            </div>
                                            <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2" style={{ width: '80%', maxWidth: '500px' }}>

                                                <img src={yourImage} alt="" />
                                                {/* <img src={videoFile} alt="GIF"/> */}

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </>
    );


}