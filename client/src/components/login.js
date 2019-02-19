import React, { Component } from 'react';
import axios from 'axios';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      username: null,
      password: null,
      email: null,
      phone: null
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
      url: '/api/v1/login',
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
        phone: this.state.phone
      }
    })
    .then(response => {

      this.loginForm[0].value = '';
      this.loginForm[1].value = '';
      this.loginForm[2].value = '';
      this.loginForm[3].value = '';

      this.setState({
        username: '',
        password: '',
        email: '',
        phone: ''
      });
    })
    .catch((error) => {
      console.log(error);
    });
  }

  render() {
    return (
      <form ref={form => this.loginForm = form} className="login-form" onSubmit={this.handleSubmit}>
        <label className="login-form-control" htmlFor="username">Name</label>
        <input className="login-form-control" name="username" id="username" onChange={this.handleChange} />
        <label className="login-form-control" htmlFor="password">Password</label>
        <input className="login-form-control" name="password" id="password" onChange={this.handleChange} />
        <label className="login-form-control" htmlFor="email">Email</label>
        <input className="login-form-control" name="email" id="email" onChange={this.handleChange} />
        <label className="login-form-control" htmlFor="phone">Phone</label>
        <input className="login-form-control" name="phone" id="phone" onChange={this.handleChange} />
        <button className="login-form-control" type="submit">Submit</button>
      </form>
    );
  }
}

export default Login;
