import React, { Component } from 'react';
import axios from 'axios';

class CreateUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: null,
      password: null,
      email: null,
      phone: null,
      authorization: null
    }

    this.loginForm = React.createRef();
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    axios({
      method: 'post',
      url: '/api/v1/users',
      /*proxy: {
        host: '127.0.0.1',
        port: 3001
      },*/
      headers: {
        'Content-Type': 'application/json'
      },
      data: {
        username: this.state.username,
        password: this.state.password,
        email: this.state.email,
        phone: this.state.phone,
        authorization: this.state.authorization
      }
    })
    .then(response => {

      this.loginForm[0].value = '';
      this.loginForm[1].value = '';
      this.loginForm[2].value = '';
      this.loginForm[3].value = '';
      this.loginForm[4].value = '';

      this.setState({
        username: '',
        password: '',
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
      <form ref={form => this.loginForm = form} className="login-form" onSubmit={this.handleSubmit}>
        <h1 className="login-title">{this.props.title}</h1>
        <label className="login-form-control" htmlFor="username">Name</label>
        <input className="login-form-control" name="username" id="username" onChange={this.handleChange} />
        <label className="login-form-control" htmlFor="password">Password</label>
        <input className="login-form-control" name="password" id="password" onChange={this.handleChange} />
        <label className="login-form-control" htmlFor="email">Email</label>
        <input className="login-form-control" name="email" id="email" onChange={this.handleChange} />
        <label className="login-form-control" htmlFor="phone">Phone</label>
        <input className="login-form-control" name="phone" id="phone" onChange={this.handleChange} />
        <label className="login-form-control" htmlFor="authorization">Authorization</label>
        <input className="login-form-control" name="authorization" id="authorization" onChange={this.handleChange} />
        <button className="login-form-control" type="submit">Save</button>
      </form>
    );
  }
}

export default CreateUser;
