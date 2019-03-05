import React, { Component } from 'react';
import axios from 'axios';
import MaskedInput from 'react-text-mask';
import { validate } from '../../validate.js';

class EditUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: null,
      username: '',
      email: '',
      phone: '',
      authorization: null
    }

    this.editForm = React.createRef();
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
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
        username: response.data.user.username,
        email: response.data.user.email,
        phone: response.data.user.phone,
        authorization: response.data.user.authorization
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

  handleSubmit = (e) => {
    e.preventDefault();
    if (validate(this.editForm)) {
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
        this.props.updateState({
          resStatus: '204',
          resMessage: 'User Updated!'
        });
        if (this.props.updateList) {
          this.props.updateList();
        }
        this.setState({
          id: '',
          username: '',
          email: '',
          phone: '',
          authorization: ''
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
  }

  render() {
    // Selects value of the select tag to match state.
    const select = document.querySelector('#authorization');
    if (select) {
      const selectItems = select.childNodes;
      for (let i = 0; i < selectItems.length; i += 1) {
        selectItems[i].selected = false;
        if (parseInt(this.state.authorization) === parseInt(selectItems[i].value)) {
          selectItems[i].selected = true;
        }
      }
    }

    return (
      /*=================Edit Form=================*/
      <form ref={form => this.editForm = form} className="login-form" noValidate onSubmit={this.handleSubmit}>
        <h1 className="login-title">Edit User</h1>
        {/*=========Username============*/}
        <div className="form-group">
          <label className="login-form-control" htmlFor="username">Name</label>
          <input className="login-form-control" value={this.state.username} type="text" disabled name="username" id="username" onChange={this.handleChange} />
          <span className="invalid-feedback"></span>
        </div>
        {/*==========Email==============*/}
        <div className="form-group">
          <label className="login-form-control" htmlFor="email">Email</label>
          <input className="login-form-control" value={this.state.email} required type="email" data-category="email" minLength="4" name="email" id="email" onChange={this.handleChange} />
          <span className="invalid-feedback email-val"></span>
        </div>
        {/*==========Phone==============*/}
        <div className="form-group">
          <label className="login-form-control" htmlFor="phone">Phone</label>
          <MaskedInput
          mask={['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
          id="phone"
          name="phone"
          className="login-form-control form-input"
          onChange={this.handleChange}
          value={this.state.phone}
          required
          data-category="phone"
          type="tel"
          />
          <span className="invalid-feedback phone-val"></span>
        </div>
        {/*=========Authorization=======*/}
        <div className="form-group form-grid col-2">
          <label className="login-form-control" htmlFor="authorization">Authorization</label>
          <select className="a a2" id="authorization" required name="authorization" onChange={this.handleChange}>
            <option value="0">0</option>
            <option value="1">1</option>
            <option value="2">2</option>
          </select>
          <span className="invalid-feedback"></span>
        </div>
        {/*===========Submit=============*/}
        <button className="login-form-control mt-1" type="submit">Save</button>
      </form>
      /*================End Edit Form============*/
    );
  }
}

export default EditUser;
