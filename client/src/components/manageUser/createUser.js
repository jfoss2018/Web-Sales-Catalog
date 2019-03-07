import React, { Component } from 'react';
import axios from 'axios';
import MaskedInput from 'react-text-mask';
import { validate } from '../../validate.js';

class CreateUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: null,
      password: null,
      email: null,
      phone: null,
      authorization: '0'
    }

    this.newUserForm = React.createRef();
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    if (validate(this.newUserForm)) {
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
        this.props.updateState({
          resStatus: '201',
          resMessage: 'User Created!'
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
  }

  render() {
    return (
      /*===========Create New User Form================*/
      <form ref={form => this.newUserForm = form} className="login-form" noValidate onSubmit={this.handleSubmit}>
        <h1 className="login-title">Create User</h1>
        {/*====Username=======*/}
        <div className="form-group">
          <label className="login-form-control" htmlFor="username">Name</label>
          <input className="login-form-control" type="text" required minLength="4" maxLength="28" name="username" id="username" onChange={this.handleChange} />
          <span className="invalid-feedback"></span>
        </div>
        {/*=====Password======*/}
        <div className="form-group">
          <label className="login-form-control" htmlFor="password">Password</label>
          <input className="login-form-control" type="password" required minLength="4" name="password" id="password" onChange={this.handleChange} />
          <span className="invalid-feedback"></span>
        </div>
        {/*=====Email=========*/}
        <div className="form-group">
          <label className="login-form-control" htmlFor="email">Email</label>
          <input className="login-form-control" data-category="email" type="email" required name="email" id="email" onChange={this.handleChange} />
          <span className="invalid-feedback email-val"></span>
        </div>
        {/*======Phone========*/}
        <div className="form-group">
          <label className="login-form-control" htmlFor="phone">Phone</label>
          <MaskedInput
          mask={['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
          id="phone"
          name="phone"
          className="login-form-control form-input"
          onChange={this.handleChange}
          required
          data-category="phone"
          type="tel"
          />
          <span className="invalid-feedback phone-val"></span>
        </div>
        {/*====Authorization====*/}
        <div className="form-group form-grid col-2">
          <label className="login-form-control" htmlFor="authorization">Authorization</label>
          <select className="a a2" id="authorization" required name="authorization" onChange={this.handleChange}>
            <option value="0">0</option>
            <option value="1">1</option>
            <option value="2">2</option>
          </select>
          <span className="invalid-feedback"></span>
        </div>
        {/*======Submit=========*/}
        <button className="login-form-control mt-1" type="submit">Save</button>
      </form>
      /*==========End Create New User Form===================*/
    );
  }
}

export default CreateUser;
