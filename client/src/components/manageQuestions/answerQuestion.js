import React, { Component } from 'react';
import axios from 'axios';

class AnswerQuestion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: null,
      question: null,
      item: null,
      contentId: null,
      answer: ''
    }
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  componentDidMount() {
    axios({
      method: 'get',
      url: `/api/v1/contents/questions/${this.props.id}`,
      /*proxy: {
        host: '127.0.0.1',
        port: 3001
      },*/
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
      this.setState({
        id: response.data.question._id,
        question: response.data.question.question,
        item: response.data.question.content.name,
        contentId: response.data.question.content._id,
        answer: response.data.question.answer.answer
      });
    })
    .catch((error) => {
      console.log(error);
      this.props.updateState({
        resStatus: error.response.status.toString(),
        resMessage: error.response.data.message.toString()
      });
      this.props.openModal();
    });
  }

  updateState = (obj) => {
    this.setState(obj);
  }

  handleSubmit = (e) => {
    e.preventDefault();
    axios({
      method: 'put',
      url: `/api/v1/contents/${this.state.contentId}/questions/${this.state.id}/answer`,
      /*proxy: {
        host: '127.0.0.1',
        port: 3001
      },*/
      headers: {
        'Content-Type': 'application/json'
      },
      data: {
        answer: this.state.answer
      }
    })
    .then(response => {
      this.props.updateState({
        resStatus: '204',
        resMessage: 'Question Answered!'
      });
      if (this.props.updateList) {
        this.props.updateList();
      }
    })
    .catch((error) => {
      console.log(error);
      this.props.updateState({
        resStatus: error.response.status.toString(),
        resMessage: error.response.data.message.toString()
      });
      this.props.openModal();
    });
  }

  render() {
    return (
      /*===========Answer Question Form=============*/
      <form ref={form => this.answerForm = form} className="login-form" onSubmit={this.handleSubmit}>
        <h1 className="login-title">Answer Question</h1>
        <p className="login-title">Answer the following question about {this.state.item}.</p>
        <p className="login-title">"{this.state.question}"</p>
        <textarea className="textarea-form-control" rows="4" name="answer" value={this.state.answer} id="answer" onChange={this.handleChange}></textarea>
        <button className="login-form-control mt-1" type="submit">Submit</button>
      </form>
      /*=========End Answer Question Form===========*/
    );
  }
}

export default AnswerQuestion;
