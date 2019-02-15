import React, { Component } from 'react';
import Modal from 'react-awesome-modal';
import MaskedInput from 'react-text-mask';
import createNumberMask from 'text-mask-addons/dist/createNumberMask';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export default class ModalBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            startDate: new Date()
        }
        this.handleChange = this.handleChange.bind(this);
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
          <div>
            <label htmlFor="offer">Offer Amount</label>
            {/*<input id="offer" name="offer" type="number" />*/}
            <MaskedInput
              mask={numberMask}
              id="offer"
              name="offer"
            />
          </div>
      } else {
        displayP = 'Please fill out the form below to schedule an appointment. We cannot guarentee an appointment for your preferred time, but we will contact you regarding alternatives and confirm. All appointments are considered daily.';
        displayForm =
          <div className="date-time-div">
            <label htmlFor="appointment">Preferred Meeting Time</label>
            {/*<input id="appointment" name="appointment" type="text" />*/}
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
                    <form className="modal">
                      <label htmlFor="name">Name</label>
                      <input id="name" name="name" type="text" />
                      <label htmlFor="email">Email</label>
                      <input id="email" name="email" type="email" />
                      <label htmlFor="phone">Phone</label>
                      {/*<input id="phone" name="phone" type="number" />*/}
                      <MaskedInput
                        mask={['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
                        id="phone"
                        name="phone"
                      />
                      <label htmlFor="preference">Contact Preference</label>
                      <select id="preference" name="preference">
                        <option value="email">Email</option>
                        <option value="phone">Phone</option>
                      </select>
                      {displayForm}
                      <button className="sub-btn">Submit</button>
                    </form>
                  </div>
                </Modal>
            </section>
        );
    }
}
