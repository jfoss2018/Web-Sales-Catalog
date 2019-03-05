import React, { Component } from 'react';
import axios from 'axios';

class DeleteUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: null,
      username: null
    }
  }

  componentDidMount() {
    axios({
      method: 'get',
      url: `/api/v1/users/${this.props.id}`,
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
        id: response.data.user._id,
        username: response.data.user.username
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
      url: `/api/v1/users/${this.state.id}`,
      /*proxy: {
        host: '127.0.0.1',
        port: 3001
      },*/
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
      this.props.updateState({
        resStatus: '204',
        resMessage: 'User Deleted!'
      });
      if (this.props.updateList) {
        this.props.updateList();
      }
      this.setState({
        id: '',
        username: ''
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

  render() {
    return (
      /*===========User Delete Form==========*/
      <form ref={form => this.deleteForm = form} className="login-form" onSubmit={this.handleSubmit}>
        <h1 className="login-title">Delete User</h1>
        <p className="login-title">Are you sure you want to delete {this.state.username}?</p>
        <button className="login-form-control" type="submit">Yes</button>
        <button className="login-form-control" onClick={this.cancel}>No</button>
      </form>
      /*=========End User Delete Form==========*/
    );
  }
}

export default DeleteUser;
