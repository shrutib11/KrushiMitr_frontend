import React, { useState } from 'react';
import '../../assets/css/profile.css'
import EditFormQue from '../Profiles/EditFormQue';
import { Helmet } from 'react-helmet';
import Modal from '../../Modal';

const MyQuestionItem = ({ question }) => {

  const [formView, setFormView] = useState(true);
  const [ques, setQuestion] = useState(question);
  const [isEditing, setEditing] = useState(false);
  const [editQuestion, seteditQuestion] = useState({
    question: ques.question,
    question_title: ques.question_title,
    question_id: ques.question_id
  });

  const handleToggleEdit = () => {
    console.log("Edit button clicked");
    setEditing(!isEditing);
  };

  const handleTitleChange = (e) => {
    seteditQuestion((prevState) => ({ ...prevState, question_title: e.target.value }));
  };

  const handleQuestionChange = (e) => {
    seteditQuestion((prevState) => ({ ...prevState, question: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('/api/edit-question', {
      method: 'POST',
      body: JSON.stringify(editQuestion),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    var msg;
    const json = await response.json();
    if (!response.ok) {
      msg = json.error;
    }
    else {
      msg = json;
      if (msg !== '') {
        msg = "Question has been Updated Successfully"
      }
    }
    // alert(msg);
    const newData = await fetch('/api/specific-question?question_id=' + ques.question_id);
    if (!newData.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await newData.json();
    setQuestion(data);
    setEditing(!isEditing);
  };

  return (
    <>
      <Helmet>
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" />
                <link rel="stylesheet" href="https://unpkg.com/bootstrap@5.3.2/dist/css/bootstrap.min.css" />
      </Helmet>
      {isEditing ? (
        <Modal onClose={handleToggleEdit}>
          <EditFormQue
          editQuestion={editQuestion}
          handleTitleChange={handleTitleChange}
          handleQuestionChange={handleQuestionChange}
          handleSubmit={handleSubmit}
        />
        </Modal>
      ) : (
        <div className="m-3 content-card">
          <div className="card-big-shadow">
            <div className="card card-just-text" data-background="color" data-color="grey" data-radius="none">
              <div style={{ backgroundColor: 'rgba(133, 162, 125, 0.4)', position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}></div>
              <div className="content" style={{ position: 'relative', zIndex: 1 }}>
                <h6 className="category" style={{ color: 'grey' }}>{ques.question_title}</h6>
                <p className="description" style={{ color: 'grey' }}>{ques.question}</p>
              </div>

            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <button className="edit-icon" onClick={handleToggleEdit} style={{border: 'none', backgroundColor: '#D8D8D8', borderRadius: '3px', padding: '2px 10px'}}>
              <i className="fa fa-pencil-square-o fa-lg"></i>
              <span style={{ marginLeft: '10px', verticalAlign: 'middle', fontSize : '16px', fontWeight: '500' }}>EDIT</span>
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default MyQuestionItem;
