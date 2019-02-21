import React, { Component } from 'react';
import axios from 'axios';

class PageTitle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: null,
      showTitle: false,
      title: null
    }

    this.editForm = React.createRef();
  }

  handleChange = (e) => {
    if (e.target.type === 'checkbox') {
      if (e.target.checked === true) {
        e.target.value = Boolean(true);
      } else {
        e.target.value = Boolean(false);
      }
      const bool = (e.target.value === 'true');
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
      /*
      this.loginForm[0].value = '';
      this.loginForm[1].value = '';
      this.loginForm[2].value = '';
      this.loginForm[3].value = '';
      */

      this.setState({
        id: response.data.page._id,
        showTitle: response.data.page.showTitle,
        title: response.data.page.title
      });

    })
    .catch((error) => {
      console.log(error);
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
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
      /*
      this.editForm[0].value = '';
      this.editForm[1].value = '';
      this.editForm[2].value = '';
      this.editForm[3].value = '';

      this.setState({
        id: '',
        username: '',
        email: '',
        phone: '',
        authorization: ''
      });

      if (this.props.updateList) {
        this.props.updateList();
      }
      */
      this.props.closeModal('close');
    })
    .catch((error) => {
      console.log(error);
    });
  }

  render() {
    let titleInput;
    if (this.state.showTitle === true) {
      titleInput = <input className="login-form-control" placeholder={this.state.title} name="title" id="title" onChange={this.handleChange} />
    } else {
      titleInput = <input className="login-form-control" disabled placeholder={this.state.title} name="title" id="title" onChange={this.handleChange} />
    }

    return (
      <form ref={form => this.editForm = form} className="login-form" onSubmit={this.handleSubmit}>
        <h1 className="login-title">Page Title</h1>
        <label className="login-form-control" htmlFor="showTitle">Show Title</label>
        <input type="checkbox" value={this.state.showTitle} className="checkbox" checked={this.state.showTitle} name="showTitle" id="showTitle" onChange={this.handleChange} />
        <label className="login-form-control disp-blk" htmlFor="title">Title</label>
        {titleInput}
        <button className="login-form-control" type="submit">Save</button>
      </form>
    );
  }
}

export default PageTitle;
