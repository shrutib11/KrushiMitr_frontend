import React from 'react';
import '../../assets/css/editform.css';
import { Helmet } from 'react-helmet';

const EditFormQue = ({ editAnswer, handleQuestionChange, handleSubmit }) => {
  return (
    <form onSubmit={handleSubmit} className='m-auto mt-5'>
      <Helmet>
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" />
                <link rel="stylesheet" href="https://unpkg.com/bootstrap@5.3.2/dist/css/bootstrap.min.css" />
      </Helmet>
      <div className="card-front">
        <div className="center-wrap">
          <div className="section text-center">
              <div className="input-container mt-3">
                <textarea
                  name="logemail"
                  className="form-style"
                  value={editAnswer.ans}
                  onChange={handleQuestionChange}
                  id="logemail"
                  autoComplete="off"
                  style={{ color : 'black'}}
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
