import React, { useState, useRef } from 'react';
import '../../assets/css/style.css'
import yourImage from '../../assets/images/thinking3.jpg';
import { useNavigate } from 'react-router-dom';
import { Button, AlertDialog, AlertDialogOverlay, AlertDialogContent, AlertDialogHeader, AlertDialogBody, AlertDialogFooter, useToast } from '@chakra-ui/react';
import Navbar from '../Navbar';
import Footer from '../Footer';
import { Helmet } from 'react-helmet';
import NotFound from '../NotFound';

const ComplaintUpload = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem("authToken");

    const backgroundStyle = {
        background: 'linear-gradient(to top, #c1dfc4 0%, #deecdd 100%)',
        minHeight: '100vh',
    };

    const [details, setdetails] = useState({
        message: "",
        posted_by: localStorage.getItem('username'),
        posted_by_id: localStorage.getItem('userid')
    })

    const [errorMsg, setErrorMsg] = useState('');
    const [errorOpen, setErrorOpen] = useState(false);
    const cancelRef = useRef();
    const toast = useToast()

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch('/api/file-complaint', {
            method: 'POST',
            body: JSON.stringify(details),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const json = await response.json();

        if (!response.ok) {
            setErrorMsg(json.error);
            setErrorOpen(true);
        }
        else {
            setdetails({
                message: "",
                posted_by: localStorage.getItem('username'),
                posted_by_id: localStorage.getItem('userid')
            })
            toast({
                title: 'Complaint has been added successfully',
                status: 'success',
                duration: 5000,
                isClosable: true,
                position: 'bottom-right',
            })
            // navigate('/profile')
        }
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

                                                    <p className="text-center h3 fw-bold mb-3 mx-1 mt-5">File Your Complaint</p>

                                                    <form onSubmit={handleSubmit} className="mx-1 mx-md-4" style={{ width: '100%' }}>

                                                        <div className="d-flex flex-row align-items-center mb-4" >
                                                            <div className="form-outline flex-fill mb-0">
                                                                <textarea id="form3Example1c" className="form-control" name="message" placeholder="Enter Complaint" value={details.message} onChange={onChange}/>
                                                            </div>
                                                        </div>
                                                        <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                                                            <input type="submit" className="btn btn-secondary btn-lg" value="Submit" />
                                                        </div>
                                                    </form>

                                                </div>
                                                <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2" style={{ width: '80%', maxWidth: '400px' }}>

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
                {errorOpen && (
                    <AlertDialog
                        isOpen={errorOpen}
                        leastDestructiveRef={cancelRef}
                        onClose={() => setErrorOpen(false)}
                    >
                        <AlertDialogOverlay>
                            <AlertDialogContent>
                                <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                                    Error
                                </AlertDialogHeader>

                                <AlertDialogBody>
                                    {errorMsg}
                                </AlertDialogBody>

                                <AlertDialogFooter>
                                    <Button onClick={() => setErrorOpen(false)}>
                                        Close
                                    </Button>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialogOverlay>
                    </AlertDialog>
                )}
            </>
        );
    }

}

export default ComplaintUpload;