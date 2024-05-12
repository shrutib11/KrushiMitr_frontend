import React from 'react';

const AnswerComment = ({ comment }) => {
    return (
        <div className="card m-2" style={{ width : '100%'}}>
            <div className="card-body">
                <p className="card-text">{comment.message}</p>
            </div>
            <div className="card-footer text-muted small">
                Posted by: {comment.posted_by}
            </div>
        </div>
    );
};

export default AnswerComment;
