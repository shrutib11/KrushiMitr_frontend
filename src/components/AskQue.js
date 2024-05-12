import React, { useState } from 'react';
import '../assets/css/style.css'
import yourImage from '../assets/images/thinking3.jpg'
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import { useToast } from '@chakra-ui/react';
import { Helmet } from 'react-helmet';
import NotFound from './NotFound';

const AskQue = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem("authToken");

    const backgroundStyle = {
        background: 'linear-gradient(to top, #c1dfc4 0%, #deecdd 100%)',
        minHeight: '100vh',
    };

    const [details, setdetails] = useState({
        question_title: "",
        question: "",
        posted_by: localStorage.getItem('username'),
        posted_by_id: localStorage.getItem('userid')
    })
    const toast = useToast()

    var msg;
    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch('/api/upload-question', {
            method: 'POST',
            body: JSON.stringify(details),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const json = await response.json();


        if (!response.ok) {
            toast({
                title: 'Error Occured while Uploading Question',
                status: 'warning',
                duration: 3000,
                isClosable: true,
                position: 'bottom-right',
            })
        }
        else {
            setdetails({
                question_title: "",
                question: "",
                posted_by: localStorage.getItem('username'),
                posted_by_id: localStorage.getItem('userid')
            })
            msg = json;
            if (msg !== '') {
                toast({
                    title: 'Question Uploaded',
                    status: 'success',
                    duration: 3000,
                    isClosable: true,
                    position: 'bottom-right',
                })
                navigate('/question')
            }
        }
        // alert(msg);
    }

    const onChange = (event) => {
        setdetails((prev) => ({ ...prev, [event.target.name]: event.target.value }))
    }

    if (token === null) {
        return (
            <NotFound />
        );
    }
    else {
        return (
            <>
                <Helmet>
                    <link rel="stylesheet" href="https://unpkg.com/bootstrap@5.3.2/dist/css/bootstrap.min.css" />
                </Helmet>
                <Navbar />
                <div style={{ paddingTop: '80px' }}>
                    <section className="vh-100" style={{ ...backgroundStyle }}>
                        <div className="h-100">
                            <div className="row d-flex justify-content-center align-items-center h-100">
                                <div className="col-lg-12 col-xl-7">
                                    <div className="card text-black" style={{ borderRadius: '25px' }}>
                                        <div className="card-body p-md-5">
                                            <div className="row justify-content-center">
                                                <div className="col-md-10 col-lg-5 col-xl-4 order-2 order-lg-1">

                                                    <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Ask Question</p>

                                                    <form onSubmit={handleSubmit} className="mx-1 mx-md-4" style={{ width: '100%' }}>

                                                        <div className="d-flex flex-row align-items-center mb-4" >
                                                            <div className="form-outline flex-fill mb-0">
                                                                <input type="text" id="form3Example1c" className="form-control" name="question_title" placeholder="Enter Question Title" value={details.question_title} onChange={onChange} required/>
                                                            </div>
                                                        </div>
                                                        <div className="d-flex flex-row align-items-center mb-4">
                                                            <div className="form-outline flex-fill mb-0">
                                                                <input type="text" id="form3Example4c" className="form-control" name="question" placeholder="Enter Question" value={details.question} onChange={onChange} required/>
                                                            </div>
                                                        </div>
                                                        <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                                                            <input type="submit" id="submit" className="btn btn-secondary btn-lg" value="Submit" />
                                                        </div>
                                                    </form>
                                                    {/* <Link to="/" className="text-secondary">Login as Admin</Link> */}

                                                </div>
                                                <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2" style={{ width: '80%', maxWidth: '500px' }}>

                                                    <img src={yourImage} alt="" />

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
                <Footer />
            </>
        )
    }
}

export default AskQue;