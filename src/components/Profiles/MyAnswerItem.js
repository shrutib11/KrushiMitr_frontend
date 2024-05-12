import React, { useState } from 'react';
import EachAnswerItem from './EachAnswerItem';
const MyAnswerItem = ({ question }) => {
  return (
    <>{question.answer.map((answer) => <EachAnswerItem answer={answer} question={question} key={answer.answer_id} />)}</>
  );
};
export default MyAnswerItem;