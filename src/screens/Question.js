import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import AllQuestions from '../components/Questions/AllQuestions';
import Footer from '../components/Footer';
import { Helmet } from 'react-helmet';

export default function Question() {
    const navigate = useNavigate();

    const backgroundStyle = {
        background: 'linear-gradient(to top, #c1dfc4 0%, #deecdd 100%)',
        minHeight: '100vh',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#ffffff',
    };

    const [data, setData] = useState([]);
    const [isLoading, setisLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const role = localStorage.getItem('role');

    const handleOnClick = () => {
        navigate('/askque');
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://krushi-mitr-backend.vercel.app/api/display-all-questions');
                const jsonData = await response.json();
                setData(jsonData);
                setisLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setisLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleSearch = (e) => {
        const query = e.target.value.toLowerCase();
        setSearchQuery(query);
    };

    const filteredQuestions = data.filter((question) =>
        question.question_title.toLowerCase().includes(searchQuery) ||
        question.question.toLowerCase().includes(searchQuery)
    );

    return (
        <>
            <Helmet>
                <link rel="stylesheet" href="https://unpkg.com/bootstrap@5.3.2/dist/css/bootstrap.min.css" />
            </Helmet>
            <Navbar />
            <div style={{ paddingTop: '80px' }}>
                <div style={backgroundStyle}>
                    <div style={{ maxWidth: '900px', margin: 'auto' }}>
                        <h2 className="text-center pt-5" style={{ color: '#4e6f43', fontWeight: '550' }}>All Questions</h2>
                        <div className="input-group mb-3 mt-3">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Search questions..."
                                value={searchQuery}
                                onChange={handleSearch}
                            />
                            <div className="input-group-append">
                                <button className="btn btn-outline-secondary" type="button">Search</button>
                            </div>
                        </div>
                        <div className='mt-5 pb-4'>
                            {filteredQuestions.length > 0 ? (
                                filteredQuestions.map((question) => (
                                    <AllQuestions question={question} key={question.question_id} />
                                ))
                            ) : (
                                <p className="text-center mt-3">No questions found.</p>
                            )}
                        </div>
                    </div>
                </div>
                {role === 'Farmer' && (
                    <div style={{ position: 'relative' }}>
                        <button
                            className="btn btn-floating"
                            style={{
                                position: 'absolute',
                                bottom: '50px',
                                right: '50px',
                                backgroundColor: '#5c7c52',
                                color: '#ffffff',
                                borderRadius: '5px',
                                padding: '10px',
                                outline: 'none'
                            }}
                            id="ask-question"
                            onClick={handleOnClick}
                        >
                            Ask a Question
                        </button>
                    </div>
                )}
            </div>
            <Footer />
        </>
    );
}
