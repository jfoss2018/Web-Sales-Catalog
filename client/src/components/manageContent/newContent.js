import React, { Component } from 'react';
import axios from 'axios';
import Edit from '../imageEdit.js';
import { validate } from '../../validate.js';
import MaskedInput from 'react-text-mask';
import createNumberMask from 'text-mask-addons/dist/createNumberMask';

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

    this.itemForm = React.createRef();
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

  updateState = (object) => {
    this.setState(object);
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
    if (validate(this.itemForm)) {
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
        this.props.updateState({
          resStatus: '201',
          resMessage: 'Content Item Created!'
        });
        if (this.props.updateList) {
          this.props.updateList();
        }
        this.setState({
          name: null,
          description: null,
          featured: false,
          price: null,
          viewable: false,
          images: []
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

  checkModalSecondary = (e) => {
    const modal = document.querySelector('.secondary-modal');
    if (e.target === modal) {
      modal.style.display = "none";
    }
  }

  openModalSecondary = (e) => {
    const modal = document.querySelector('.secondary-modal');
    modal.style.display = 'block';
    if (e.target.className === 'secondary-modal-close' || e.target.className === 'img-save-btn') {
      modal.style.display = 'none';
    }
  }

  removeImg = (e) => {
    const index = parseInt(e.target.closest('li').dataset.key);
    this.state.images.splice(index, 1);
    this.setState({
      update: true
    });
  }

  render() {
    // Button declaration=======================================================
    const delBtn = <button type="button" onClick={this.removeImg} className="img-box">Delete</button>
    // Number Mask declaration==================================================
    const numberMask = createNumberMask({
      prefix: '$',
      allowDecimal: true
    });

    return (
      /*========New Content Form================*/
      <form ref={form => this.itemForm = form} noValidate className="login-form" onSubmit={this.handleSubmit}>
        <h1 className="login-title">Add New Content</h1>
        {/*=======Content Name===========*/}
        <div className="form-group">
          <label className="login-form-control" htmlFor="name">Name</label>
          <input className="login-form-control" required type="text" minLength="3" maxLength="23" name="name" id="name" onChange={this.handleChange} />
          <span className="invalid-feedback"></span>
        </div>
        {/*======Content Description======*/}
        <div className="form-group">
          <label className="login-form-control" htmlFor="description">Description</label>
          <textarea rows="4" className="login-form-control" required name="description" id="description" onChange={this.handleChange}></textarea>
          <span className="invalid-feedback"></span>
        </div>
        {/*======Content Price============*/}
        <div className="form-group">
          <label className="login-form-control" htmlFor="price">Price</label>
          {/*<input id="offer" name="offer" type="number" />*/}
          <MaskedInput
            mask={numberMask}
            id="price"
            name="price"
            type="text"
            onChange={this.handleChange}
            className="login-form-control"
          />
          <span className="invalid-feedback"></span>
        </div>
        {/*======Content Featured Item======*/}
        <div className="form-group form-grid col-1">
          <label className="login-form-control" htmlFor="featured">Featured Item</label>
          <input type="checkbox" value={this.state.featured} className="checkbox" checked={this.state.featured} name="featured" id="featured" onChange={this.handleChange} />
          <span className="invalid-feedback"></span>
        </div>
        {/*======Content Show Item==========*/}
        <div className="form-group form-grid col-1">
          <label className="login-form-control" htmlFor="viewable">Show Item</label>
          <input type="checkbox" value={this.state.viewable} className="checkbox" checked={this.state.viewable} name="viewable" id="viewable" onChange={this.handleChange} />
          <span className="invalid-feedback"></span>
        </div>
        {/*=======Content Image List=========*/}
        <div className="form-group">
          <label className="login-form-control" htmlFor="image-list">Images</label>
          <ul className="login-form-control img-ul">
            {(this.state.images.length === 0) && (
              <li>{'<empty>'}</li>
            )}
            {this.state.images.map(function(image, i) {
              return <li className="img-box" data-key={i} key={i}><p className="img-box">{image.name}</p>{delBtn}</li>
            })}
          </ul>
          <span className="invalid-feedback"></span>
        </div>
        {/*=======Add Image Button==========*/}
        <button type="button" className="small-btn" onClick={this.openModalSecondary}>Add Image</button>
        {/*========Submit===================*/}
        <button className="login-form-control mt-1" type="submit">Save</button>

        {/*========Add Image Modal==========*/}
        <div onClick={this.checkModalSecondary} className="secondary-modal">
          <div className="secondary-modal-content">
            <span onClick={this.openModalSecondary} className="secondary-modal-close">&times;</span>
            <section className="login-form">
              <h1 className="login-title">Add Image</h1>
              <Edit updateState={this.updateState} width={512} height={384} aspectRatio={1.33} quality={.9} btn={'add'} pushList={this.pushList} closeModal={this.openModalSecondary} />
            </section>
          </div>
        </div>
        {/*======End Add Image Modal==========*/}

      </form>
      /*===========End New Content Form==================*/
    );
  }
}

export default NewContent;
