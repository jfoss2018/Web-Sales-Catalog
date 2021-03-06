import React, { Component } from 'react';
import PageTitle from './pageTitle.js';
import PageSearch from './pageSearch.js';
import PageFooter from './pageFooter.js';
import PagePagination from './pagePagination.js';
import PageImage from './pageImage.js';

class DashboardPage extends Component {
  constructor() {
    super();
    this.state = {
      selectedPageModule: '',
      resStatus: null,
      resMessage: null
    }
  }

  updateState = (obj) => {
    this.setState(obj);
  }

  checkModal = (e) => {
    const modal = document.querySelector('.user-modal');
    if (e.target === modal) {
      modal.style.display = "none";
      this.setState({
        selectedPageModule: 'empty'
      });
    }
  }

  enter = () => {
    const pageinationRect = document.querySelector('.svg-pagination');
    pageinationRect.classList.add('highlighter');
  }

  exit = () => {
    const pageinationRect = document.querySelector('.svg-pagination');
    pageinationRect.classList.remove('highlighter');
  }

  checkPage = (location) => {
    this.setState({
      selectedPageModule: location
    });
    this.openModal(location);
  }

  openModal = (location) => {
    const modal = document.querySelector('.user-modal');
    modal.style.display = 'block';
    if (location === 'close') {
      modal.style.display = 'none';
      this.setState({
        selectedPageModule: 'empty'
      });
    }
  }

  changeClass = (modal, newClass) => {
    modal.classList.remove('centered');
    modal.classList.remove('non-centered');
    modal.classList.add(newClass);
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

  render() {
    // Modal Contents ==========================================================
    let modalContents;
    let modal = document.querySelector('.user-modal-content');
    if (this.state.selectedPageModule === 'title') {
      this.changeClass(modal, 'centered');
      modalContents = <PageTitle updateState={this.updateState} openModal={this.openModalMessage} closeModal={this.checkPage} />
    } else if (this.state.selectedPageModule === 'image') {
      this.changeClass(modal, 'non-centered');
      modalContents = <PageImage updateState={this.updateState} openModal={this.openModalMessage} closeModal={this.checkPage} />
    } else if (this.state.selectedPageModule === 'search') {
      this.changeClass(modal, 'centered');
      modalContents = <PageSearch updateState={this.updateState} openModal={this.openModalMessage} closeModal={this.checkPage} />
    } else if (this.state.selectedPageModule === 'pagination') {
      this.changeClass(modal, 'centered');
      modalContents = <PagePagination updateState={this.updateState} openModal={this.openModalMessage} closeModal={this.checkPage} />
    } else if (this.state.selectedPageModule === 'footer') {
      this.changeClass(modal, 'centered');
      modalContents = <PageFooter updateState={this.updateState} openModal={this.openModalMessage} closeModal={this.checkPage} />
    } else {
      modalContents = null;
    }

    // Message Modal Contents ==================================================
    let secondaryModalContents;
    if (this.state.resStatus) {
      const modalBG = document.querySelector('.init-message-modal-content');
      if (this.state.resStatus === '204') {
        modalBG.classList.remove('fail');
        modalBG.classList.add('success');
        secondaryModalContents = <section>
          <h5 className="init-message-title">{this.state.resMessage}</h5>
        </section>
      } else if (this.state.resStatus === '400') {
        modalBG.classList.add('fail');
        secondaryModalContents = <section>
          <h5 className="init-message-title">Error: {this.state.resMessage}</h5>
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
      /*====================Page Dashboard Panel=======================*/
      <div className="page-block">
        <div className="page-list-wrapper">
          {/*===============Page Module Selection SVG==================*/}
          <svg version="1.1" id="Layer_10" x="0px" y="0px"
             viewBox="0 0 187.4 246.1">
            <g>
              <rect x="0.8" y="1" className="st10 svg-page" width="186" height="244"/>
              <rect x="5.5" y="6" onClick={() => this.checkPage('title')} className="st10 svg-title" width="175.8" height="10.2"/>
              <rect x="5.5" y="20.4" onClick={() => this.checkPage('image')} className="st10 svg-main-img" width="175.8" height="47.6"/>
              <rect x="5.5" y="72.3" onClick={() => this.checkPage('search')} className="st10 svg-search" width="175.8" height="13.7"/>
              <rect x="65.9" y="92.5" className="st10" width="55" height="19.4"/>
              <rect x="5.5" y="92.5" className="st10" width="55" height="19.4"/>
              <rect x="5.5" y="139.3" className="st10" width="55" height="19.4"/>
              <rect x="126.2" y="92.5" className="st10" width="55" height="19.4"/>
              <rect x="65.9" y="115.9" className="st10" width="55" height="19.4"/>
              <rect x="65.9" y="139.3" className="st10" width="55" height="19.4"/>
              <rect x="126.2" y="115.9" className="st10" width="55" height="19.4"/>
              <rect x="5.5" y="115.9" className="st10" width="55" height="19.4"/>
              <rect x="5.5" y="232" onClick={() => this.checkPage('footer')} className="st10 svg-footer" width="175.8" height="10.2"/>
              <rect x="5.5" y="205.1" onClick={() => this.checkPage('pagination')} className="st13 svg-pagination" width="175.8" height="22.9"/>
              <path className="st10 svg-pointer page-hover" onMouseEnter={this.enter} onMouseLeave={this.exit} onClick={() => this.checkPage('pagination')} d="M66.3,222.6h-2.5c-1.9,0-3.5-1.6-3.5-3.5v-4.6c0-1.9,1.6-3.5,3.5-3.5h2.5c1.9,0,3.5,1.6,3.5,3.5v4.6
                C69.8,221.1,68.2,222.6,66.3,222.6z"/>
              <path className="st10 svg-pointer page-hover" onMouseEnter={this.enter} onMouseLeave={this.exit} onClick={() => this.checkPage('pagination')} d="M94.6,222.6h-2.5c-1.9,0-3.5-1.6-3.5-3.5v-4.6c0-1.9,1.6-3.5,3.5-3.5h2.5c1.9,0,3.5,1.6,3.5,3.5v4.6
                C98.1,221.1,96.6,222.6,94.6,222.6z"/>
              <path className="st10 svg-pointer page-hover" onMouseEnter={this.enter} onMouseLeave={this.exit} onClick={() => this.checkPage('pagination')} d="M80.5,222.6H78c-1.9,0-3.5-1.6-3.5-3.5v-4.6c0-1.9,1.6-3.5,3.5-3.5h2.5c1.9,0,3.5,1.6,3.5,3.5v4.6
                C84,221.1,82.4,222.6,80.5,222.6z"/>
              <path className="st10 svg-pointer page-hover" onMouseEnter={this.enter} onMouseLeave={this.exit} onClick={() => this.checkPage('pagination')} d="M108.9,222.6h-2.5c-1.9,0-3.5-1.6-3.5-3.5v-4.6c0-1.9,1.6-3.5,3.5-3.5h2.5c1.9,0,3.5,1.6,3.5,3.5v4.6
                C112.4,221.1,110.9,222.6,108.9,222.6z"/>
              <path className="st10 svg-pointer page-hover" onMouseEnter={this.enter} onMouseLeave={this.exit} onClick={() => this.checkPage('pagination')} d="M123.8,222.6h-2.5c-1.9,0-3.5-1.6-3.5-3.5v-4.6c0-1.9,1.6-3.5,3.5-3.5h2.5c1.9,0,3.5,1.6,3.5,3.5v4.6
                C127.3,221.1,125.7,222.6,123.8,222.6z"/>
              <rect x="155.1" y="212.1" onClick={() => this.checkPage('pagination')} className="st10 svg-pointer page-hover" onMouseEnter={this.enter} onMouseLeave={this.exit} width="20.8" height="9.5"/>
              <line className="st11 svg-pointer page-hover" onMouseEnter={this.enter} onMouseLeave={this.exit} onClick={() => this.checkPage('pagination')} x1="167.5" y1="212.1" x2="167.5" y2="221.6"/>
              <polygon className="st12 svg-pointer page-hover" onMouseEnter={this.enter} onMouseLeave={this.exit} onClick={() => this.checkPage('pagination')} points="174,215.6 171.5,218.1 169,215.6 	"/>
              <rect x="82.4" y="36.3" onClick={() => this.checkPage('image')} className="st11 svg-pointer" width="22.9" height="17.3"/>
              <path className="st11 svg-pointer" onClick={() => this.checkPage('image')} d="M103.7,50.8v0.4c0,0.4-0.3,0.7-0.7,0.7H84.6c-0.4,0-0.8-0.3-0.8-0.7v-1.4l4-5.8c0.1-0.2,0.4-0.3,0.6-0.3
                c0.2,0,0.3,0,0.5,0.1l5.9,4.1l3.2-2.7c0.2-0.2,0.4-0.2,0.6-0.2c0.1,0,0.3,0.1,0.4,0.2L103.7,50.8z"/>
              <circle className="st11 svg-pointer" onClick={() => this.checkPage('image')} cx="99.7" cy="40" r="1.3"/>
            </g>
          </svg>
          {/*============End Page Module Selection SVG=================*/}
        </div>

        {/*==========Action Modal==============*/}
        <div onClick={this.checkModal} className="user-modal">
          <div className="user-modal-content centered">
            <span onClick={() => this.openModal('close')} className="user-modal-close">&times;</span>
            {modalContents}
          </div>
        </div>
        {/*========End Action Modal============*/}

        {/*=========Message Modal==========*/}
        <div onClick={this.openModalMessage} className="init-message-modal">
          <div className="init-message-modal-content">
            <span onClick={this.openModalMessage} className="init-login-modal-close">&times;</span>
            {(this.state.resStatus) && (
              secondaryModalContents
            )}
          </div>
        </div>
        {/*=======End Message Modal=========*/}

      </div>
      /*=================End Page Dashboar Panel============================*/
    );
  }
}



export default DashboardPage;
