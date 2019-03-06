import React, { Component } from 'react';

class Pagination extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }


  render() {

    return (
      <div className="pagination-wrapper">
        <div className="pagination-btn-list">
          <ul>
          </ul>
        </div>
        <div className="pagination-select">
          {(this.props.page.allowChange) && (
            <select>
              <option value="9">9</option>
              <option value="18">18</option>
              <option value="27">27</option>
              <option value="54">54</option>
            </select>
          )}
        </div>
      </div>
    );
  }
}

export default Pagination;
