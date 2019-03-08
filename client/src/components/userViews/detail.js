import React, { Component } from 'react';
import MyComponent from './carousel.js';
import ModalBox from './modal.js';
import axios from 'axios';
import moment from 'moment';
import { compareValues } from '../../sort.js';

class Detail extends Component {
  constructor(props) {
    super(props);
      this.state = {
        contents: null,
        loading: true,
        question: '',
        highBid: 'No Bids',
        resStatus: null,
        resMessage: null
      }
  }

  updateState = (obj) => {
    this.setState(obj);
  }

  refreshItem = () => {
    const path = window.location.pathname;
    const splitPath = path.split('/');
    const item = splitPath.pop();
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
      let newBid = 'No Bids';
      if (response.data.content.bids.length > 0) {
        const bidArr = response.data.content.bids.sort(compareValues('amountNum', 'desc'));
        const highBid = bidArr[0].amount;
        newBid = highBid;
      }
      this.setState({
        contents: response.data.content,
        loading: false,
        highBid: newBid
      });
    })
    .catch((error) => {
      console.log(error);
      if (error.response.status.toString() === '500') {
        this.props.browserPath('/');
      }
    });
  }

  componentDidMount() {
    this.refreshItem();
  }

  submitQuestion = (e) => {
    axios({
      method: 'post',
      url: `/api/v1/contents/${this.state.contents._id}/questions`,
      /*proxy: {
        host: '127.0.0.1',
        port: 3001
      },*/
      headers: {
        'Content-Type': 'application/json'
      },
      data: {
        question: this.state.question
      }
    })
    .then(response => {
      this.setState({
        contents: response.data.content,
        loading: false,
        question: ''
      });
      const modal = document.querySelector('.user-modal');
      const textareaQ = document.querySelector('#question');
      modal.style.display = 'none';
      textareaQ.value = '';
    })
    .catch((error) => {
      console.log(error);
      this.updateState({
        resStatus: error.response.status.toString(),
        resMessage: 'Oh no! Something has gone wrong. We were not able to process your question.'
      });
      this.openModalMessage();
    });
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  checkModalDetail = (e) => {
    const modal = document.querySelector('.user-modal');
    const textareaQ = document.querySelector('#question');
    if (e.target === modal) {
      modal.style.display = "none";
      textareaQ.value = '';
      /*this.setState({
        selectedAction: 'empty'
      });*/
    }
  }

  openModalDetail = (e) => {
    const modal = document.querySelector('.user-modal');
    const textareaQ = document.querySelector('#question');
    modal.style.display = 'block';
    if (e.target.className === 'user-modal-close') {
      modal.style.display = 'none';
      textareaQ.value = '';
      /*this.setState({
        selectedAction: 'empty'
      });*/
    } else {
      /*this.setState({
        selectedAction: e.target.value
      });*/
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

  render() {
    let secondaryModalContents;
    if (this.state.resStatus) {
      const modalBG = document.querySelector('.init-message-modal-content');
      if (this.state.resStatus === '201') {
        modalBG.classList.remove('fail');
        modalBG.classList.add('success');
        secondaryModalContents = <section>
          <h5 className="init-message-title">{this.state.resMessage}</h5>
        </section>
      } else if (this.state.resStatus === '500') {
        modalBG.classList.add('fail');
        secondaryModalContents = <section>
          <h5 className="init-message-title">Oh no! Something has gone wrong. We were not able to </h5>
        </section>
      }
    }
    /*
    let returnQuestionList = '';
    if (!this.state.loading) {
      const qAndADiv = document.querySelector('.q-and-a-div');
      this.state.contents.questions.map(function(question, i) {
        qAndADiv.innerHTML += <div key={i} className="question-div"><p className="question-p">{question.question}</p><p className="question-date">{moment(question.askDate).format('LLL')}</p></div>
        if (question.answer.answer) {
          qAndADiv.innerHTML += <div className="answer-div"><p className="answer-p">{question.answer.answer}</p><p className="answer-name">{question.answer.answerName}</p><p className="answer-date">{moment(question.answer.answerDate).format('LLL')}</p></div>
        }
      });
      for (let i = 0; i < this.state.contents.quesitons.length; i += 1) {
        returnQuestionList += <div key={i} className="question-div"><p className="question-p">{this.state.contents.questions[i].question}</p><p className="question-date">{moment(this.state.contents.questions[i].askDate).format('LLL')}</p></div>
        if (this.state.contents.questions[i].answer.answer) {
          returnQuestionList += <div className="answer-div"><p className="answer-p">{this.state.contents.questions[i].answer.answer}</p><p className="answer-name">{this.state.contents.questions[i].answer.answerName}</p><p className="answer-date">{moment(this.state.contents.questions[i].answer.answerDate).format('LLL')}</p></div>
        }
      }
    }
    this.state.contents.questions.map(function(question, i) {
      let returnJSX;
      returnJSX = <div classname="q-and-a-wrapper"><div key={i} className="question-div"><p className="question-p">{question.question}</p><p className="question-date">{moment(question.askDate).format('LLL')}</p></div>
      {(question.answer.answer) && (
        returnJSX += <div className="answer-div"><p className="answer-p">{question.answer.answer}</p><p className="answer-name">{question.answer.answerName}</p><p className="answer-date">{moment(question.answer.answerDate).format('LLL')}</p></div>
      )}
      returnJSX += </div>
      return returnJSX;
    })}
*/



    const title = this.props.page.title;
    const message = this.props.page.message;

    let card;
    if (this.state.loading) {
      card = <p>Loading...</p>
    } else {
      card = <section className="detail-section">
        <button className="detail" onClick={() => this.props.browserPath('/')}>Return to Catalog</button>
        <h1 className="detail">{this.state.contents.name}</h1>
        <div className="style-block">
          <p className="bid">Current highest bid: <span className="bid-num">{this.state.highBid}</span></p>
          <div className="offerBtn">
            <ModalBox id={this.state.contents._id} refresh={this.refreshItem} updateState={this.updateState} openModal={this.openModalMessage} text={"Make Offer"} />
          </div>
        </div>
        <div className="gallery-wrapper">
          <div className="imgborder-2">
            <MyComponent images={this.state.contents.images} />
          </div>
        </div>
        <p className="price">{this.state.contents.price}</p>

        <p className="description">{this.state.contents.description}</p>
        <div className="appointmentBtn">
          <ModalBox id={this.state.contents._id} refresh={this.refreshItem} updateState={this.updateState} openModal={this.openModalMessage} text={"Schedule Appointment"} />
        </div>
        <p className="question">Have a question about this item?</p>
        <p className="question-2"><button onClick={this.openModalDetail}>Ask Question</button></p>
        <div className="q-and-a-div">
          {this.state.contents.questions.map(function(question, i) {
            return <div key={i} className="q-and-a-wrapper"><div className="question-div"><p className="question-p">{question.question}</p><p className="question-date">{moment(question.askDate).format('LL')}</p></div>
              {(question.answer.answer) && (<div className="answer-div"><p className="answer-p">{question.answer.answer}</p><p className="answer-name">-{question.answer.answerName}</p><p className="answer-date">{moment(question.answer.answerDate).format('LL')}</p></div>)}</div>
          })}
        </div>

        <div onClick={this.checkModalDetail} className="user-modal">
          <div className="user-modal-content">
            <span onClick={this.openModalDetail} className="user-modal-close">&times;</span>
            <section className="login-form">
              <h1 className="login-title">Ask Question</h1>
              <p className="login-form-control">Input your question below, and we will do our best to answer it in a timely manner. Thank you for your interest!</p>
              <textarea className="textarea-form-control" rows="4" type="text" name="question" id="question" onChange={this.handleChange}></textarea>
              <button className="login-form-control" name="submit-btn" type="button" onClick={this.submitQuestion}>Submit</button>
            </section>
          </div>
        </div>

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

      </section>
    }


    return(
      <div className="detail-wrapper">
        {(this.props.page.showTitle) && (
          <h1 className="page-title-2">{title}</h1>
        )}
        {card}
        {(this.props.page.footer) && (
          <h3 className="page-footer-2">{message}</h3>
        )}
      </div>
    );
  }
}

export default Detail;
