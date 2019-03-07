import React, { Component } from 'react';
import axios from 'axios';

class DeleteBid extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: null,
      bidName: null,
      item: null,
      contentId: null
    }
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
        id: response.data.bid._id,
        bidName: response.data.bid.name,
        item: response.data.bid.content.name,
        contentId: response.data.bid.content._id
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
      url: `/api/v1/contents/${this.state.contentId}/bids/${this.state.id}`,
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
        resMessage: 'Bid Deleted!'
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
      /*===========Bid Delete Form=============*/
      <form ref={form => this.deleteForm = form} className="login-form" onSubmit={this.handleSubmit}>
        <h1 className="login-title">Delete Bid</h1>
        <p className="login-title">Are you sure you want to delete this bid by {this.state.bidName} on {this.state.item}?</p>
        <button className="login-form-control" type="submit">Yes</button>
        <button className="login-form-control" onClick={this.cancel}>No</button>
      </form>
      /*========End Bid Delete Form============*/
    );
  }
}

export default DeleteBid;
