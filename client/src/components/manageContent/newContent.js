import React, { Component } from 'react';
import axios from 'axios';
import Edit from '../imageEdit.js';

class NewContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: null,
      description: null,
      featured: false,
      price: null,
      viewable: false,
      images: []
    }

    this.loginForm = React.createRef();
  }

  updateState = (object) => {
    this.setState(object);
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

  pushList = () => {
    this.state.images.push({
      name: this.state.nameNew,
      contentType: this.state.contentTypeNew,
      data: this.state.dataNew
    });
    this.setState({
      update: true
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    axios({
      method: 'post',
      url: '/api/v1/contents',
      /*proxy: {
        host: '127.0.0.1',
        port: 3001
      },*/
      headers: {
        'Content-Type': 'application/json'
      },
      data: {
        name: this.state.name,
        description: this.state.description,
        featured: this.state.featured,
        price: this.state.price,
        viewable: this.state.viewable,
        images: this.state.images
      }
    })
    .then(response => {
      console.log(response.data);
      /*
      this.loginForm[0].value = '';
      this.loginForm[1].value = '';
      this.loginForm[2].value = '';
      this.loginForm[3].value = '';
      this.loginForm[4].value = '';

      this.setState({
        username: '',
        password: '',
        email: '',
        phone: '',
        authorization: ''
      });
      */
      if (this.props.updateList) {
        this.props.updateList();
      }
    })
    .catch((error) => {
      console.log(error);
    });
  }

  checkModalSecondary = (e) => {
    const modal = document.querySelector('.secondary-modal');
    if (e.target === modal) {
      modal.style.display = "none";
      /*this.setState({
        selectedAction: 'empty'
      });*/
    }
  }

  openModalSecondary = (e) => {
    const modal = document.querySelector('.secondary-modal');
    modal.style.display = 'block';
    if (e.target.className === 'secondary-modal-close' || e.target.className === 'img-save-btn') {
      modal.style.display = 'none';
      /*this.setState({
        selectedAction: 'empty'
      });*/
    } else {
      /*this.setState({
        selectedAction: e.target.value
      });*/
    }
  }

  render() {
    return (
      <form ref={form => this.loginForm = form} className="login-form form-grid col-1" onSubmit={this.handleSubmit}>
        <h1 className="login-title">Add New Content</h1>

        <label className="login-form-control" htmlFor="name">Name</label>
        <input className="login-form-control" type="text" name="name" id="name" onChange={this.handleChange} />
        <label className="login-form-control" htmlFor="description">Description</label>
        <textarea rows="4" className="login-form-control" name="description" id="description" onChange={this.handleChange}></textarea>
        <label className="login-form-control" htmlFor="price">Price</label>
        <input className="login-form-control" type="text" name="price" id="price" onChange={this.handleChange} />
        <label className="login-form-control" htmlFor="featured">Featured Item</label>
        <input type="checkbox" value={this.state.featured} className="checkbox" checked={this.state.featured} name="featured" id="featured" onChange={this.handleChange} />
        <label className="login-form-control" htmlFor="viewable">Show Item</label>
        <input type="checkbox" value={this.state.viewable} className="checkbox" checked={this.state.viewable} name="viewable" id="viewable" onChange={this.handleChange} />
        <label className="login-form-control" htmlFor="image-list">Images</label>
        <ul className="login-form-control">
          {(this.state.images.length === 0) && (
            <li>{'<empty>'}</li>
          )}
          {this.state.images.map(function(image, i) {
            return <li key={i}>{image.name}</li>
          })}
        </ul>
        <button type="button" className="small-btn" onClick={this.openModalSecondary}>Add Image</button>
        <button className="login-form-control" type="submit">Save</button>

        <div onClick={this.checkModalSecondary} className="secondary-modal">
          <div className="secondary-modal-content">
            <span onClick={this.openModalSecondary} className="secondary-modal-close">&times;</span>
            <section className="login-form">
              <h1 className="login-title">Add Image</h1>
              <Edit updateState={this.updateState} width={512} height={384} aspectRatio={1.33} quality={.9} btn={'add'} pushList={this.pushList} closeModal={this.openModalSecondary} />
            </section>
          </div>
        </div>

      </form>
    );
  }
}

export default NewContent;
