import React, { Component } from 'react';
import axios from 'axios';

class PagePagination extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: null,
      pagination: false,
      itemsPerPage: null,
      allowChange: false
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
        pagination: response.data.page.pagination,
        itemsPerPage: response.data.page.itemsPerPage,
        allowChange: response.data.page.allowChange
      });

    })
    .catch((error) => {
      console.log(error);
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const dataObj = {};
    dataObj.pagination = this.state.pagination
    if (this.state.pagination) {
      dataObj.itemsPerPage = this.state.itemsPerPage;
      dataObj.allowChange = this.state.allowChange;
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
    const select = document.querySelector('#itemsPerPage');
    if (select) {
      const selectItems = select.childNodes;
      const changeInput = document.querySelector('#allowChange');
      for (let i = 0; i < selectItems.length; i += 1) {
        selectItems[i].selected = false;
        if (parseInt(this.state.itemsPerPage) === parseInt(selectItems[i].value)) {
          selectItems[i].selected = true;
        }
      }
      if (this.state.pagination) {
        select.disabled = false;
        changeInput.disabled = false;
      } else {
        select.disabled = true;
        changeInput.disabled = true;
      }
    }


    return (
      <form ref={form => this.editForm = form} className="login-form form-grid col-2" onSubmit={this.handleSubmit}>
        <h1 className="login-title">Page Pagination</h1>
        <label className="login-form-control" htmlFor="pagination">Show Pagination</label>
        <input type="checkbox" value={this.state.pagination} className="checkbox" checked={this.state.pagination} name="pagination" id="pagination" onChange={this.handleChange} />
        <label className="login-form-control" htmlFor="itemsPerPage">Items Per Page</label>
        <select className="a" id="itemsPerPage" name="itemsPerPage" onChange={this.handleChange}>
          <option value="9">9</option>
          <option value="18">18</option>
          <option value="27">27</option>
          <option value="54">54</option>
        </select>
        <label className="login-form-control" htmlFor="allowChange">Allow Item Change</label>
        <input type="checkbox" value={this.state.allowChange} className="checkbox" checked={this.state.allowChange} name="allowChange" id="allowChange" onChange={this.handleChange} />
        <button className="login-form-control" type="submit">Save</button>
      </form>
    );
  }
}

export default PagePagination;
