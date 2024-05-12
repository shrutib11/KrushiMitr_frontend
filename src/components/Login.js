import React from 'react';
import yourImage from '../assets/images/3456178.jpg'

const Login = ({ handleSubmit, credentials, onChange, onSignupClick }) => {
  return (
    <>
      <div className='container-fluid'>
        <section className="vh-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-md-10 col-lg-7">
              <div className="card text-black" style={{ borderRadius: '25px' }}>
                <div className="card-body p-md-5">
                  <div className="row justify-content-center">
                    <div className="col-md-10 col-lg-6 order-md-1">
                      <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Log in</p>
                      <form onSubmit={handleSubmit} className="mx-1 mx-md-4" style={{ width: '100%' }}>
                        <div className="d-flex flex-row align-items-center mb-4" >
                          <div className="form-outline flex-fill mb-0">
                            <input type="email" id="form3Example1c" className="form-control" name="email" placeholder="Email" value={credentials.email} onChange={onChange} />
                          </div>
                        </div>
                        <div className="d-flex flex-row align-items-center mb-4">
                          <div className="form-outline flex-fill mb-0">
                            <input type="password" id="form3Example4c" className="form-control" name="password" placeholder="Password" value={credentials.password} onChange={onChange} />
                          </div>
                        </div>
                        <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                          <button type="submit" id="submit" className="btn btn-secondary btn-lg">Login </button>
                        </div>
                        <p className="text-center mb-0">
                          Don't have an account? <span className="text-primary" name="create-account" style={{ cursor: 'pointer' }} onClick={onSignupClick}>Create an account</span>
                        </p>
                      </form>
                    </div>
                    <div className="col-md-9 col-lg-6 order-md-2 mt-5">
                      {/* <img src={videoFile} alt="GIF" style={{ width: '100%', height: '90%' }}/> */}
                      <img src={yourImage} alt="" className="img-fluid" />
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
};

export default Login;