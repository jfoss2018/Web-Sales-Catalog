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
      /*
      this.loginForm[0].value = '';
      this.loginForm[1].value = '';
      this.loginForm[2].value = '';
      this.loginForm[3].value = '';
      */

      this.setState({
        id: response.data.user._id,
        username: response.data.user.username
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
      method: 'put',
      url: `/api/v1/users/${this.state.id}`,
      /*proxy: {
        host: '127.0.0.1',
        port: 3001
      },*/
      headers: {
        'Content-Type': 'application/json'
      },
      data: {
        email: this.state.email,
        phone: this.state.phone,
        authorization: this.state.authorization
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
        username: ''
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
        <h1 className="login-title">Delete User</h1>
        <p className="login-title">Are you sure you want to delete {this.state.username}?</p>
        <button className="login-form-control" type="submit">Yes</button>
        <button className="login-form-control" onClick={this.cancel}>No</button>
      </form>
    );
  }
}

export default DeleteUser;
