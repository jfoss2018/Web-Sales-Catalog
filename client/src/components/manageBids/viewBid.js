import React, { Component } from 'react';
import axios from 'axios';
import moment from 'moment';

class ViewBid extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      phone: '',
      amount: '',
      preference: '',
      bidDate: '',
      content: '',
      contentId: '',
      viewed: false
    }

    this.viewForm = React.createRef();
  }

  componentDidMount() {
    axios({
      method: 'get',
      url: `/api/v1/contents/bids/${this.props.id}`,
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
        name: response.data.bid.name,
        email: response.data.bid.email,
        phone: response.data.bid.phone,
        amount: response.data.bid.amount,
        preference: response.data.bid.preference,
        bidDate: moment.utc(response.data.bid.bidDate).toDate(),
        content: response.data.bid.content.name,
        contentId: response.data.bid.content._id,
        viewed: response.data.bid.viewed
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
      url: `/api/v1/contents/${this.state.contentId}/bids/${this.props.id}`,
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
        resMessage: 'Bid Updated!'
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
      /*=============Bid View Form=================*/
      <form ref={form => this.viewForm = form} className="login-form form-grid col-1" onSubmit={this.handleSubmit}>
        <h1 className="login-title">Bid Details</h1>
        {/*===========Bid Name======================*/}
        <label className="login-form-control" htmlFor="name">Name</label>
        <input className="login-form-control" disabled readOnly type="text" name="name" value={this.state.name} id="name" onChange={this.handleChange} />
        {/*===========Bid Email=====================*/}
        <label className="login-form-control" htmlFor="email">Email</label>
        <input className="login-form-control" disabled readOnly type="text" name="email" value={this.state.email} id="email" onChange={this.handleChange} />
        {/*===========Bid Phone=====================*/}
        <label className="login-form-control" htmlFor="phone">Phone</label>
        <input className="login-form-control" disabled readOnly type="text" name="phone" value={this.state.phone} id="phone" />
        {/*===========Bid Contact Preference========*/}
        <label className="login-form-control" htmlFor="preference">Contact Preference</label>
        <input className="login-form-control" disabled readOnly type="text" name="preference" value={this.state.preference} id="preference" />
        {/*===========Bid Date======================*/}
        <label className="login-form-control" htmlFor="bidDate">Bid Date</label>
        <input className="login-form-control" disabled readOnly type="text" name="bidDate" value={moment(this.state.bidDate).format('LLL')} id="bidDate" />
        {/*===========Bid Amount====================*/}
        <label className="login-form-control" htmlFor="amount">Bid Amount</label>
        <input className="login-form-control" disabled readOnly type="text" name="amount" value={this.state.amount} id="amount" onChange={this.handleChange} />
        {/*===========Bid Item======================*/}
        <label className="login-form-control" htmlFor="content">Bid Item</label>
        <input className="login-form-control" disabled readOnly type="text" name="content" value={this.state.content} id="content" onChange={this.handleChange} />
        {/*===========Mark Viewed===================*/}
        <label className="login-form-control" htmlFor="viewed">Mark Viewed</label>
        <input type="checkbox" value={this.state.viewed} className="checkbox" checked={this.state.viewed} name="viewed" id="viewed" onChange={this.handleChange} />
        {/*===========Save==========================*/}
        <button className="login-form-control mt-1" type="submit">Save</button>
      </form>
      /*===========End Bid View Form===============*/
    );
  }
}

export default ViewBid;
