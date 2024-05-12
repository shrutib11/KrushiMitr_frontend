import React, { useState, useEffect } from 'react';
import Circle from './Circle';

const CommentInput = ({ onSubmit, value, onChange, className }) => {
    const [username, setUsername] = useState('');

    useEffect(() => {
        const user_name = localStorage.getItem("username");
        if (user_name) {
            setUsername(user_name)
        }
    }, [])
    return (
        <form className={`m-3 ${className}`} onSubmit={onSubmit}>
            <div className="d-flex flex-row align-items-center">
                <Circle username={username} />
                <input
                    className="form-control flex-grow-1 mr-2"
                    style={{ borderBottom: '1px solid #ccc', borderTop: 'none', borderLeft: 'none', borderRight: 'none', flex: '1', borderRadius: '0', boxShadow: 'none' }}
                    placeholder="Add a Comment"
                    value={value}
                    onChange={onChange}
                    required
                />
                <button
                    className={`btn btn-floating ${className}`}
                    type="submit"
                    style={{
                        backgroundColor: '#799b6e',
                        color: '#ffffff',
                        borderTopLeftRadius: '20px',
                        borderTopRightRadius: '20px',
                        borderBottomLeftRadius: '20px',
                        borderBottomRightRadius: '20px',
                        padding: '10px 20px',
                        placeItems: 'center',
                        display: 'grid',
                        border: 'none',
                        marginBottom: '10px',
                    }}
                    tabIndex={0}>
                    Add Comment
                </button>
            </div>
        </form>
    );
};

export default CommentInput