import React from "react";
import Navbar from "../Navbar.js";
import Sidebar from "./Sidebar.js";
import { useLoaderData } from "react-router-dom";
import MyAnswerItem from './MyAnswerItem.js'
import '../../assets/css/profile.css'
import { Helmet } from "react-helmet";
import NotFound from "../NotFound.js";
import '../../assets/css/myitem.css'

const MyAnswers = () => {

    const questions = useLoaderData();
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
                    <link rel="stylesheet" href="https://unpkg.com/bootstrap@5.3.2/dist/css/bootstrap.min.css" />
                </Helmet>
                <div style={{ paddingTop: '80px' }}>
                    <Sidebar />
                    <div className="d-flex" style={{ marginTop: '0vh' }}>
                        <div className="mainContainer">
                            {questions && questions.length > 0 ? (
                                <>
                                    <h3 className="heading">Your Answers</h3>
                                    <div className='mygrid' style={{ margin: '10px' }}>
                                        {questions.map((question) => (
                                            <MyAnswerItem question={question} key={question.question_id} />
                                        ))}
                                    </div>
                                </>
                            ) : (
                                <h3>No Answer Uploaded</h3>
                            )}
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

const fetchmyanswers = async () => {
    const id = localStorage.getItem("userid");
    if (id === null) {
        return null;
    }
    else {
        const response = await fetch('/api/profile/myanswers?user_id=' + id);
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
    MyAnswers,
    fetchmyanswers
};
