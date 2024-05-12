import React from "react";
import Navbar from "../Navbar.js";
import Sidebar from "./Sidebar.js";
import { useLoaderData } from "react-router-dom";
import '../../assets/css/myitem.css';
import { Helmet } from 'react-helmet';
import NotFound from "../NotFound.js";

const MyImage = () => {

    const images = useLoaderData();
    const token = localStorage.getItem("authToken");

    if (token === null) {
        return (
            <NotFound />
        );
    }
    else {
        return (
            <>
                <Navbar />
                <Helmet>
                    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" />
                    <link rel="stylesheet" href="https://unpkg.com/bootstrap@5.3.2/dist/css/bootstrap.min.css" />
                </Helmet>
                <div style={{ paddingTop: '80px' }}>
                    <Sidebar />
                    <div className="d-flex my-container">
                        <div className="container-fluid mt-4">
                            <h3 style={{ color: 'grey', fontWeight: '500', textAlign: 'center', paddingTop: '30px', paddingBottom: '10px' }}>Your Images</h3>
                            <div className="card mb-4" style={{ border: 'none' }}>
                                <div className="card-body">
                                    <div className="form-group">
                                        {/* <input type="text" className="search form-control" placeholder="What you looking for?" onChange={handleSearch} /> */}
                                        <span className="pull-right">{images.length} item(s)</span>
                                        <div className='table-responsive results'>
                                            {images.length > 0 && <table className="table table-hover table-bordered">
                                                <thead>
                                                    <tr>
                                                        <th>#</th>
                                                        <th className="col-md-4">Image</th>
                                                        <th className="col-md-3">Disease</th>
                                                        <th className="col-md-5">Solution</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {images.map((img, index) => (
                                                        <tr key={index} className="table-row custom-table-row">
                                                            <td>{index + 1}</td>
                                                            <td className="col-md-4"><img src={`/uploads/${img.imageUrl}`} alt="Crop disease"></img></td>
                                                            <td className="col-md-3">{img.disease}</td>
                                                            <td className="col-md-5">{img.solution}</td>
                                                        </tr>
                                                    ))}
                                                    {images.length === 0 && (
                                                        <tr className="warning no-result">
                                                            <td colSpan="5"><i className="fa fa-warning"></i> No Images Uploaded</td>
                                                        </tr>
                                                    )}
                                                </tbody>
                                            </table>}
                                        </div>
                                        {images.length === 0 && <div>No Images Uploaded</div>}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

const fetchmyimages = async () => {
    const id = localStorage.getItem("userid");
    if (id === null) {
        return null;
    }
    else {
        const response = await fetch('/api/profile/myimages?user_id=' + id);
        // console.log("Hi");
        // console.log(response);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        // console.log(data);
        return data;
    }
}

export {
    MyImage,
    fetchmyimages
}
