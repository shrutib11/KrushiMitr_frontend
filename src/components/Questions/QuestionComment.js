import React from 'react';

const QuestionComment = ({ comment }) => {
    return (
        <div className="card m-2">
            <div className="card-body">
                <p className="card-text">{comment.message}</p>
            </div>
            <div className="card-footer text-muted small">
                Posted by: {comment.posted_by}
            </div>
        </div>
    );
};

export default QuestionComment;
