import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

const AllQuestions = ({ question }) => {
    return (
        <li className="list-group-item mb-3" style={{ margin: '10px 0' }}>
            <Helmet>
                <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" />
                <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.bundle.min.js" />
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js" />
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
                <link rel="stylesheet" href="https://unpkg.com/bootstrap@5.3.2/dist/css/bootstrap.min.css" />
            </Helmet>
            <div className="w-100 overflow-auto order-2 order-md-1">
                <div className="card-group-control card-group-control-right">
                    <div className="card mb-2 w-100">
                        <div className="card-header">
                            <a className="text-muted text-uppercase" data-toggle="collapse" href={`#question${question.question_id}`} >
                                <h6 className="card-title">

                                    <i className="fa fa-question-circle-o mr-2 mt-0-20 pull-left"></i>
                                    <Link
                                        to={`/question/${question.question_id}`}
                                        key={question.question_id}
                                        id={`ques${question.question_id}`}
                                        style={{ textDecoration: 'none', color: 'inherit' }} 
                                    >
                                        {question.question_title}
                                    </Link>
                                    <i className="fa fa-plus mr-2 text-slate pull-right"></i>
                                </h6>
                            </a>
                        </div>
                        <div id={`question${question.question_id}`} className="collapse hide">
                            <div className="card-body">
                                {question.question}
                            </div>
                            <div className="card-footer bg-transparent d-sm-flex align-items-sm-center border-top-0 pt-0">
                                <span className="text-muted">Posted By : {question.posted_by}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </li>

    );
}

export default AllQuestions;