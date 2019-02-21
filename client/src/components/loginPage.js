import React from 'react';
import Login from './login.js';
import Page from './page.js';

const LoginPage = () => {
  return (
    <div className="login-wrapper">
      <Login title={'Register'} />
      <Page />
    </div>
  );
}

export default LoginPage;
