import React, { Component } from 'react';

class Filter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedOption: null,
      filter: false,
      featured: false,
      htol: false,
      ltoh: false
    }
  }

  handleChange = (selectedOption) => {
    this.setState({ selectedOption });
    console.log(`Option selected:`, selectedOption);
  }

  filterBtn = () => {
    const filterB = document.querySelector('.filter-btn');
    (filterB.classList.contains('pressed-2')) ? filterB.classList.remove('pressed-2') : filterB.classList.add('pressed-2');
    if (filterB.classList.contains('pressed-2')) {
      this.setState({
        filter: true
      });
    } else {
      this.setState({
        filter: false
      });
    }
  }

  dropdown = () => {
    const list = document.querySelector('.dropdown-list');
    const dropBtn = document.querySelector('.drop-btn');
    (list.classList.contains('show')) ? list.classList.remove('show') : list.classList.add('show');
    (list.classList.contains('show')) ? dropBtn.classList.add('pressed') : dropBtn.classList.remove('pressed');
  }

  filterOpt = (e) => {
    (e.target.classList.contains('li-highlight')) ? e.target.classList.remove('li-highlight') : e.target.classList.add('li-highlight');
    if (this.props.page.filterOptions.priceLowToHigh && this.props.page.filterOptions.priceHighToLow && e.target.dataset.name !== 'featured') {
      if (e.target.dataset.name === 'ltoh') {
        e.target.nextElementSibling.classList.remove('li-highlight');
        this.setState({
          ltoh: e.target.classList.contains('li-highlight'),
          htol: false
        });
      } else {
        e.target.previousElementSibling.classList.remove('li-highlight');
        this.setState({
          htol: e.target.classList.contains('li-highlight'),
          ltoh: false
        });
      }
    } else {
      this.updateCurrent(e.target.dataset.name, e.target.classList.contains('li-highlight'));
    }
  }

  updateCurrent = (key, cond) => {
    this.setState({
      [key]: cond
    });
  }

  render() {
    const { selectedOption } = this.state;

    return (
      <div className="filter-div">
        <button onClick={this.filterBtn} name="filter" className="filter-btn">
          <img className="filter-icon" src="/images/filter-dropdown.png" alt="filter icon" />
        </button>

        <div className="dropdown-content">
        <button onClick={this.dropdown} className="drop-btn">
          <img className="filter-icon-arrow" src="/images/dropdown-arrow.png" alt="filter icon arrow" />
        </button>
          <div className="dropdown-list">
            <ul>
              {(this.props.page.filterOptions.featured) && (
                <li onClick={this.filterOpt} data-name="featured" className="filter-li featured-li">Featured</li>
              )}
              {(this.props.page.filterOptions.priceLowToHigh) && (
                <li onClick={this.filterOpt} data-name="ltoh" className="filter-li ltoh-li">Price Low to High</li>
              )}
              {(this.props.page.filterOptions.priceHighToLow) && (
                <li onClick={this.filterOpt} data-name="htol" className="filter-li htol-li">Price High to Low</li>
              )}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default Filter;
