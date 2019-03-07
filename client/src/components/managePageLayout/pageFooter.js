import React, { Component } from 'react';
import axios from 'axios';
import { validate } from '../../validate.js';

class PageFooter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: null,
      footer: false,
      message: ''
    }

    this.footerForm = React.createRef();
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

  componentDidMount() {
    axios({
      method: 'get',
      url: `/api/v1/page`,
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
        id: response.data.page._id,
        footer: response.data.page.footer,
        message: response.data.page.message
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
    if (validate(this.footerForm)) {
      const dataObj = {};
      dataObj.footer = this.state.footer
      if (this.state.footer) {
        dataObj.message = this.state.message
      }
      axios({
        method: 'put',
        url: `/api/v1/page/${this.state.id}`,
        /*proxy: {
          host: '127.0.0.1',
          port: 3001
        },*/
        headers: {
          'Content-Type': 'application/json'
        },
        data: dataObj
      })
      .then(response => {
        this.props.updateState({
          resStatus: '204',
          resMessage: 'Footer Updated!'
        });
        this.props.closeModal('close');
        this.props.openModal();
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
    // Footer Message Input ====================================================
    let messageInput;
    if (this.state.footer === true) {
      messageInput = <input className="login-form-control" maxLength="30" value={this.state.message} name="message" id="message" onChange={this.handleChange} />
    } else {
      messageInput = <input className="login-form-control" disabled value={this.state.message} name="message" id="message" onChange={this.handleChange} />
    }

    return (
      <form ref={form => this.footerForm = form} noValidate className="login-form" onSubmit={this.handleSubmit}>
        <h1 className="login-title">Page Footer</h1>
        {/*=============Show Footer=============*/}
        <div className="form-group">
          <label className="login-form-control" htmlFor="footer">Show Footer</label>
          <input type="checkbox" value={this.state.footer} className="checkbox" checked={this.state.footer} name="footer" id="footer" onChange={this.handleChange} />
          <span className="invalid-feedback"></span>
        </div>
        {/*============Footer Message=============*/}
        <div className="form-group">
          <label className="login-form-control disp-blk" htmlFor="message">Footer Content</label>
          {messageInput}
          <span className="invalid-feedback"></span>
        </div>
        {/*============Save======================*/}
        <button className="login-form-control" type="submit">Save</button>
      </form>
    );
  }
}

export default PageFooter;
