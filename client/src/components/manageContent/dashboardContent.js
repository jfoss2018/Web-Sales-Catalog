import React, { Component } from 'react';
import axios from 'axios';
import NewContent from './newContent.js';
import ContentItem from './contentItem.js';
import EditContent from './editContent.js';
import DeleteContent from './deleteContent.js';

class DashboardContent extends Component {
  constructor() {
    super();
    this.state = {
      items: [],
      selectedItem: null,
      selectedAction: '',
      loading: true
    }
  }



  updateList = () => {
    this.setState({
      loading: true
    });
    axios({
      method: 'get',
      url: '/api/v1/contents',
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

      const modal = document.querySelector('.user-modal');
      modal.style.display = 'none';
      const rows = document.querySelectorAll('.user-data-row');
      for (let i = 0; i < rows.length; i += 1) {
        rows[i].classList.remove('active');
      }
      this.setState({
        items: response.data.contents,
        selectedItem: null,
        selectedAction: 'empty',
        loading: false
      });
    })
    .catch((error) => {
      console.log(error);
    });
  }

  componentDidMount() {
    this.updateList();
  }

  toggleActive = (e) => {
    const rows = document.querySelectorAll('.user-data-row');
    for (let i = 0; i < rows.length; i += 1) {
      rows[i].classList.remove('active');
    }
    e.target.closest('tr').classList.add('active');
    this.setState({
      selectedItem: e.target.closest('tr').childNodes[0].innerHTML
    });
  }

  checkModal = (e) => {
    const modal = document.querySelector('.user-modal');
    if (e.target === modal) {
      modal.style.display = "none";
      this.setState({
        selectedAction: 'empty'
      });
    }
  }

  openModal = (e) => {
    const modal = document.querySelector('.user-modal');
    modal.style.display = 'block';
    if (e.target.className === 'user-modal-close' || e.target === modal) {
      modal.style.display = 'none';
      this.setState({
        selectedAction: 'empty'
      });
    } else {
      this.setState({
        selectedAction: e.target.value
      });
    }
  }

  changeClass = (modal, newClass) => {
    modal.classList.remove('centered');
    modal.classList.remove('non-centered');
    modal.classList.add(newClass);
  }

  render() {
    let modalContents;
    let modal = document.querySelector('.user-modal-content');
    if (this.state.selectedAction === 'new') {
      this.changeClass(modal, 'non-centered');
      modalContents = <NewContent updateList={this.updateList} />
    } else if (this.state.selectedAction === 'edit') {
      this.changeClass(modal, 'non-centered');
      modalContents = <EditContent id={this.state.selectedItem} updateList={this.updateList} />
    } else if (this.state.selectedAction === 'delete') {
      this.changeClass(modal, 'centered');
      modalContents = <DeleteContent id={this.state.selectedItem} updateList={this.updateList} />
    } else {
      modalContents = null;
    }


    let buttons;
    if (this.state.selectedItem) {
      buttons =
        <div className="user-controls">
          <button value="new" onClick={this.openModal} className="user-create user-control-btn">New</button>
          <button value="edit" onClick={this.openModal} className="user-edit user-control-btn">Edit</button>
          <button value="delete" onClick={this.openModal} className="user-delete user-control-btn">Delete</button>
        </div>
    } else {
      buttons =
        <div className="user-controls">
          <button value="new" onClick={this.openModal} className="user-create user-control-btn">New</button>
          <button disabled className="user-control-btn-dis">Edit</button>
          <button disabled className="user-control-btn-dis">Delete</button>
        </div>
    }

    let bodyContents;
    if (this.state.loading) {
      bodyContents = <p>Loading...</p>
    } else {
      bodyContents = this.state.items.map(function(item, i) {
        return <ContentItem key={i} record={i} itemInfo={item} />
      })
    }

    return (
      <div className="user-block">
        {buttons}
        <div className="user-list-wrapper">
          <table className="user-list">
            <thead>
              <tr>
                <th>Record</th>
                <th>Name</th>
                <th>Price</th>
                <th>Bids</th>
                <th>Viewable</th>
              </tr>
            </thead>
            <tbody onClick={this.toggleActive}>
              {(!this.state.loading) && (
                bodyContents
              )}
            </tbody>
          </table>
          {(this.state.loading) && (
            bodyContents
          )}
        </div>

        <div onClick={this.checkModal} className="user-modal">
          <div className="user-modal-content centered">
            <span onClick={this.openModal} className="user-modal-close">&times;</span>
            {modalContents}
          </div>
        </div>

      </div>
    );
  }
}



export default DashboardContent;
