import React, { Component } from 'react';
import axios from 'axios';
import NewContent from './newContent.js';
import ContentItem from './contentItem.js';
import EditContent from './editContent.js';
import DeleteContent from './deleteContent.js';
import { compareValues } from '../../sort.js';

class DashboardContent extends Component {
  constructor() {
    super();
    this.state = {
      items: [],
      filteredItems: [],
      selectedItem: null,
      selectedAction: '',
      loading: true,
      sortName: null,
      sortDir: null,
      resStatus: null,
      resMessage: null
    }
  }

  updateState = (obj) => {
    this.setState(obj);
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
      // Close Action Modal
      const modal = document.querySelector('.user-modal');
      modal.style.display = 'none';
      // Remove Active Row
      const rows = document.querySelectorAll('.user-data-row');
      for (let i = 0; i < rows.length; i += 1) {
        rows[i].classList.remove('active');
      }
      // Set State with filter if it exists
      let filtItems;
      if (this.state.sortName) {
        filtItems = response.data.contents.sort(compareValues(this.state.sortName, this.state.sortDir));
      } else {
        filtItems = response.data.contents;
      }
      // Open Message Modal
      if (this.state.resStatus) {
        this.openModalMessage();
      }
      this.setState({
        items: response.data.contents,
        filteredItems: filtItems,
        selectedItem: null,
        selectedAction: 'empty',
        loading: false
      });
    })
    .catch((error) => {
      console.log(error);
      this.setState({
        resStatus: error.response.status.toString(),
        resMessage: error.response.data.message.toString()
      });
      this.props.openModal();
    });
  }

  componentDidMount() {
    this.updateList();
  }

  handleSort = (e) => {
    this.setState({
      loading: true
    });
    if (e.target.dataset.name === this.state.sortName && this.state.sortDir === 'asc') {
      this.setState({
        filteredItems: this.state.items.sort(compareValues(e.target.dataset.name, 'desc')),
        loading: false,
        sortName: e.target.dataset.name,
        sortDir: 'desc'
      });
    } else {
      this.setState({
        filteredItems: this.state.items.sort(compareValues(e.target.dataset.name, 'asc')),
        loading: false,
        sortName: e.target.dataset.name,
        sortDir: 'asc'
      });
    }
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

  openModalMessage = (e) => {
    const modal = document.querySelector('.init-message-modal');
    modal.style.display = 'block';
    if (e) {
      if (e.target.className === 'init-login-modal-close' || e.target === modal) {
        this.modalClose(modal);
      }
    }
  }

  modalClose = (modal) => {
    modal.style.display = 'none';
    this.setState({
      resStatus: null,
      resMessage: null
    });
  }

  changeClass = (modal, newClass) => {
    modal.classList.remove('centered');
    modal.classList.remove('non-centered');
    modal.classList.add(newClass);
  }

  render() {
    // Modal Contents ==========================================================
    let modalContents;
    let modal = document.querySelector('.user-modal-content');
    if (this.state.selectedAction === 'new') {
      this.changeClass(modal, 'non-centered');
      modalContents = <NewContent openModal={this.openModalMessage} updateState={this.updateState} updateList={this.updateList} />
    } else if (this.state.selectedAction === 'edit') {
      this.changeClass(modal, 'non-centered');
      modalContents = <EditContent id={this.state.selectedItem} openModal={this.openModalMessage} updateState={this.updateState} updateList={this.updateList} />
    } else if (this.state.selectedAction === 'delete') {
      this.changeClass(modal, 'centered');
      modalContents = <DeleteContent id={this.state.selectedItem} openModal={this.openModalMessage} updateState={this.updateState} updateList={this.updateList} />
    } else {
      modalContents = null;
    }

    // Buttons that will be displayed===========================================
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

    // Contents List Contents ==================================================
    let bodyContents;
    if (this.state.loading) {
      bodyContents = <p>Loading...</p>
    } else {
      bodyContents = this.state.filteredItems.map(function(item, i) {
        return <ContentItem key={i} record={i} itemInfo={item} />
      })
    }

    // Message Modal Contents ==================================================
    let secondaryModalContents;
    if (this.state.resStatus) {
      const modalBG = document.querySelector('.init-message-modal-content');
      if (this.state.resStatus === '201') {
        modalBG.classList.remove('fail');
        modalBG.classList.add('success');
        secondaryModalContents = <section>
          <h5 className="init-message-title">Created New Content Item!</h5>
        </section>
      } else if (this.state.resStatus === '204') {
        modalBG.classList.remove('fail');
        modalBG.classList.add('success');
        secondaryModalContents = <section>
          <h5 className="init-message-title">{this.state.resMessage}</h5>
        </section>
      } else if (this.state.resStatus === '409') {
        modalBG.classList.add('fail');
        secondaryModalContents = <section>
          <h5 className="init-message-title">Error: 409, Conflict</h5>
          <p className="init-message-form-control">{this.state.resMessage}</p>
        </section>
      } else if (this.state.resStatus === '500') {
        modalBG.classList.add('fail');
        secondaryModalContents = <section>
          <h5 className="init-message-title">Error: {this.state.resStatus}</h5>
          <p className="init-message-form-control">{this.state.resMessage}</p>
        </section>
      }
    }

    return (
      <div className="user-block">
        {buttons}
        <div className="user-list-wrapper">
          <table className="user-list">
            <thead>
              <tr>
                <th>Record</th>
                <th className="table-header" data-name="name" onClick={this.handleSort}>Name</th>
                <th className="table-header" data-name="priceNum" onClick={this.handleSort}>Price</th>
                <th className="table-header" data-name="bidLength" onClick={this.handleSort}>Bids</th>
                <th className="table-header" data-name="viewable" onClick={this.handleSort}>Viewable</th>
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

        <div onClick={this.openModalMessage} className="init-message-modal">
          <div className="init-message-modal-content">
            <span onClick={this.openModalMessage} className="init-login-modal-close">&times;</span>
            {(this.state.resStatus) && (
              secondaryModalContents
            )}
          </div>
        </div>

      </div>
    );
  }
}



export default DashboardContent;
