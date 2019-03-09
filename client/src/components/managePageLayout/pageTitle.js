import React, { Component } from 'react';
import axios from 'axios';
import { validate } from '../../validate.js';

class PageTitle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: null,
      showTitle: false,
      title: ''
    }

    this.titleForm = React.createRef();
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
        showTitle: response.data.page.showTitle,
        title: response.data.page.title || ''
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
    if (validate(this.titleForm)) {
      const dataObj = {};                                                                  
      dataObj.showTitle = this.state.showTitle
      if (this.state.showTitle) {
        dataObj.title = this.state.title
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
          resMessage: 'Title Updated!'
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
    // Input Field =============================================================
    let titleInput;
    if (this.state.showTitle === true) {
      titleInput = <input className="login-form-control" maxLength="23" value={this.state.title} name="title" id="title" onChange={this.handleChange} />
    } else {
      titleInput = <input className="login-form-control" disabled value={this.state.title} name="title" id="title" onChange={this.handleChange} />
    }

    return (
      <form ref={form => this.titleForm = form} noValidate className="login-form" onSubmit={this.handleSubmit}>
        <h1 className="login-title">Page Title</h1>
        {/*=========Show Title Checkbox==========*/}
        <div className="form-group">
          <label className="login-form-control" htmlFor="showTitle">Show Title</label>
          <input type="checkbox" value={this.state.showTitle} className="checkbox" checked={this.state.showTitle} name="showTitle" id="showTitle" onChange={this.handleChange} />
          <span className="invalid-feedback"></span>
        </div>
        {/*=======Title===========================*/}
        <div className="form-group">
          <label className="login-form-control disp-blk" htmlFor="title">Title</label>
          {titleInput}
          <span className="invalid-feedback"></span>
        </div>
        {/*===========Save=======================*/}
        <button className="login-form-control" type="submit">Save</button>
      </form>
    );
  }
}

export default PageTitle;
