import React, { Component } from 'react';
import axios from 'axios';
import Edit from '../imageEdit.js';

class PageImage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: null,
      name: null,
      contentType: null,
      data: null,
      src: null,
      nameNew: null,
      contentTypeNew: null,
      dataNew: null
    }

    this.imageForm = React.createRef();
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
        name: response.data.page.image.name,
        contentType: response.data.page.image.contentType,
        data: response.data.page.image.data,
        src: response.data.src
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

  handleSubmit = (e) => {
    e.preventDefault();
    if (!this.state.nameNew) {
      this.props.updateState({
        resStatus: '400',
        resMessage: 'There is no new image attached!'
      });
      this.props.openModal();
      return;
    }
    const dataObj = {};
    dataObj.image = {
      name: this.state.nameNew,
      contentType: this.state.contentTypeNew,
      data: this.state.dataNew
    };
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
        resMessage: 'Image Updated!'
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

  render() {


    return (
      <form ref={form => this.imageForm = form} className="login-form" onSubmit={this.handleSubmit}>
        <h1 className="login-title">Banner Image</h1>
        <h4 className="page-image-header">Current Banner</h4>
        {(this.state.src) && (
          <div className="login-form-control">
            <img className="current-img" src={this.state.src} alt="Current Banner" />
          </div>
        )}
        <label className="login-form-control" htmlFor="newImage">Upload New Banner</label>
        <Edit updateState={this.updateState} width={1440} height={400} aspectRatio={3.6} quality={.9}/>
        <button className="login-form-control" type="submit">Save</button>
      </form>
    );
  }
}

export default PageImage;
