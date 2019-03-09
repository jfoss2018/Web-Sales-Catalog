import React, { Component } from 'react';
import axios from 'axios';
import MaskedInput from 'react-text-mask';
import { validate } from '../validate.js';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: null,
      password: null,
      registerName: null,
      registerPassword: null,
      registerCPassword: null,
      registerPhone: null,
      registerEmail: null,
      resStatus: null,
      resMessage: null
    }
    this.loginForm = React.createRef();
    this.registerForm = React.createRef();
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  componentWillMount() {
    axios({
      method: 'get',
      url: '/api/v1/login',
      /*proxy: {
        host: '127.0.0.1',
        port: 3001
      },*/
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
      if (response.status === 200) {
        if (response.data.message === 'Please forward.') {
          this.props.browserPath('/dashboard');
        }
      } else {
        this.setState({
          resStatus: '500',
          resMessage: 'Something went wrong!'
        });
        this.openModalMessage();
      }
    })
    .catch((error) => {
      console.log(error);
      this.setState({
        resStatus: error.response.status.toString(),
        resMessage: error.response.data.message.toString()
      });
      this.openModalMessage();
    });
  }

  login = () => {
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
        password: this.state.password
      }
    })
    .then(response => {
      if (response.status === 200) {
        this.props.browserPath('/dashboard');
      } else {
        this.setState({
          resStatus: '500',
          resMessage: 'Something went wrong!'
        });
        this.openModalMessage();
      }
    })
    .catch((error) => {
      console.log(error);
      this.setState({
        resStatus: error.response.status.toString(),
        resMessage: error.response.data.message.toString()
      });
      this.openModalMessage();
    });
  }

  register = () => {
    axios({
      method: 'post',
      url: '/api/v1/register',
      /*proxy: {
        host: '127.0.0.1',
        port: 3001
      },*/
      headers: {
        'Content-Type': 'application/json'
      },
      data: {
        username: this.state.registerName,
        password: this.state.registerPassword,
        email: this.state.registerEmail,
        phone: this.state.registerPhone
      }
    })
    .then(response => {
      this.openModalSecondary();
      this.setState({
        registerName: '',
        registerPassword: '',
        registerCPassword: '',
        registerPhone: '',
        registerEmail: '',
        resStatus: '201',
        resMessage: 'You will be able to log in once the admin has confirmed your authorization level.'
      });
      this.openModalMessage();
    })
    .catch((error) => {
      console.log(error);
      this.setState({
        resStatus: error.response.status.toString(),
        resMessage: error.response.data.message.toString()
      });
      this.openModalMessage();
    });
  }

  // This function determines which form is being submited.
  handleSubmit = (e) => {
    e.preventDefault();
    if (e.target.name === 'login') {
      this.login();
    } else if (e.target.name === 'register') {
      // Register Form validation.
      if (validate(this.registerForm)) {
        this.register();
      }
    }
  }

  // This function opens the register modal window.
  openModalSecondary = (e) => {
    const registerBtn = document.querySelector('.init-login-register-btn');
    registerBtn.style.color = '#551a8b';
    const modal = document.querySelector('.init-login-modal');
    modal.style.display = 'block';
    if (e) {
      if (e.target.className === 'init-login-modal-close' || e.target === modal) {
        this.modalClose(modal);
      }
    } else {
      this.modalClose(modal);
    }
  }

  // This function opens the message modal window.
  openModalMessage = (e) => {
    const modal = document.querySelector('.init-message-modal');
    modal.style.display = 'block';
    if (e) {
      if (e.target.className === 'init-login-modal-close' || e.target === modal) {
        this.modalClose(modal);
      }
    }
  }

  modalClose = (modal) => {
    modal.style.display = 'none';
    if (modal.classList.contains('init-login-modal')) {
      this.registerForm[0].value = '';
      this.registerForm[1].value = '';
      this.registerForm[2].value = '';
      this.registerForm[3].value = '';
      this.registerForm[4].value = '';
    }
  }

  render() {
    let modalContents;
    if (this.state.resStatus) {
      const modalBG = document.querySelector('.init-message-modal-content');
      if (this.state.resStatus === '201') {
        modalBG.classList.remove('fail');
        modalBG.classList.add('success');
        modalContents = <section>
          <h5 className="init-message-title">Thank you for Registering!</h5>
          <p className="init-message-form-control">{this.state.resMessage}</p>
        </section>
      } else if (this.state.resStatus === '401') {
        modalBG.classList.add('fail');
        modalContents = <section>
          <h5 className="init-message-title">Error: 401, Unauthorized</h5>
          <p className="init-message-form-control">{this.state.resMessage}</p>
        </section>
      } else if (this.state.resStatus === '409') {
        modalBG.classList.add('fail');
        modalContents = <section>
          <h5 className="init-message-title">Error: 409, Conflict</h5>
          <p className="init-message-form-control">{this.state.resMessage}</p>
        </section>
      } else if (this.state.resStatus === '500') {
        modalBG.classList.add('fail');
        modalContents = <section>
          <h5 className="init-message-title">{this.state.resStatus}</h5>
          <p className="init-message-form-control">{this.state.resMessage}</p>
        </section>
      }
    }

    return (
      <div className="init-login-wrapper">
        <div>
          {/*===============Login Form==============*/}
          <form ref={form => this.loginForm = form} className="init-login-form" noValidate>
            <h5 className="init-login-title">Login</h5>
            <hr className="init-login-hr" />
            <label className="init-login-form-control" htmlFor="username">Username</label>
            <input className="init-login-form-control" type="text" name="username" id="username" onChange={this.handleChange} />
            <label className="init-login-form-control" htmlFor="password">Password</label>
            <input className="init-login-form-control" type="password" name="password" id="password" onChange={this.handleChange} />
            <hr className="init-login-hr-2" />
            <button className="init-login-form-control init-login-btn" name="login" type="button" onClick={this.handleSubmit}>Let's Go!</button>
            <p className="init-register">Register <button type="button" onClick={this.openModalSecondary} className="init-login-register-btn">here</button> as a new user.</p>
          </form>
          {/*============Login Form End=============*/}

          {/*===========Register Form============*/}
          <form ref={form => this.registerForm = form} className="init-login-form" noValidate>
            {/*==============Modal===================*/}
            <div onClick={this.openModalSecondary} className="init-login-modal">
              <div className="init-login-modal-content">
                <span onClick={this.openModalSecondary} className="init-login-modal-close">&times;</span>
                <section>
                  <h5 className="init-login-title">Register</h5>
                  <hr className="init-login-hr" />
                  <div className="form-group">
                    <label className="init-login-form-control" htmlFor="registerName">Username</label>
                    <input className="init-login-form-control" type="text" required minLength="4" maxLength="28" name="registerName" id="registerName" onChange={this.handleChange} />
                    <span className="invalid-feedback"></span>
                  </div>
                  <div className="form-group">
                    <label className="init-login-form-control" htmlFor="registerPassword">Password</label>
                    <input className="init-login-form-control" data-category="password" required minLength="4" type="password" name="registerPassword" id="registerPassword" onChange={this.handleChange} />
                    <span className="invalid-feedback"></span>
                  </div>
                  <div className="form-group">
                    <label className="init-login-form-control" htmlFor="registerCPassword">Confirm Password</label>
                    <input className="init-login-form-control" data-category="cPassword" required minLength="4" type="password" name="registerCPassword" id="registerCPassword" onChange={this.handleChange} />
                    <span className="invalid-feedback c-pass"></span>
                  </div>
                  <div className="form-group">
                    <label className="init-login-form-control" htmlFor="registerPhone">Phone</label>
                    <MaskedInput
                    mask={['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
                    id="registerPhone"
                    name="registerPhone"
                    className="init-login-form-control"
                    onChange={this.handleChange}
                    required
                    data-category="phone"
                    type="text"
                    />
                    <span className="invalid-feedback phone-val"></span>
                  </div>
                  <div className="form-group">
                    <label className="init-login-form-control" htmlFor="registerEmail">Email</label>
                    <input className="init-login-form-control" data-category="email" required type="email" name="registerEmail" id="registerEmail" onChange={this.handleChange} />
                    <span className="invalid-feedback email-val"></span>
                  </div>
                  <hr className="init-login-hr-2" />
                  <button className="init-login-form-control init-login-btn" name="register" type="button" onClick={this.handleSubmit}>Submit</button>
                </section>
              </div>
            </div>
            {/*=============Modal End===============*/}
          </form>
          {/*=============Register Form End================*/}

          {/*==============Message Modal============*/}
          <div onClick={this.openModalMessage} className="init-message-modal">
            <div className="init-message-modal-content">
              <span onClick={this.openModalMessage} className="init-login-modal-close">&times;</span>
              {(this.state.resStatus) && (
                modalContents
              )}
            </div>
          </div>
          {/*============Message Modal End==========*/}
        </div>
      </div>
    );
  }
}

export default Login;
