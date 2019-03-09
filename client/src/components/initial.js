import React, { Component } from 'react';
import axios from 'axios';
import MaskedInput from 'react-text-mask';
import Edit from './imageEdit.js';
import { validate } from '../validate.js';

class Initial extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nameNew: null,
      contentTypeNew: null,
      dataNew: null,
      registerName: null,
      registerPassword: null,
      registerCPassword: null,
      registerPhone: null,
      registerEmail: null,
      showTitle: false,
      title: null,
      search: false,
      filter: false,
      featured: false,
      priceLowToHigh: false,
      priceHighToLow: false,
      pagination: false,
      allowChange: false,
      itemsPerPage: '9',
      footer: false,
      message: null
    }
    this.initForm = React.createRef();
  }

  updateState = (obj) => {
    this.setState(obj);
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

  componentWillMount() {
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
      if (response.data.page) {
        this.props.browserPath("/");
      }
    })
    .catch((error) => {
      console.log(error);
    });
  }

  submitCreatePage = (e) => {
    e.preventDefault();
    if (validate(this.initForm)) {
      const userObj = {
        username: this.state.registerName,
        password: this.state.registerCPassword,
        email: this.state.registerEmail,
        phone: this.state.registerPhone
      };
      const pageObj = {
        image: {
          name: this.state.nameNew,
          contentType: this.state.contentTypeNew,
          data: this.state.dataNew
        },
        title: this.state.title,
        showTitle: this.state.showTitle,
        search: this.state.search,
        filter: this.state.filter,
        filterOptions: {
          featured: this.state.featured,
          priceLowToHigh: this.state.priceLowToHigh,
          priceHighToLow: this.state.priceHighToLow
        },
        pagination: this.state.pagination,
        allowChange: this.state.allowChange,
        itemsPerPage: this.state.itemsPerPage,
        footer: this.state.footer,
        message: this.state.message
      }
      axios({
        method: 'post',
        url: `/api/v1/initialize`,
        /*proxy: {
          host: '127.0.0.1',
          port: 3001
        },*/
        headers: {
          'Content-Type': 'application/json'
        },
        data: {
          userObj: userObj,
          pageObj: pageObj
        }
      })
      .then(response => {
        console.log('setup complete');
        if (response.data.page) {
          this.props.browserPath("/");
        }
      })
      .catch((error) => {
        console.log(error);
      });
    }
  }

  closeModalSecondary = () => {
    const modal = document.querySelector('.secondary-modal');
    modal.style.display = 'none';
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

  render() {
    return (
      <div className="initialize-page-wrapper">
        <div className="initialize-content-wrapper">
          <div className="initialize-content-message">
            <h1 className="dashboard-title initial-title">Web-Sales-Catalog</h1>
            <p className="initialize-message-1">
              Welcome to this initialization of Web-Sales-Catalog. In order to use this app, you must first setup the initial parameters of your Web-Sales-Catalog page
              and admin credentials. Don't worry, you will be able to edit these parameters in your dashboard later. Please fill out the forms below to get started.
            </p>
            <hr className="init-login-hr exp-show" />
          </div>
          <form ref={form => this.initForm = form} className="initialize-form" noValidate onSubmit={this.submitCreatePage}>
            <div className="initialize-user">
              <hr className="init-login-hr exp-hide" />
              <div className="form-group mt-exp">
                <label className="init-login-form-control" htmlFor="registerName">Username</label>
                <input className="init-login-form-control" type="text" required minLength="4" maxLength="28" name="registerName" id="registerName" onChange={this.handleChange} />
                <span className="invalid-feedback"></span>
              </div>
              <div className="form-group">
                <label className="init-login-form-control" htmlFor="registerPassword">Password</label>
                <input className="init-login-form-control" data-category="password" required minLength="4" type="password" name="registerPassword" id="registerPassword" onChange={this.handleChange} />
                <span className="invalid-feedback"></span>
              </div>
              <div className="form-group">
                <label className="init-login-form-control" htmlFor="registerCPassword">Confirm Password</label>
                <input className="init-login-form-control" data-category="cPassword" required minLength="4" type="password" name="registerCPassword" id="registerCPassword" onChange={this.handleChange} />
                <span className="invalid-feedback c-pass"></span>
              </div>
              <div className="form-group">
                <p className="initialize-message-2">In the current version of Web-Sales-Catalog, Users' phone numbers are not used. They are, however, required. It will not cause problems if you enter an incorrect number.</p>
                <label className="init-login-form-control" htmlFor="registerPhone">Phone</label>
                <MaskedInput
                mask={['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
                id="registerPhone"
                name="registerPhone"
                className="init-login-form-control"
                onChange={this.handleChange}
                required
                data-category="phone"
                type="tel"
                />
                <span className="invalid-feedback phone-val"></span>
              </div>
              <div className="form-group">
                <p className="initialize-message-2">Please enter the email address in which this User would like to receive notifications from Web-Sales-Catalog. This is true for every User you create.</p>
                <label className="init-login-form-control" htmlFor="registerEmail">Email</label>
                <input className="init-login-form-control" data-category="email" required type="email" name="registerEmail" id="registerEmail" onChange={this.handleChange} />
                <span className="invalid-feedback email-val"></span>
              </div>
              <hr className="init-login-hr" />
              <button className="login-form-control initialize-btn" type="button" onClick={this.openModalSecondary}>Add a Banner</button>
            </div>
            <div className="exp-show initialize-separator">
            </div>
            <div className="initialize-page">
              <hr className="init-login-hr exp-hide" />
              <div className="form-group init-form-group-grid mt-exp">
                <p className="initialize-message-2 ifgg-p">Check this box if you want to display a title on your Web-Sales-Catalog Page. Inclue what you would like the title to be below.</p>
                <label className="init-login-form-control ifgg-l" htmlFor="showTitle">Title</label>
                <input type="checkbox" className="login-form-control ifgg-i" name="showTitle" id="showTitle" onChange={this.handleChange} />
                <span className="invalid-feedback ifgg-s"></span>
              </div>
              <div className="form-group">
                <label className="init-login-form-control" htmlFor="title">Title Name</label>
                <input className="init-login-form-control" maxLength="23" name="title" id="title" onChange={this.handleChange} />
                <span className="invalid-feedback"></span>
              </div>
              <hr className="init-login-hr" />
              <div className="form-group init-form-group-grid">
                <p className="initialize-message-2 ifgg-p">Check this box if you want to display a search bar on your Web-Sales-Catalog Page. Also check below if you want to include a filter and what filter options that you would like to include.</p>
                <label className="init-login-form-control ifgg-l" htmlFor="search">Search</label>
                <input type="checkbox" className="login-form-control ifgg-i" name="search" id="search" onChange={this.handleChange} />
                <span className="invalid-feedback ifgg-s"></span>
              </div>
              <div className="form-group init-form-group-grid">
                <label className="init-login-form-control ifgg-l" htmlFor="filter">Filter</label>
                <input type="checkbox" className="login-form-control ifgg-i" name="filter" id="filter" onChange={this.handleChange} />
                <span className="invalid-feedback ifgg-s"></span>
              </div>
              <div className="form-group init-form-group-grid">
                <label className="init-login-form-control ifgg-l" htmlFor="featured">Featured</label>
                <input type="checkbox" className="login-form-control ifgg-i" name="featured" id="featured" onChange={this.handleChange} />
                <span className="invalid-feedback ifgg-s"></span>
              </div>
              <div className="form-group init-form-group-grid">
                <label className="init-login-form-control ifgg-l" htmlFor="priceLowToHigh">Price Low to High</label>
                <input type="checkbox" className="login-form-control ifgg-i" name="priceLowToHigh" id="priceLowToHigh" onChange={this.handleChange} />
                <span className="invalid-feedback ifgg-s"></span>
              </div>
              <div className="form-group init-form-group-grid">
                <label className="init-login-form-control ifgg-l" htmlFor="priceHighToLow">Price High to Low</label>
                <input type="checkbox" className="login-form-control ifgg-i" name="priceHighToLow" id="priceHighToLow" onChange={this.handleChange} />
                <span className="invalid-feedback ifgg-s"></span>
              </div>
              <hr className="init-login-hr" />
              <div className="form-group init-form-group-grid">
                <p className="initialize-message-2 ifgg-p">Check this box if you want to paginate the items displayed on your Web-Sales-Catalog Page. Also include how many items should appear on the page and if you want to allow the end user to be able to change that amount.</p>
                <label className="init-login-form-control ifgg-l" htmlFor="pagination">Pagination</label>
                <input type="checkbox" className="login-form-control ifgg-i" name="pagination" id="pagination" onChange={this.handleChange} />
                <span className="invalid-feedback ifgg-s"></span>
              </div>
              <div className="form-group init-form-group-grid">
                <label className="init-login-form-control ifgg-l" htmlFor="allowChange">Allow Change</label>
                <input type="checkbox" className="login-form-control ifgg-i" name="allowChange" id="allowChange" onChange={this.handleChange} />
                <span className="invalid-feedback ifgg-s"></span>
              </div>
              <div className="form-group init-form-group-grid">
                <label className="init-login-form-control ifgg-l" htmlFor="itemsPerPage">Items/Page</label>
                {/*<input className="init-login-form-control" name="itemsPerPage" id="itemsPerPage" onChange={this.handleChange} />*/}
                <select className="a ifgg-e" id="itemsPerPage" name="itemsPerPage" onChange={this.handleChange}>
                  <option value="9">9</option>
                  <option value="18">18</option>
                  <option value="27">27</option>
                  <option value="54">54</option>
                </select>
                <span className="invalid-feedback ifgg-s"></span>
              </div>
              <hr className="init-login-hr" />
              <div className="form-group init-form-group-grid">
                <p className="initialize-message-2 ifgg-p">Check this box if you want to display a footer on your Web-Sales-Catalog Page. Inclue what you would like the footer to read below.</p>
                <label className="init-login-form-control ifgg-l" htmlFor="footer">Footer</label>
                <input type="checkbox" className="login-form-control ifgg-i" name="footer" id="footer" onChange={this.handleChange} />
                <span className="invalid-feedback ifgg-s"></span>
              </div>
              <div className="form-group">
                <label className="init-login-form-control" htmlFor="message">Message</label>
                <input className="init-login-form-control" name="message" id="message" maxLength="30" onChange={this.handleChange} />
                <span className="invalid-feedback"></span>
              </div>
              <hr className="init-login-hr exp-hide" />
            </div>
            <div className="initialize-submit">
              <hr className="init-login-hr exp-show" />
              <button className="login-form-control initialize-btn bottom-btn" type="submit">Save</button>

              <div onClick={this.checkModalSecondary} className="secondary-modal">
                <div className="secondary-modal-content">
                  <span onClick={this.openModalSecondary} className="secondary-modal-close">&times;</span>
                  <section className="login-form">
                    <h1 className="login-title">Add Image</h1>
                    <Edit updateState={this.updateState} width={1440} height={400} aspectRatio={3.6} quality={.9} btn={'first'} closeModal={this.closeModalSecondary} />
                  </section>
                </div>
              </div>

            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default Initial;
