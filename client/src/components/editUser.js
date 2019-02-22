import React, { Component } from 'react';
import axios from 'axios';

class EditUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: null,
      username: null,
      email: null,
      phone: null,
      authorization: null
    }

    this.editForm = React.createRef();
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  componentWillUpdate() {

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
        username: response.data.user.username,
        email: response.data.user.email,
        phone: response.data.user.phone,
        authorization: response.data.user.authorization
      });
    })
    .catch((error) => {
      console.log(error);
    });
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

      this.editForm[0].value = '';
      this.editForm[1].value = '';
      this.editForm[2].value = '';
      this.editForm[3].value = '';

      this.setState({
        id: '',
        username: '',
        email: '',
        phone: '',
        authorization: ''
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
      <form ref={form => this.editForm = form} className="login-form" onSubmit={this.handleSubmit}>
        <h1 className="login-title">Edit User</h1>
        <label className="login-form-control" htmlFor="username">Name</label>
        <input className="login-form-control" placeholder={this.state.username} disabled name="username" id="username" onChange={this.handleChange} />
        <label className="login-form-control" htmlFor="email">Email</label>
        <input className="login-form-control" placeholder={this.state.email} name="email" id="email" onChange={this.handleChange} />
        <label className="login-form-control" htmlFor="phone">Phone</label>
        <input className="login-form-control" placeholder={this.state.phone} name="phone" id="phone" onChange={this.handleChange} />
        <label className="login-form-control" htmlFor="authorization">Authorization</label>
        <input className="login-form-control" placeholder={this.state.authorization} name="authorization" id="authorization" onChange={this.handleChange} />
        <button className="login-form-control" type="submit">Save</button>
      </form>
    );
  }
}

export default EditUser;
