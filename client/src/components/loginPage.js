import React from 'react';
import CreateUser from './manageUser/createUser.js';
import Page from './page.js';

const LoginPage = () => {
  return (
    <div className="login-wrapper">
      <CreateUser title={'Register'} />
      <Page />
    </div>
  );
}

export default LoginPage;
