/*import React, { Component } from 'react';
import axios from 'axios';
import Edit from './imageEdit.js';

class Page extends Component {
  constructor() {
    super();
    this.state = {
      image: {
        name: '',
        contentType: '',
        data: ''
      },
      title: '',
      showTitle: '',
      search: '',
      filter: '',
      featured: '',
      priceLowToHigh: '',
      priceHighToLow: '',
      pagination: '',
      allowChange: '',
      itemsPerPage: '',
      footer: '',
      message: ''
    }

    this.pageForm = React.createRef();
  }

  handleChange = (e) => {
    if (e.target.type === 'checkbox') {
      if (e.target.checked === true) {
        e.target.value = true;
      } else {
        e.target.value = false;
      }
    }
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  updateState = (object) => {
    this.setState(object);
  }

  handleSubmit = (e) => {
    e.preventDefault();

    axios({
      method: 'post',
      url: '/api/v1/page',
      /*proxy: {
        host: '127.0.0.1',
        port: 3001
      },*/
      /*headers: {
        'Content-Type': 'application/json'
      },
      data:
        this.state

    })
    .then(response => {
      console.log(response.data);
      /*
      this.loginForm[0].value = '';
      this.loginForm[1].value = '';
      this.loginForm[2].value = '';
      this.loginForm[3].value = '';

      this.setState({
        username: '',
        password: '',
        email: '',
        phone: ''
      });
      */
    /*})
    .catch((error) => {
      console.log(error);
    });
  }

  render() {
    return (
      <form ref={form => this.pageForm = form} className="login-form" onSubmit={this.handleSubmit}>

        <Edit updateState={this.updateState} width={1440} height={400} aspectRatio={3.6} quality={.9}/>

        <label className="login-form-control" htmlFor="title">Title Name</label>
        <input className="login-form-control" name="title" id="title" onChange={this.handleChange} />

        <label className="login-form-control" htmlFor="showTitle">Title</label>
        <input type="checkbox" className="login-form-control" name="showTitle" id="showTitle" onChange={this.handleChange} />

        <label className="login-form-control" htmlFor="search">Search</label>
        <input type="checkbox" className="login-form-control" name="search" id="search" onChange={this.handleChange} />

        <label className="login-form-control" htmlFor="filter">Filter</label>
        <input type="checkbox" className="login-form-control" name="filter" id="filter" onChange={this.handleChange} />

        <label className="login-form-control" htmlFor="featured">Featured</label>
        <input type="checkbox" className="login-form-control" name="featured" id="featured" onChange={this.handleChange} />

        <label className="login-form-control" htmlFor="priceLowToHigh">Price Low to High</label>
        <input type="checkbox" className="login-form-control" name="priceLowToHigh" id="priceLowToHigh" onChange={this.handleChange} />

        <label className="login-form-control" htmlFor="priceHighToLow">Price High to Low</label>
        <input type="checkbox" className="login-form-control" name="priceHighToLow" id="priceHighToLow" onChange={this.handleChange} />

        <label className="login-form-control" htmlFor="pagination">Pagination</label>
        <input type="checkbox" className="login-form-control" name="pagination" id="pagination" onChange={this.handleChange} />

        <label className="login-form-control" htmlFor="allowChange">Allow Change</label>
        <input type="checkbox" className="login-form-control" name="allowChange" id="allowChange" onChange={this.handleChange} />

        <label className="login-form-control" htmlFor="itemsPerPage">Items/Page</label>
        <input className="login-form-control" name="itemsPerPage" id="itemsPerPage" onChange={this.handleChange} />

        <label className="login-form-control" htmlFor="footer">Footer</label>
        <input type="checkbox" className="login-form-control" name="footer" id="footer" onChange={this.handleChange} />

        <label className="login-form-control" htmlFor="message">Message</label>
        <input className="login-form-control" name="message" id="message" onChange={this.handleChange} />

        <button className="login-form-control" type="submit">Submit</button>
      </form>
    );
  }
}


export default Page;*/
