import React from 'react';

const QuestionItem = (props) => {
  let displayQuestion;
  if (props.questionInfo.question.length > 44) {
    displayQuestion = props.questionInfo.question.slice(0, 43) + ' ...';
  } else {
    displayQuestion = props.questionInfo.question;
  }

  return (
    <tr className="user-data-row">
      <td hidden>{props.questionInfo._id}</td>
      <td>{props.record + 1}</td>
      <td>{displayQuestion}</td>
      <td>{props.questionInfo.content.name}</td>
      <td>{(props.questionInfo.answer.answer) ? 'Yes' : 'No'}</td>
    </tr>
  );
}

export default QuestionItem;
