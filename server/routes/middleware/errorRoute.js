
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

module.exports = { duplicateUser, duplicateItem }