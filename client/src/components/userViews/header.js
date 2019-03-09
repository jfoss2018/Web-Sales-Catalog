import React from 'react';

const Header = (props) => {
  return (
    <header>
      {(props.page.showTitle) && (
        <h1 className="page-title">{props.page.title}</h1>
      )}
      <div className="imgborder">
        <img className="header-img" src={props.src} alt="Header" />
      </div>
    </header>
  );
}

export default Header;
