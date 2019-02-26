import React, { Component } from 'react';
import data from '../../data.json';
import MyComponent from './carousel.js';
import ModalBox from './modal.js';
import axios from 'axios';

class Detail extends Component {
  constructor(props) {
    super(props);
      this.state = {
        contents: null,
        loading: true,
        question: ''
      }
  }

  componentDidMount() {
    const path = window.location.pathname;
    const splitPath = path.split('/');
    const item = splitPath.pop();
    //const items = data.items;
    //const detailItem = items.filter(listItem => listItem.id === item)[0];
    //const subImg = detailItem.subImg;

    axios({
      method: 'get',
      url: `/api/v1/contents/${item}`,
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
        contents: response.data.content[0],
        loading: false
      });

    })
    .catch((error) => {
      console.log(error);
    });
  }

  submitQuestion = () => {
    console.log('must do submit question.');
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  checkModalDetail = (e) => {
    const modal = document.querySelector('.user-modal');
    if (e.target === modal) {
      modal.style.display = "none";
      /*this.setState({
        selectedAction: 'empty'
      });*/
    }
  }

  openModalDetail = (e) => {
    const modal = document.querySelector('.user-modal');
    modal.style.display = 'block';
    if (e.target.className === 'user-modal-close') {
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
    let card;
    if (this.state.loading) {
      card = <p>Loading...</p>
    } else {
      card = <section className="detail-section">
        <button className="detail" onClick={() => this.props.browserPath('/')}>Return to Catalog</button>
        <h1 className="detail">{this.state.contents.name}</h1>
        <div className="style-block">
        </div>
        <div className="offerBtn">
          <ModalBox text={"Make Offer"} />
        </div>
        <div className="gallery-wrapper">
          <MyComponent images={this.state.contents.images} />
        </div>
        <p className="price">{this.state.contents.price}</p>
        <p className="bid">Current highest bid: ${'sort from database'}</p>
        <p className="description">{this.state.contents.description}</p>
        <div className="appointmentBtn">
          <ModalBox text={"Schedule Appointment"} />
        </div>
        <p className="question">Have a question about this item?</p>
        <p className="question-2"><button onClick={this.openModalDetail}>Ask Question</button></p>
        <div className="question-div">
        </div>

        <div onClick={this.checkModalDetail} className="user-modal">
          <div className="user-modal-content">
            <span onClick={this.openModalDetail} className="user-modal-close">&times;</span>
            <section className="login-form">
              <h1 className="login-title">Ask Question</h1>
              <p className="login-form-control">Input your question below, and we will do our best to answer it in a timely manner. Thank you for your interest!</p>
              <textarea className="login-form-control" rows="4" type="text" name="question" id="question" onChange={this.handleChange}></textarea>
              <button className="login-form-control" type="button" onClick={this.submitQuestion}>Submit</button>
            </section>
          </div>
        </div>

      </section>
    }


    return(
      <div className="detail-wrapper">
        {card}
      </div>
    );
  }
}

export default Detail;
