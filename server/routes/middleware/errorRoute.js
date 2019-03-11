
function duplicateUser() {
  const err = new Error('It looks like there is already an account set up with this username.');
  err.status = '409';
  return err;
}

function duplicateItem() {
  const err = new Error('It looks like there is already an item set up with this item name.');
  err.status = '409';
  return err;
}

function login() {
  const err = new Error('Username or Password is not valid.');
  err.status = '401';
  return err;
}

function forbidden() {
  const err = new Error('Unauthorized');
  err.status = '403';
  return err;
}

function delUser() {
  const err = new Error('Cannot delete current user.');
  err.status = '409';
  return err;
}

function authUser() {
  const err = new Error('Cannot decrease authorization level of current user.');
  err.status = '409';
  return err;
}

function loginAuth() {
  const err = new Error('User Authorization Level is not Set.');
  err.status = '401';
  return err;
}

module.exports = { duplicateUser, duplicateItem, login, forbidden, delUser, authUser, loginAuth }
