import React, { Component } from 'react';
import axios from 'axios';


class Pic extends Component {
  constructor() {
    super();
    this.state = {
      src: null
    }
  }

  fetchPic = () => {
    axios({
      method: 'get',
      url: '/api/v1/pic',
      /*proxy: {
        host: '127.0.0.1',
        port: 3001
      },*/
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => {

      /*this.loginForm[0].value = '';
      this.loginForm[1].value = '';
      this.loginForm[2].value = '';
      this.loginForm[3].value = '';*/

      this.setState({
        src: response.data.src
      });
    })
    .catch((error) => {
      console.log(error);
    });
  }

  render() {
    return (
      <div className="test-wrapper">
        <button onClick={this.fetchPic}>Get Pic</button>
        {this.state.src && (
          <img alt="Crop" src={this.state.src} />
        )}
      </div>
    );
  }
}

export default Pic;
