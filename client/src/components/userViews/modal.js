import React, { Component } from 'react';
import Modal from 'react-awesome-modal';
import MaskedInput from 'react-text-mask';
import createNumberMask from 'text-mask-addons/dist/createNumberMask';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';
import { validate } from '../../validate.js';

export default class ModalBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            startDate: new Date()
        }
        this.handleChange = this.handleChange.bind(this);
        this.modalForm = React.createRef();
    }

    submitForm = (e) => {
      e.preventDefault();
      if (this.props.text === 'Make Offer') {
        this.submitBid();
      } else if (this.props.text === 'Schedule Appointment') {
        this.submitAppointment();
      }
    }

    submitAppointment = () => {
      if (validate(this.modalForm)) {
        axios({
          method: 'post',
          url: '/api/v1/appointments',
          /*proxy: {
            host: '127.0.0.1',
            port: 3001
          },*/
          headers: {
            'Content-Type': 'application/json'
          },
          data: {
            name: this.modalForm[0].value,
            email: this.modalForm[1].value,
            phone: this.modalForm[2].value,
            preference: this.modalForm[3].value,
            preferredDate: this.modalForm[4].value,
            preferredTime: this.modalForm[5].value
          }
        })
        .then(response => {
          this.modalForm[0].value = '';
          this.modalForm[1].value = '';
          this.modalForm[2].value = '';
          this.modalForm[4].value = '';
          this.modalForm[5].value = '';
          this.setState({
            startDate: new Date()
          });
          this.props.updateState({
            resStatus: '201',
            resMessage: 'Thank you! Your appointment request has been successfully submitted.'
          });
          this.props.openModal();
          this.closeModal();
        })
        .catch((error) => {
          console.log(error);
          this.props.updateState({
            resStatus: error.response.status.toString(),
            resMessage: 'Oh no! Something has gone wrong. We were not able to process your appointment request.'
          });
          this.props.openModal();
        });
      }
    }

    submitBid = () => {
      if (validate(this.modalForm)) {
        axios({
          method: 'post',
          url: `/api/v1/contents/${this.props.id}/bids`,
          /*proxy: {
            host: '127.0.0.1',
            port: 3001
          },*/
          headers: {
            'Content-Type': 'application/json'
          },
          data: {
            name: this.modalForm[0].value,
            email: this.modalForm[1].value,
            phone: this.modalForm[2].value,
            preference: this.modalForm[3].value,
            amount: this.modalForm[4].value
          }
        })
        .then(response => {
          this.modalForm[0].value = '';
          this.modalForm[1].value = '';
          this.modalForm[2].value = '';
          this.modalForm[4].value = '';
          this.setState({
            startDate: new Date()
          });
          this.props.updateState({
            resStatus: '201',
            resMessage: 'Thank you! Your bid has been successfully submitted.'
          });
          this.props.openModal();
          this.props.refresh();
          this.closeModal();
        })
        .catch((error) => {
          console.log(error);
          this.props.updateState({
            resStatus: error.response.status.toString(),
            resMessage: 'Oh no! Something has gone wrong. We were not able to process your bid.'
          });
          this.props.openModal();
        });
      }
    }

    openModal() {
        this.setState({
            visible : true
        });
    }

    closeModal() {
        this.setState({
            visible : false
        });
    }

    handleChange(date) {
      this.setState({
        startDate: date
      });
    }

    render() {
      const numberMask = createNumberMask({
        prefix: '$',
        allowDecimal: true
      });

      let displayP;
      let displayForm;
      if (this.props.text === 'Make Offer') {
        displayP = 'Please fill out the form below to submit an offer. All offers are considered daily.';
        displayForm =
          <div className="form-group">
            <label htmlFor="offer">Offer Amount</label>
            <MaskedInput
              mask={numberMask}
              id="offer"
              name="offer"
              required
            />
            <span className="invalid-feedback"></span>
          </div>
      } else {
        displayP = 'Please fill out the form below to schedule an appointment. We cannot guarentee an appointment for your preferred time, but we will contact you regarding alternatives and confirm. All appointments are considered daily.';
        displayForm =
          <div className="date-time-div form-group">
            <label htmlFor="appointment">Preferred Meeting Time</label>
            <div className="flex-div">
              <DatePicker
                selected={this.state.startDate}
                onChange={this.handleChange}
                minDate={new Date()}
                id="appointment"
                name="appointment"
              />
              <DatePicker
                selected={this.state.startDate}
                onChange={this.handleChange}
                id="time"
                name="time"
                showTimeSelect
                showTimeSelectOnly
                dateFormat="h:mm aa"
                timeCaption="Time"
              />
            </div>
          </div>
      }

        return (
            <section className="modal-section">
                <input className="offer-btn" type="button" value={this.props.text} onClick={() => this.openModal()} />
                <Modal visible={this.state.visible} effect="fadeInRight" onClickAway={() => this.closeModal()}>
                  <div className="modal-container">
                    <h1>{this.props.text}</h1>
                    <p>{displayP}</p>
                    <button className="close-btn" onClick={() => this.closeModal()}>X</button>
                    <form ref={form => this.modalForm = form} noValidate data-name="modal" className="modal" onSubmit={this.submitForm}>

                      <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input id="name" required name="name" type="text" />
                        <span className="invalid-feedback"></span>
                      </div>

                      <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input id="email" name="email" data-category="email" type="email" />
                        <span id="email-val" className="invalid-feedback email-val"></span>
                      </div>

                      <div className="form-group">
                        <label htmlFor="phone">Phone</label>
                        <MaskedInput
                          mask={['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
                          id="phone"
                          name="phone"
                          type="tel"
                          data-category="phone"
                        />
                        <span id="phone-val" className="invalid-feedback phone-val"></span>
                      </div>

                      <div className="form-group">
                        <label htmlFor="preference">Contact Preference</label>
                        <select id="preference" name="preference">
                          <option value="email">Email</option>
                          <option value="phone">Phone</option>
                        </select>
                        <span className="invalid-feedback"></span>
                      </div>
                      {displayForm}
                      <button className="sub-btn">Submit</button>
                    </form>
                  </div>
                </Modal>
            </section>
        );
    }
}
