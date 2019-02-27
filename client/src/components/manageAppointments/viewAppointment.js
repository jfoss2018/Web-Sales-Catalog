import React, { Component } from 'react';
import axios from 'axios';
import moment from 'moment';

class ViewAppointment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      phone: '',
      preference: '',
      postedDate: '',
      preferredDate: '',
      viewed: false
    }

    this.loginForm = React.createRef();
  }

  componentDidMount() {
    axios({
      method: 'get',
      url: `/api/v1/appointments/${this.props.id}`,
      /*proxy: {
        host: '127.0.0.1',
        port: 3001
      },*/
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
      this.setState({
        name: response.data.appointment.name,
        email: response.data.appointment.email,
        phone: response.data.appointment.phone,
        preference: response.data.appointment.preference,
        postedDate: moment.utc(response.data.appointment.postedDate).toDate(),
        preferredDate: moment.utc(response.data.appointment.preferredDate).toDate(),
        viewed: response.data.appointment.viewed
      });
    })
    .catch((error) => {
      console.log(error);
    });
  }

  updateState = (object) => {
    this.setState(object);
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
/*
  pushList = () => {
    this.state.images.push({
      name: this.state.nameNew,
      contentType: this.state.contentTypeNew,
      data: this.state.dataNew
    });
    this.setState({
      update: true
    });
  }
*/
  handleSubmit = (e) => {
    e.preventDefault();
    axios({
      method: 'put',
      url: `/api/v1/appointments/${this.props.id}`,
      /*proxy: {
        host: '127.0.0.1',
        port: 3001
      },*/
      headers: {
        'Content-Type': 'application/json'
      },
      data: {
        viewed: this.state.viewed
      }
    })
    .then(response => {
      console.log(response.data.message);
      /*
      this.loginForm[0].value = '';
      this.loginForm[1].value = '';
      this.loginForm[2].value = '';
      this.loginForm[3].value = '';
      this.loginForm[4].value = '';

      this.setState({
        username: '',
        password: '',
        email: '',
        phone: '',
        authorization: ''
      });
      */
      if (this.props.updateList) {
        this.props.updateList();
      }
    })
    .catch((error) => {
      console.log(error);
    });
  }
/*
  checkModalSecondary = (e) => {
    const modal = document.querySelector('.secondary-modal');
    if (e.target === modal) {
      modal.style.display = "none";*/
      /*this.setState({
        selectedAction: 'empty'
      });*/
  /*  }
}*/

/*  openModalSecondary = (e) => {
    const modal = document.querySelector('.secondary-modal');
    modal.style.display = 'block';
    if (e.target.className === 'secondary-modal-close' || e.target.className === 'img-save-btn') {
      modal.style.display = 'none';*/
      /*this.setState({
        selectedAction: 'empty'
      });*/
/*    } else {*/
      /*this.setState({
        selectedAction: e.target.value
      });*/
  /*  }
}*/

/*  removeImg = (e) => {
    const index = parseInt(e.target.closest('li').dataset.key);
    this.state.images.splice(index, 1);
    this.setState({
      update: true
    });
  }*/

  render() {
    //const delBtn = <button type="button" onClick={this.removeImg} className="img-box">Delete</button>

    return (
      <form ref={form => this.loginForm = form} className="login-form form-grid col-1" onSubmit={this.handleSubmit}>
        <h1 className="login-title">Appointment Details</h1>

        <label className="login-form-control" htmlFor="name">Name</label>
        <input className="login-form-control" disabled readOnly type="text" name="name" value={this.state.name} id="name" onChange={this.handleChange} />
        {/*
        <label className="login-form-control" htmlFor="description">Description</label>
        <textarea rows="4" className="login-form-control" name="description" value={this.state.description} id="description" onChange={this.handleChange}></textarea>
        */}
        <label className="login-form-control" htmlFor="email">Email</label>
        <input className="login-form-control" disabled readOnly type="text" name="email" value={this.state.email} id="email" onChange={this.handleChange} />
        {/*
        <label className="login-form-control" htmlFor="featured">Featured Item</label>
        <input type="checkbox" value={this.state.featured} className="checkbox" checked={this.state.featured} name="featured" id="featured" onChange={this.handleChange} />
        <label className="login-form-control" htmlFor="viewable">Show Item</label>
        <input type="checkbox" value={this.state.viewable} className="checkbox" checked={this.state.viewable} name="viewable" id="viewable" onChange={this.handleChange} />
        */}

        <label className="login-form-control" htmlFor="phone">Phone</label>
        <input className="login-form-control" disabled readOnly type="text" name="phone" value={this.state.phone} id="phone" />
        <label className="login-form-control" htmlFor="preference">Contact Preference</label>
        <input className="login-form-control" disabled readOnly type="text" name="preference" value={this.state.preference} id="preference" />
        <label className="login-form-control" htmlFor="postedDate">Created Date</label>
        <input className="login-form-control" disabled readOnly type="text" name="postedDate" value={moment(this.state.postedDate).format('LLL')} id="postedDate" />
        <label className="login-form-control" htmlFor="preferredDate">Preferred Appointment Date</label>
        <input className="login-form-control" disabled readOnly type="text" name="preferredDate" value={moment(this.state.preferredDate).format('LLL')} id="preferredDate" />


        <label className="login-form-control" htmlFor="viewed">Mark Viewed</label>
        <input type="checkbox" value={this.state.viewed} className="checkbox" checked={this.state.viewed} name="viewed" id="viewed" onChange={this.handleChange} />



        {/*<label className="login-form-control" htmlFor="image-list">Images</label>
        <ul className="login-form-control">
          {(this.state.images.length === 0) && (
            <li>{'<empty>'}</li>
          )}
          {this.state.images.map(function(image, i) {
            return <li className="img-box" data-key={i} key={i}><p className="img-box">{image.name}</p>{delBtn}</li>
          })}
        </ul>
        <button type="button" className="small-btn" onClick={this.openModalSecondary}>Add Image</button>*/}
        <button className="login-form-control" type="submit">Save</button>
        {/*
        <div onClick={this.checkModalSecondary} className="secondary-modal">
          <div className="secondary-modal-content">
            <span onClick={this.openModalSecondary} className="secondary-modal-close">&times;</span>
            <section className="login-form">
              <h1 className="login-title">Add Image</h1>
              <Edit updateState={this.updateState} width={512} height={384} aspectRatio={1.33} quality={.9} btn={'add'} pushList={this.pushList} closeModal={this.openModalSecondary} />
            </section>
          </div>
        </div>
        */}
      </form>
    );
  }
}

export default ViewAppointment;
