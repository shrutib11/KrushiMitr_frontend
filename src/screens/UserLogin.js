import React from 'react'
import '../assets/css/style.css'
import yourImage from '../assets/images/3456178.jpg'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function UserLogin() {
    const backgroundStyle = {
        backgroundImage: `url(https://t3.ftcdn.net/jpg/05/77/91/88/240_F_577918823_Du0k5gFpLtUROvvJKRrZmK7hdnyhl6en.jpg)`, // Replace 'your-image-url.jpg' with the actual URL of your image
        backgroundSize: 'cover', // Adjust as needed
        backgroundPosition: 'center', // Adjust as needed
        backgroundRepeat: 'no-repeat' // Adjust as needed
      };

    const [credentials, setcredentials] = useState({ email: "", password: "" })
    let navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("/api/loginuser", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: credentials.email,
                password: credentials.password
            })
        });

        const json = await response.json()

        if (!json.success) {//value is false
            console.log(json);
            alert("Enter Valid credentials")
        }
        // document.location.reload();
        else{
            localStorage.setItem("authToken", json.authToken);
            localStorage.setItem("username", json.username);
            localStorage.setItem("userid", json.userid);
            localStorage.setItem("role", json.role);
            navigate('/')
        }   
    }

    const onChange = (event) => {
        setcredentials({ ...credentials, [event.target.name]: event.target.value })
    }
    return (
        <>
            {/*
            <div className="main">
            <section className="sign-in">
            <div className="container">
                <div className="signin-content">
                    <div className="signin-image" style={{ width: '80%', maxWidth: '300px' }}>
                        <figure><img src={yourImage} alt="sing up image"/></figure>
                        <Link to= "/signup" className="signup-image-link">Create an account</Link>
                    </div>

                    <div className="signin-form">
                        <h2 className="form-title">Login</h2>
                        <form method="POST" className="register-form" id="login-form">
                            <div className="form-group">
                                <label for="your_email"><i className="zmdi zmdi-account material-icons-email"></i></label>
                                <input type="text" name="your_email" id="your_email" placeholder="Your Email"/>
                            </div>
                            <div className="form-group">
                                <label for="your_pass"><i className="zmdi zmdi-lock"></i></label>
                                <input type="password" name="your_pass" id="your_pass" placeholder="Password"/>
                            </div>
                            <div className="form-group form-button">
                                <input type="submit" name="signin" id="signin" className="form-submit" value="Log in"/>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
                    
            </div>
    */}
            <section className="vh-100" style={{ ...backgroundStyle}}>
                <div className="h-100">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-lg-12 col-xl-7">
                            <div className="card text-black" style={{ borderRadius: '25px'}}>
                                <div className="card-body p-md-5">
                                    <div className="row justify-content-center">
                                        <div className="col-md-10 col-lg-5 col-xl-4 order-2 order-lg-1">

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
                                                    <input type="submit" class="btn btn-secondary btn-lg" value="Login" />
                                                </div>
                                                <Link to="/signup" className="signup-image-link">Create an account</Link>
                                            </form>
                                            {/* <Link to="/" className="text-secondary">Login as Admin</Link> */}

                                        </div>
                                        <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2" style={{ width: '80%', maxWidth: '500px' }}>

                                            <img src= {yourImage} alt=""/>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}