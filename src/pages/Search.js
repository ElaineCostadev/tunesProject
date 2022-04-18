import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Search extends Component {
  render() {
    return (
      <div data-testid="page-search">
        Search
        <Link to="/search">Search</Link>

      </div>
    );
  }
}
