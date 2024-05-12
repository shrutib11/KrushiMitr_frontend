import React from "react";
import Navbar from "../Navbar";
import Sidebar from "../Profiles/Sidebar";
import { useLoaderData } from "react-router-dom";
import MyQuestionItem from "./MyQuestionItem";
import '../../assets/css/profile.css'
import { Helmet } from "react-helmet";
import NotFound from "../NotFound";
import '../../assets/css/myitem.css'

const MyQuestions = () => {

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
                                    <h3 className="heading">Your Questions</h3>
                                    <div className='mygrid' style={{ margin: '10px' }}>
                                        {questions.map((question) => (
                                            <MyQuestionItem key={question.question_id} question={question} />
                                        ))}
                                    </div>
                                </>
                            ) : (
                                <h3>No Questions have been asked</h3>
                            )}
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

const fetchmyquestions = async () => {
    const id = localStorage.getItem("userid");
    if (id === null) {
        return null;
    }
    else {
        const response = await fetch('/api/profile/myques?user_id=' + id);
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
    MyQuestions,
    fetchmyquestions
}