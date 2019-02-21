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
        name: response.data.page.image.name,
        contentType: response.data.page.image.contentType,
        data: response.data.page.image.data,
        src: response.data.src
      });

    })
    .catch((error) => {
      console.log(error);
    });
  }

  updateState = (object) => {
    this.setState(object);
  }

  handleSubmit = (e) => {
    e.preventDefault();
    if (!this.state.nameNew) {
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

  /*showPic = (e) => {
    e.preventDefault();
    const currentImg = document.querySelector('.current-img');
    /*const bufferArr = new Uint8Array(this.state.data);
    const blob = new Blob( [bufferArr], {type: this.state.contentType});
    const urlCreate = window.URL || window.webkitURL;
    const imageURL = urlCreate.createObjectURL(blob);*/
    /*currentImg.src = this.state.src;*/
    //console.log(this.state.src);
    //currentImg.src = this.state.src;
  /*  currentImg.hidden = false;
  }*/

  render() {


    return (
      <form ref={form => this.editForm = form} className="login-form" onSubmit={this.handleSubmit}>
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
