import React, { Component } from 'react';
import axios from 'axios';
import Edit from '../imageEdit.js';
import moment from 'moment';
import MaskedInput from 'react-text-mask';
import createNumberMask from 'text-mask-addons/dist/createNumberMask';
import { validate } from '../../validate.js';

class EditContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      description: '',
      featured: false,
      price: '',
      viewable: false,
      images: [],
      bids: [],
      questions: [],
      postedDate: '',
      lastEditDate: ''
    }

    this.editForm = React.createRef();
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
      url: `/api/v1/contents/${this.props.id}`,
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
        name: response.data.content.name,
        description: response.data.content.description,
        featured: response.data.content.featured,
        price: response.data.content.price,
        viewable: response.data.content.viewable,
        images: response.data.content.images,
        bids: response.data.content.bids,
        questions: response.data.content.questions,
        postedDate: moment.utc(response.data.content.postedDate).toDate(),
        lastEditDate: moment.utc(response.data.content.lastEditDate).toDate()
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

  updateState = (obj) => {
    this.setState(obj);
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
    if (validate(this.editForm)) {
      axios({
        method: 'put',
        url: `/api/v1/contents/${this.props.id}`,
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
          resStatus: '204',
          resMessage: 'Content Item Updated!'
        });
        if (this.props.updateList) {
          this.props.updateList();
        }
        this.setState({
          name: '',
          description: '',
          featured: false,
          price: '',
          viewable: false,
          images: [],
          bids: [],
          questions: [],
          postedDate: '',
          lastEditDate: ''
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
    // Delete Button declaration================================================
    const delBtn = <button type="button" onClick={this.removeImg} className="img-box">Delete</button>
    // Number Mask declaration==================================================
    const numberMask = createNumberMask({
      prefix: '$',
      allowDecimal: true
    });

    return (
      /*=============Edit Content Item Form=================*/
      <form ref={form => this.editForm = form} noValidate className="login-form" onSubmit={this.handleSubmit}>
        <h1 className="login-title">Edit Content</h1>
        {/*=======Edit Name=======*/}
        <div className="form-group">
          <label className="login-form-control" htmlFor="name">Name</label>
          <input className="login-form-control" type="text" minLength="3" maxLength="40" name="name" value={this.state.name} id="name" onChange={this.handleChange} />
          <span className="invalid-feedback"></span>
        </div>
        {/*====Edit Description====*/}
        <div className="form-group">
          <label className="login-form-control" htmlFor="description">Description</label>
          <textarea rows="4" className="login-form-control" required name="description" value={this.state.description} id="description" onChange={this.handleChange}></textarea>
          <span className="invalid-feedback"></span>
        </div>
        {/*========Edit Price=======*/}
        <div className="form-group">
          <label className="login-form-control" htmlFor="price">Price</label>
          <MaskedInput
            mask={numberMask}
            id="price"
            name="price"
            type="text"
            value={this.state.price}
            onChange={this.handleChange}
            className="login-form-control"
          />
          <span className="invalid-feedback"></span>
        </div>
        {/*====Edit Featured Item====*/}
        <div className="form-group form-grid col-1">
          <label className="login-form-control" htmlFor="featured">Featured Item</label>
          <input type="checkbox" value={this.state.featured} className="checkbox" checked={this.state.featured} name="featured" id="featured" onChange={this.handleChange} />
          <span className="invalid-feedback"></span>
        </div>
        {/*======Edit Show Item=======*/}
        <div className="form-group form-grid col-1">
          <label className="login-form-control" htmlFor="viewable">Show Item</label>
          <input type="checkbox" value={this.state.viewable} className="checkbox" checked={this.state.viewable} name="viewable" id="viewable" onChange={this.handleChange} />
          <span className="invalid-feedback"></span>
        </div>
        {/*======Created Date======*/}
        <div className="form-group">
          <label className="login-form-control" htmlFor="postedDate">Created Date</label>
          <input className="login-form-control" disabled readOnly type="text" name="postedDate" value={moment(this.state.postedDate).format('LLL')} id="postedDate" />
        </div>
        {/*====Last Editted Date===*/}
        <div className="form-group">
          <label className="login-form-control" htmlFor="lastEditDate">Last Editted Date</label>
          <input className="login-form-control" disabled readOnly type="text" name="lastEditDate" value={moment(this.state.lastEditDate).format('LLL')} id="lastEditDate" />
        </div>
        {/*=====Number of Bids=====*/}
        <div className="form-group">
          <label className="login-form-control" htmlFor="bids">Number of Bids</label>
          <input className="login-form-control" disabled readOnly type="text" name="bids" value={this.state.bids.length} id="bids" />
        </div>
        {/*===Number of Questions==*/}
        <div className="form-group">
          <label className="login-form-control" htmlFor="questions">Number of Questions</label>
          <input className="login-form-control" disabled readOnly type="text" name="questions" value={this.state.questions.length} id="questions" />
        </div>
        {/*===Edit Image List======*/}
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
        {/*====Add Image Button======*/}
        <button type="button" className="small-btn" onClick={this.openModalSecondary}>Add Image</button>
        {/*=====Submit========*/}
        <button className="login-form-control mt-1" type="submit">Save</button>

        {/*====Add Image Modal=======*/}
        <div onClick={this.checkModalSecondary} className="secondary-modal">
          <div className="secondary-modal-content">
            <span onClick={this.openModalSecondary} className="secondary-modal-close">&times;</span>
            <section className="login-form">
              <h1 className="login-title">Add Image</h1>
              <Edit updateState={this.updateState} width={512} height={384} aspectRatio={1.33} quality={.9} btn={'add'} pushList={this.pushList} closeModal={this.openModalSecondary} />
            </section>
          </div>
        </div>
        {/*=====End Add Image Modal=====*/}

      </form>
      /*=========End Edit Content Item Form================*/
    );
  }
}

export default EditContent;
