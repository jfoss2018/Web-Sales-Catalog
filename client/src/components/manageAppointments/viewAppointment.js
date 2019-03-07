import React, { Component } from 'react';
import axios from 'axios';
import moment from 'moment';

class ViewAppointment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      phone: '',
      preference: '',
      postedDate: '',
      preferredDate: '',
      viewed: false
    }

    this.viewForm = React.createRef();
  }

  componentDidMount() {
    axios({
      method: 'get',
      url: `/api/v1/appointments/${this.props.id}`,
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
        name: response.data.appointment.name,
        email: response.data.appointment.email,
        phone: response.data.appointment.phone,
        preference: response.data.appointment.preference,
        postedDate: moment.utc(response.data.appointment.postedDate).toDate(),
        preferredDate: moment.utc(response.data.appointment.preferredDate).toDate(),
        viewed: response.data.appointment.viewed
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

  updateState = (object) => {
    this.setState(object);
  }

  handleChange = (e) => {
    if (e.target.type === 'checkbox') {
      const bool = (e.target.checked === true);
      this.setState({
        [e.target.name]: bool
      });
      return;
    }
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    axios({
      method: 'put',
      url: `/api/v1/appointments/${this.props.id}`,
      /*proxy: {
        host: '127.0.0.1',
        port: 3001
      },*/
      headers: {
        'Content-Type': 'application/json'
      },
      data: {
        viewed: this.state.viewed
      }
    })
    .then(response => {
      this.props.updateState({
        resStatus: '204',
        resMessage: 'Appointment Updated!'
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
      /*=================Appointment View Form================*/
      <form ref={form => this.viewForm = form} className="login-form form-grid col-1" onSubmit={this.handleSubmit}>
        <h1 className="login-title">Appointment Details</h1>
        {/*===========Appointment Name============================*/}
        <label className="login-form-control" htmlFor="name">Name</label>
        <input className="login-form-control" disabled readOnly type="text" name="name" value={this.state.name} id="name" onChange={this.handleChange} />
        {/*==========Appointment Email============================*/}
        <label className="login-form-control" htmlFor="email">Email</label>
        <input className="login-form-control" disabled readOnly type="text" name="email" value={this.state.email} id="email" onChange={this.handleChange} />
        {/*==========Appointment Phone============================*/}
        <label className="login-form-control" htmlFor="phone">Phone</label>
        <input className="login-form-control" disabled readOnly type="text" name="phone" value={this.state.phone} id="phone" />
        {/*==========Appointment Contact Preference===============*/}
        <label className="login-form-control" htmlFor="preference">Contact Preference</label>
        <input className="login-form-control" disabled readOnly type="text" name="preference" value={this.state.preference} id="preference" />
        {/*==========Appointment Created Date=====================*/}
        <label className="login-form-control" htmlFor="postedDate">Created Date</label>
        <input className="login-form-control" disabled readOnly type="text" name="postedDate" value={moment(this.state.postedDate).format('LLL')} id="postedDate" />
        {/*======Appointment Preferred Appointment Date===========*/}
        <label className="login-form-control" htmlFor="preferredDate">Preferred Appointment Date</label>
        <input className="login-form-control" disabled readOnly type="text" name="preferredDate" value={moment(this.state.preferredDate).format('LLL')} id="preferredDate" />
        {/*==========Mark Appointment Viewed======================*/}
        <label className="login-form-control" htmlFor="viewed">Mark Viewed</label>
        <input type="checkbox" value={this.state.viewed} className="checkbox" checked={this.state.viewed} name="viewed" id="viewed" onChange={this.handleChange} />
        {/*============Save==========================*/}
        <button className="login-form-control mt-1" type="submit">Save</button>
      </form>
      /*============End Appointment View Form===============*/
    );
  }
}

export default ViewAppointment;
