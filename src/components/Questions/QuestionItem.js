import React, { useState, useMemo, useRef, useCallback, useEffect } from 'react';
import { useParams, useLoaderData, useNavigate } from 'react-router-dom';
import JoditEditor from "jodit-react";
import DOMPurify from 'dompurify';
import QuestionComment from './QuestionComment';
import Navbar from '../Navbar';
import { Helmet } from 'react-helmet';
import Footer from '../Footer';
import { useToast } from '@chakra-ui/react'
import CommentInput from './CommentInput';
import { Button, AlertDialog, AlertDialogOverlay, AlertDialogContent, AlertDialogHeader, AlertDialogCloseButton, AlertDialogBody, AlertDialogFooter, useDisclosure } from '@chakra-ui/react';
import AnswerItem from './AnswerItem';

const QuestionItem = () => {
    const navigate = useNavigate();
    const { question_id } = useParams();
    console.log(question_id);
    const [question, setQuestion] = useState(useLoaderData());
    const [showComments, setShowComments] = useState(false);
    const [totalComments, setTotalComments] = useState(question.comments.length);
    const [totalAnswers, setTotalAnswers] = useState(question.answer.length);

    const toast = useToast()

    const user_id = localStorage.getItem("userid");
    const user_name = localStorage.getItem("username");
    const role = localStorage.getItem("role");

    const { isOpen: isOpen, onOpen: onOpen, onClose: onClose } = useDisclosure();
    const handleClose = () => {
        onClose();
    }

    const [isLogin, setisLogin] = useState(true);
    const cancelRef = useRef()

    const pleaselogin = () => {
        onOpen();
        // navigate("/login", { replace: true });
    };

    useEffect(() => {
        // const question = useLoaderData();
        setTotalComments(question.comments.length);
        if (user_id == null) {
            setisLogin(false);
        }
        else {
            var value;
            var isvoted = false;
            for (var i of question.likes_by) {
                if (i.liked_by_id == user_id) {
                    value = i.value;
                    isvoted = true;
                }
            }
            console.log(isvoted);
            if (isvoted) {
                if (value === 1) {
                    setIsUpvoted(true);
                }
                else {
                    setIsDownvoted(true);
                }
            }
        }
    }, [])

    const [voteCount, setvoteCount] = useState(question.likes);
    const [isUpvoted, setIsUpvoted] = useState(false);
    const [isDownvoted, setIsDownvoted] = useState(false);
    const [details, setDetails] = useState({
        ans: "",
        question_id: question_id,
        posted_by: localStorage.getItem("username"),
        posted_by_id: localStorage.getItem('userid')
    });

    const [commentdetails, setcommentDetails] = useState({
        message: "",
        question_id: question_id,
        posted_by: user_name,
        posted_by_id: user_id
    });

    const upvote = async () => {
        const formData = {
            question_id: question_id,
            liked_by_id: user_id
        };
        if (isUpvoted === false && isDownvoted === false) {
            setIsUpvoted(true);
            const response = await fetch('/api/like-question', {
                method: 'POST',
                body: JSON.stringify(formData),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            response.json().then(data => {
                if (response.ok) {
                    setvoteCount(voteCount + 1);
                } else {
                    console.log("Error while updating likes");
                }
            });
        }
        else if (isUpvoted === true && isDownvoted === false) {
            setIsUpvoted(false);
            const response = await fetch('/api/remove-like-question', {
                method: 'POST',
                body: JSON.stringify(formData),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            response.json().then(data => {
                if (response.ok) {
                    setvoteCount(voteCount - 1);
                } else {
                    console.log("Error while updating likes");
                }
            });
        }
        else if (isUpvoted === false && isDownvoted === true) {
            setIsUpvoted(true);
            setIsDownvoted(false);
            const response = await fetch('/api/convert-dislike-to-like-question', {
                method: 'POST',
                body: JSON.stringify(formData),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            response.json().then(data => {
                if (response.ok) {
                    setvoteCount(voteCount + 2);
                } else {
                    console.log("Error while updating likes");
                }
            });
        }
    }

    const downvote = async () => {
        const formData = {
            question_id: question_id,
            liked_by_id: user_id
        };
        if (isDownvoted === false && isUpvoted === false) {
            setIsDownvoted(true);
            const response = await fetch('/api/dislike-question', {
                method: 'POST',
                body: JSON.stringify(formData),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            response.json().then(data => {
                if (response.ok) {
                    setvoteCount(voteCount - 1);
                } else {
                    console.log("Error while updating likes");
                }
            });
        }
        else if (isDownvoted === true && isUpvoted === false) {
            setIsDownvoted(false);
            const response = await fetch('/api/remove-dislike-question', {
                method: 'POST',
                body: JSON.stringify(formData),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            response.json().then(data => {
                if (response.ok) {
                    setvoteCount(voteCount + 1);
                } else {
                    console.log("Error while updating likes");
                }
            });
        }
        else if (isDownvoted === false && isUpvoted === true) {
            setIsDownvoted(true);
            setIsUpvoted(false);
            const response = await fetch('/api/convert-like-to-dislike-question', {
                method: 'POST',
                body: JSON.stringify(formData),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            response.json().then(data => {
                if (response.ok) {
                    setvoteCount(voteCount - 2);
                } else {
                    console.log("Error while updating likes");
                }
            });
        }
    }

    const handelCommentChange = (e) => {
        setcommentDetails((prevState) => ({ ...prevState, message: e.target.value }));
        //console.log(details);
    }

    const handelCommentSubmit = async (e) => {
        e.preventDefault();
        if (commentdetails.message.trim() === '') {
            alert('Please enter your Comment before submitting.'); // Show an error message
        }
        else if (user_id === null) {
            // alert('Please login before adding a comment.');
            onOpen();
            setcommentDetails({
                message: "",
                question_id: question_id,
                posted_by: user_name,
                posted_by_id: user_id
            });
        }
        else {
            const response = await fetch('/api/comment-on-question', {
                method: 'POST',
                body: JSON.stringify(commentdetails),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            var msg;
            const json = await response.json();
            if (!response.ok) {
                toast({
                    title: 'Error Occured while Adding Comment',
                    status: 'warning',
                    duration: 3000,
                    isClosable: true,
                    position: 'bottom-right',
                })
            }
            else {
                setcommentDetails({
                    message: "",
                    question_id: question_id,
                    posted_by: user_name,
                    posted_by_id: user_id
                });
                msg = json;
                if (msg !== '') {
                    toast({
                        title: 'Comment Added',
                        status: 'success',
                        duration: 3000,
                        isClosable: true,
                        position: 'bottom-right',
                    })
                }
            }
            // alert(msg);
            const newData = await fetch('/api/specific-question?question_id=' + question_id);
            // console.log(response);
            if (!newData.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await newData.json();
            setQuestion(data);
            setTotalComments(totalComments + 1);
        }
    }

    const toggleContainerStyle = {
        margin: '0 auto',
        backgroundColor: '#ffffff',
        borderRadius: '5px',
        boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)'
    };

    const toggleButtonStyle = {
        backgroundColor: '#a5b4a0',
        color: '#4e6f43',
        border: 'none',
        padding: '10px 20px',
        fontSize: '20px',
        cursor: 'pointer',
        width: '100%',
        textAlign: 'left',
        borderTopLeftRadius: '5px',
        borderTopRightRadius: '5px',
        fontWeight: '500'
    };

    const answersStyle = {
        padding: '10px 20px',
        backgroundColor: '#f8f9fa',
        color: '#000000',
        borderBottomLeftRadius: '5px',
        borderBottomRightRadius: '5px'
    };

    const backgroundStyle = {
        background: 'linear-gradient(to top, #c1dfc4 0%, #deecdd 100%)',
        minHeight: '100vh',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#ffffff'
    };

    const config = useMemo(() => ({
        buttons: ["bold", "italic", "link", "unlink", "ul", "ol", "underline", "image", "font", "fontsize", "brush", "redo", "undo", "eraser", "table"],
    }), []);

    const editor = useRef(null);

    const [showAnswers, setShowAnswers] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        var is_expt = 0;
        if (role == "Expert") {
            is_expt = 1;
        }
        if (details.ans.trim() === '') {
            alert('Please enter your answer before submitting.');
        }
        else if (user_id === null) {
            // alert('Please login before adding a comment.');
            onOpen();
            setDetails({
                ans: "",
                question_id: question_id,
                posted_by: user_name,
                posted_by_id: user_id
            });
        }
        else {
            const sanitizedContent = DOMPurify.sanitize(details.ans);
            const response = await fetch('/api/upload-answer', {
                method: 'POST',
                body: JSON.stringify({ ...details, ans: sanitizedContent, is_expert: is_expt }),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            var msg;
            const json = await response.json();
            if (!response.ok) {
                toast({
                    title: 'Error Occured while Uploading Answer',
                    status: 'warning',
                    duration: 3000,
                    isClosable: true,
                    position: 'bottom-right',
                })
            }
            else {
                setDetails({
                    ans: "",
                    question_id: question_id,
                    posted_by: user_name,
                    posted_by_id: user_id
                });
                msg = json;
                if (msg !== '') {
                    toast({
                        title: 'Answer Uploaded',
                        status: 'success',
                        duration: 3000,
                        isClosable: true,
                        position: 'bottom-right',
                    })
                }
            }
            const newData = await fetch('/api/specific-question?question_id=' + question_id);
            if (!newData.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await newData.json();
            setQuestion(data);
            setTotalAnswers(totalAnswers + 1);
        }
    };

    const handelAnswerChange = useCallback((content) => {
        setDetails((prevState) => ({ ...prevState, ans: content }));
    }, []);

    const formatDate = (timestamp) => {
        return new Date(timestamp).toLocaleDateString('en-GB', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });
    }

    if (isLogin) {
        return (
            <div style={backgroundStyle}>
                <Helmet>
                    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" />
                    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.bundle.min.js" />
                    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js" />
                    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
                    <link rel="stylesheet" href="https://unpkg.com/bootstrap@5.3.2/dist/css/bootstrap.min.css" />
                </Helmet>
                <Navbar />
                <div style={{ paddingTop: '80px' }}>
                    <div style={{ maxWidth: '900px', margin: 'auto', paddingTop: '55px' }}>
                        <div className="card-group-control card-group-control-right">
                            <div className="card mb-2 w-100">
                                <div className="card-header" style={{ borderBottom: '1px solid #ccc' }}>
                                    <div className="d-flex justify-content-between align-items-center">
                                        <div className="text-muted text-uppercase">
                                            <h6 className="card-title" style={{ fontSize: '20px', marginBottom: '0' }}>
                                                <i className="fa fa-question-circle-o mr-2 mt-0-20 pull-left"></i>
                                                {question.question_title}
                                            </h6>
                                        </div>
                                        <ul className="list-inline mb-0">
                                            <li className="list-inline-item">
                                                <a href="#" className="text-success mr-2" onClick={upvote}>
                                                    <i className="fa fa-thumbs-up" style={{ fontSize: '26px' }}></i>
                                                </a>
                                                <span style={{ fontSize: '22px', fontWeight: '400' }}>{voteCount}</span>
                                            </li>
                                            <li className="list-inline-item">
                                                <a href="#" className="text-muted mr-2" onClick={downvote}>
                                                    <i className="fa fa-thumbs-down" style={{ fontSize: '26px' }}></i>
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="collapse show">
                                    <div className="card-body">
                                        {question.question}
                                    </div>
                                    <div className="card-footer bg-transparent d-sm-flex align-items-sm-center border-top-0 pt-0">
                                        <span className="text-muted">Posted By : {question.posted_by}</span>
                                    </div>
                                    <div className="card-footer mt-3" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingLeft: '10px' }}>
                                        <span className='text-muted'>
                                            Last Updated : {formatDate(question?.updatedAt)}
                                        </span>
                                        <div>
                                            <a className="text-secondary" onClick={() => setShowComments(!showComments)} title='Comments'>
                                                <i className="fa fa-comments" style={{ fontSize: '24px' }} aria-hidden="true"></i>&nbsp;
                                                <span style={{ fontSize: '1.25rem' }}>{totalComments}</span>
                                            </a> &nbsp; &nbsp;
                                            <a className="text-secondary" onClick={() => setShowAnswers(!showAnswers)} title='Answers'>
                                                <i className="fa fa-reply-all" style={{ fontSize: '23px' }} aria-hidden="true"></i>&nbsp;
                                                <span style={{ fontSize: '1.25rem' }}>{totalAnswers}</span>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {showComments && (
                            <div className="toggle-container" style={toggleContainerStyle} >
                                <br />
                                <CommentInput
                                    onSubmit={handelCommentSubmit}
                                    value={commentdetails.message}
                                    onChange={handelCommentChange}
                                    className="flex-grow-2 mr-1"
                                ></CommentInput>
                                {question.comments.map((comment) => (
                                    <QuestionComment key={comment.comment_id} comment={comment} />
                                ))}
                                <br></br>
                            </div>
                        )}
                        <br />
                        {showAnswers && (
                            <div className="toggle-container" style={toggleContainerStyle}>
                                <button className="toggle-button" style={toggleButtonStyle}>
                                    Answers
                                </button>
                                <div className="answers" style={answersStyle}>
                                    <div className='mt-2'>
                                        {question.answer && question.answer.map((val, index) => <AnswerItem id={index} ans={val} islogin={true} user_id={user_id} user_name={user_name} question_id={question.question_id} />)}
                                    </div>
                                </div>
                            </div>
                        )}

                        <div className="jodit-editor-container mt-5">
                            <form>
                                <JoditEditor
                                    value={details.ans}
                                    config={config}
                                    ref={editor}
                                    id="jdt-editor"
                                    onChange={handelAnswerChange}
                                />

                                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                                    <button
                                        className="btn btn-floating"
                                        type="submit"
                                        id="submit"
                                        style={{
                                            backgroundColor: '#799b6e',
                                            color: '#ffffff',
                                            borderRadius: '5px',
                                            placeItems: 'center',
                                            display: 'grid',
                                            border: 'none',
                                            marginBottom: '20px'
                                        }}
                                        onClick={handleSubmit}
                                    >
                                        Submit Answer
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }
    else {
        return (
            <div style={backgroundStyle}>
                <Helmet>
                    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" />
                    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.bundle.min.js" />
                    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js" />
                    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
                    <link rel="stylesheet" href="https://unpkg.com/bootstrap@5.3.2/dist/css/bootstrap.min.css" />
                </Helmet>
                <Navbar />
                <div style={{ paddingTop: '80px' }}>
                    <div style={{ maxWidth: '900px', margin: 'auto', paddingTop: '55px' }}>
                        <div className="card-group-control card-group-control-right">
                            <div className="card mb-2 w-100">
                                <div className="card-header" style={{ borderBottom: '1px solid #ccc' }}>
                                    <div className="d-flex justify-content-between align-items-center">
                                        <div className="text-muted text-uppercase">
                                            <h6 className="card-title" style={{ fontSize: '20px', marginBottom: '0' }}>
                                                <i className="fa fa-question-circle-o mr-2 mt-0-20 pull-left"></i>
                                                {question.question_title}
                                            </h6>
                                        </div>
                                        <ul className="list-inline mb-0">
                                            <li className="list-inline-item">
                                                <a href="#" className="text-success mr-2" onClick={() => pleaselogin()}>
                                                    <i className="fa fa-thumbs-up" style={{ fontSize: '26px' }}></i>
                                                </a>
                                                <span style={{ fontSize: '22px', fontWeight: '400' }}>{voteCount}</span>
                                            </li>
                                            <li className="list-inline-item">
                                                <a href="#" className="text-muted mr-2" onClick={() => pleaselogin()}>
                                                    <i className="fa fa-thumbs-down" style={{ fontSize: '26px' }}></i>
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="collapse show">
                                    <div className="card-body">
                                        {question.question}
                                    </div>
                                    <div className="card-footer bg-transparent d-sm-flex align-items-sm-center border-top-0 pt-0">
                                        <span className="text-muted">Posted By : {question.posted_by}</span>
                                    </div>
                                    <div className="card-footer mt-3" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingLeft: '10px' }}>
                                        <span className='text-muted'>
                                            Last Updated : {formatDate(question?.updatedAt)}
                                        </span>
                                        <div>
                                            <a className="text-secondary" onClick={() => setShowComments(!showComments)} title='Comments'>
                                                <i className="fa fa-comments" style={{ fontSize: '24px' }} aria-hidden="true"></i>&nbsp;
                                                <span style={{ fontSize: '1.25rem' }}>{totalComments}</span>
                                            </a> &nbsp; &nbsp;
                                            <a className="text-secondary" onClick={() => setShowAnswers(!showAnswers)} title='Answers'>
                                                <i className="fa fa-reply-all" style={{ fontSize: '23px' }} aria-hidden="true"></i>&nbsp;
                                                <span style={{ fontSize: '1.25rem' }}>{totalAnswers}</span>
                                            </a>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>

                        {showComments && (
                            <div className="toggle-container" style={toggleContainerStyle} >
                                <br />
                                {question.comments.map((comment) => (
                                    <QuestionComment key={comment.comment_id} comment={comment} />
                                ))}
                                <br></br>
                            </div>
                        )}
                        <br />

                        {showAnswers && (
                            <div className="toggle-container" style={toggleContainerStyle}>
                                <button className="toggle-button" style={toggleButtonStyle}>
                                    Answers
                                </button>
                                <div className="answers" style={answersStyle}>
                                    <div className='mt-2'>
                                        {question.answer && question.answer.map((val, index) => <AnswerItem id={index} ans={val} islogin={false} pleaselogin={pleaselogin} question_id={question.question_id} />
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}

                        <div className="jodit-editor-container mt-5">
                            <form>
                                <JoditEditor
                                    value={details.ans}
                                    config={config}
                                    ref={editor}
                                    id='jdt-editor'
                                    onChange={handelAnswerChange}
                                />

                                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                                    <button
                                        className="btn btn-floating"
                                        type="submit"
                                        id='submit'
                                        style={{
                                            backgroundColor: '#799b6e',
                                            color: '#ffffff',
                                            borderRadius: '5px',
                                            placeItems: 'center',
                                            display: 'grid',
                                            border: 'none',
                                            marginBottom: '20px'
                                        }}
                                        onClick={handleSubmit}
                                    >
                                        Submit Answer
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                    <Footer />
                    <AlertDialog
                        isOpen={isOpen}
                        leastDestructiveRef={cancelRef}
                        onClose={onClose}
                    >
                        <AlertDialogOverlay />
                        <AlertDialogContent>
                            <AlertDialogHeader>Error</AlertDialogHeader>
                            <AlertDialogCloseButton />
                            <AlertDialogBody>
                                Please login first.
                            </AlertDialogBody>
                            <AlertDialogFooter>
                                <Button colorScheme="green" onClick={handleClose}>OK</Button>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </div>
            </div>
        );
    }
};

const fetchquestion = async ({ params }) => {
    const { question_id } = params;
    const response = await fetch('/api/specific-question?question_id=' + question_id);
    console.log(response);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    const data = await response.json();
    console.log(data);
    return data;
};

export {
    fetchquestion,
    QuestionItem
};