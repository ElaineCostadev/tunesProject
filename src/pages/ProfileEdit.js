import React, { Component } from 'react';
import Header from '../components/Header';
import { /* Link */ } from 'react-router-dom';

class ProfileEdit extends Component {
  render() {
    return (
      <div data-testid="page-profile-edit">
        <Header />
        <h2>ProfileEdit</h2>
        {/*  <Link to="/profile/edit">ProfileEdit</Link> */}
      </div>
    );
  }
}
export default ProfileEdit;
