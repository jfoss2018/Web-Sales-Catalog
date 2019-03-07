import React, { Component } from 'react';

class Pagination extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }

    this.changePage = this.changePage.bind(this);
  }

  componentDidMount() {
    const select = document.querySelector('#change-select');
    if (select) {
      const selectItems = select.childNodes;
      for (let i = 0; i < selectItems.length; i += 1) {
        selectItems[i].selected = false;
        if (parseInt(this.props.itemsPerPage) === parseInt(selectItems[i].value)) {
          selectItems[i].selected = true;
        }
      }
    }
  }

  changePage = (e) => {
    this.props.updatePagination({
      pageNum: parseInt(e.target.innerHTML)
    });
  }

  handleChange = (e) => {
    this.props.updatePagination({
      itemsPerPage: e.target.value,
      pageNum: 1
    });
  }

  render() {

    let funct = this.changePage;

    return (
      <div className="pagination-wrapper">
        <div className="pagination-btn-list">
          <ul className="page-btn-container">
            {(this.props.btnArr) && (
              this.props.btnArr.map(function(obj, i) {
                return <li key={i}><button className={obj.className} onClick={(obj.className !== 'page-btn-blank') ? funct : ''}>{obj.contents}</button></li>
              })
            )}
          </ul>
        </div>
        <div className="pagination-select">
          {(this.props.page.allowChange) && (
            <select id="change-select" onChange={this.handleChange}>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
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
