import React from 'react';
import '../../assets/css/editform.css';
import { Helmet } from 'react-helmet';

const EditFormQue = ({ editQuestion, handleTitleChange, handleQuestionChange, handleSubmit }) => {
  return (
    <form onSubmit={handleSubmit} className='m-auto mt-5'>
      <Helmet>
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" />
                <link rel="stylesheet" href="https://unpkg.com/bootstrap@5.3.2/dist/css/bootstrap.min.css" />
      </Helmet>
      <div className="card-front">
        <div className="center-wrap">
          <div className="section text-center">
            <div className="form-group">
              <div className="input-container">
                <input
                  type="text"
                  className="form-style"
                  value={editQuestion.question_title}
                  onChange={handleTitleChange}
                  id="logemail"
                  autoComplete="off"
                />
                <i className="fa fa-question icon fa-lg" style={{ marginLeft : '7px', color: 'black'}}></i>
              </div>
            </div>
              <div className="input-container mt-3">
                <textarea
                  name="logemail"
                  className="form-style"
                  value={editQuestion.question}
                  onChange={handleQuestionChange}
                  id="logemail"
                  autoComplete="off"
                />
                <i className="fa fa-list-alt icon" style={{ marginLeft : '6px', color: 'black'}}></i>
            </div>
            <button type='submit' className="btn mt-4" style={{ color : 'black', backgroundColor: '#c4c3ca'}}>Save</button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default EditFormQue;
