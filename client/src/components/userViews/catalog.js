import React, { Component } from 'react';
import Item from './item.js';
import axios from 'axios';

class Catalog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contents: null,
      loading: true
    }
  }

  componentDidMount() {
    axios({
      method: 'get',
      url: `/api/v1/contents`,
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
        contents: response.data.contents,
        loading: false
      });

    })
    .catch((error) => {
      console.log(error);
    });
  }

  render() {
    const message = this.props.page.message;
    const browser = this.props.browserPath;
    let itemList;
    if (this.state.loading) {
      itemList = <p>Loading...</p>
    } else {
      itemList = <ul className="catalog">
        {this.state.contents.map(function(item, i) {
          return <Item browserPath={browser} key={i} itemInfo={item} />
        })}
      </ul>
    }
    return(
      <div className="catalog-div">
        {itemList}
        {(this.props.page.footer) && (
          <h3 className="page-footer">{message}</h3>
        )}
      </div>
    );
  }
}

export default Catalog;
