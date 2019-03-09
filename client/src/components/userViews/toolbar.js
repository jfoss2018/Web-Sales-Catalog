import React from 'react';
import SearchApp from './search.js';
import Filter from './filter.js';

const Toolbar = (props) => {
  return(
    <nav>
      <section className="toolbar">
        {(props.page.filter) && (
          <Filter page={props.page} updatePagination={props.updatePagination} filterContents={props.filterContents} updateState={props.updateState} />
        )}
        <SearchApp filterContents={props.filterContents} updatePagination={props.updatePagination} updateState={props.updateState} />
      </section>
    </nav>
  );
}

export default Toolbar;
