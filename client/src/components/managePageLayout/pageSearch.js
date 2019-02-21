import React, { Component } from 'react';
import axios from 'axios';

class PageSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: null,
      search: false,
      filter: false,
      featured: false,
      priceLowToHigh: false,
      priceHighToLow: false
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
        search: response.data.page.search,
        filter: response.data.page.filter,
        featured: response.data.page.filterOptions.featured,
        priceLowToHigh: response.data.page.filterOptions.priceLowToHigh,
        priceHighToLow: response.data.page.filterOptions.priceHighToLow
      });

    })
    .catch((error) => {
      console.log(error);
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const dataObj = {};
    dataObj.search = this.state.search
    if (this.state.search) {
      dataObj.filter = this.state.filter
    }
    if (this.state.search && this.state.filter) {
      if (!this.state.featured && !this.state.priceLowToHigh && !this.state.priceHighToLow) {
        dataObj.filter = false;
      } else {
      dataObj.filterOptions = {
        featured: this.state.featured,
        priceLowToHigh: this.state.priceLowToHigh,
        priceHighToLow: this.state.priceHighToLow
        }
      }
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
    const filterOpt = document.querySelector('#filter');
    const filterFeatured = document.querySelector('#featured');
    const filterL2H = document.querySelector('#priceLowToHigh');
    const filterH2L = document.querySelector('#priceHighToLow');
    if (filterOpt) {
      if (this.state.search) {
        filterOpt.disabled = false;
      } else {
        filterOpt.disabled = true;
      }
      if (this.state.search && this.state.filter) {
        filterFeatured.disabled = false;
        filterL2H.disabled = false;
        filterH2L.disabled = false;
      } else {
        filterFeatured.disabled = true;
        filterL2H.disabled = true;
        filterH2L.disabled = true;
      }
    }

    return (
      <form ref={form => this.editForm = form} className="login-form form-grid" onSubmit={this.handleSubmit}>
        <h1 className="login-title">Search Bar</h1>
        <label className="login-form-control" htmlFor="search">Show Search Bar</label>
        <input type="checkbox" value={this.state.search} className="checkbox" checked={this.state.search} name="search" id="search" onChange={this.handleChange} />
        <label className="login-form-control" htmlFor="filter">Show Filter</label>
        <input type="checkbox" value={this.state.filter} className="checkbox" checked={this.state.filter} name="filter" id="filter" onChange={this.handleChange} />
        <h4 className="login-title">Filter Options</h4>
        <label className="login-form-control" htmlFor="featured">Featured</label>
        <input type="checkbox" value={this.state.featured} className="checkbox" checked={this.state.featured} name="featured" id="featured" onChange={this.handleChange} />
        <label className="login-form-control" htmlFor="priceLowToHigh">Price Low to High</label>
        <input type="checkbox" value={this.state.priceLowToHigh} className="checkbox" checked={this.state.priceLowToHigh} name="priceLowToHigh" id="priceLowToHigh" onChange={this.handleChange} />
        <label className="login-form-control" htmlFor="priceHighToLow">Price High to Low</label>
        <input type="checkbox" value={this.state.priceHighToLow} className="checkbox" checked={this.state.priceHighToLow} name="priceHighToLow" id="priceHighToLow" onChange={this.handleChange} />
        <button className="login-form-control" type="submit">Submit</button>
      </form>
    );
  }
}

export default PageSearch;
