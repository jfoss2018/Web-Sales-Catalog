import React, { Component } from 'react';
import axios from 'axios';

class DeleteQuestion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: null,
      question: null,
      item: null,
      contentId: null
    }
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
      /*
      this.loginForm[0].value = '';
      this.loginForm[1].value = '';
      this.loginForm[2].value = '';
      this.loginForm[3].value = '';
      */

      this.setState({
        id: response.data.question._id,
        question: response.data.question.question,
        item: response.data.question.content.name,
        contentId: response.data.question.content._id
      });
    })
    .catch((error) => {
      console.log(error);
    });
  }

  cancel = (e) => {
    e.preventDefault();
    if (this.props.updateList) {
      this.props.updateList();
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    axios({
      method: 'delete',
      url: `/api/v1/contents/${this.state.contentId}/questions/${this.state.id}`,
      /*proxy: {
        host: '127.0.0.1',
        port: 3001
      },*/
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
      /*
      this.editForm[0].value = '';
      this.editForm[1].value = '';
      this.editForm[2].value = '';
      this.editForm[3].value = '';
      */
      this.setState({
        id: '',
        username: '',
        item: '',
        contentId: ''
      });

      if (this.props.updateList) {
        this.props.updateList();
      }
    })
    .catch((error) => {
      console.log(error);
    });
  }

  render() {
    return (
      <form ref={form => this.deleteForm = form} className="login-form" onSubmit={this.handleSubmit}>
        <h1 className="login-title">Delete Question</h1>
        <p className="login-title">Are you sure you want to delete the following question about {this.state.item}?</p>
        <p className="login-title">"{this.state.question}"</p>
        <button className="login-form-control" type="submit">Yes</button>
        <button className="login-form-control" onClick={this.cancel}>No</button>
      </form>
    );
  }
}

export default DeleteQuestion;
