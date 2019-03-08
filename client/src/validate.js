// Validate.js uses the built in HTML5 form validation when composing
// error messages. This function puts the error messages in custom span element error
// message components.
function validate(form) {
  // HTML5 form validation does not have a field comparison option. Here the password
  // and confirm password feilds are collected for comparison.
  let passwordField;
  let cPasswordField;
  let phoneField;
  let emailField;
  const formLength = form.length;
  for (let i = 0; i < formLength; i += 1) {
    if (form[i].dataset.category === 'password') {
      passwordField = form[i].value;
    } else if (form[i].dataset.category === 'cPassword') {
      cPasswordField = form[i].value;
    } else if (form[i].dataset.category === 'phone') {
      phoneField = form[i].value;
    } else if (form[i].dataset.category === 'email') {
      emailField = form[i].value;
    }
  }
  if (form.checkValidity() === false) {
    // If the form fields are invalid, the corresponding invalid inputs' error span
    // elements are filled and displayed.
    for (let i = 0; i < formLength; i += 1) {
      const elem = form[i];
      const errorLabel = elem.parentNode.querySelector('.invalid-feedback');
      if (errorLabel && elem.nodeName.toLowerCase() !== 'button') {
        if (!elem.validity.valid) {
          errorLabel.style.display = 'inline-block';
          errorLabel.textContent = elem.validationMessage;
        } else {
          errorLabel.style.display = 'none';
          errorLabel.textContent = '';
        }
      }
    }
    testFields(passwordField, cPasswordField, phoneField, emailField, form);
    return false;
  } else {
    // If the form fields are valid, the span elements are emptied, and true is returned.
    for (let i=0; i<formLength; i+=1) {
      const elem = form[i];
      const errorLabel = elem.parentNode.querySelector('.invalid-feedback');
      if (errorLabel && elem.nodeName.toLowerCase() !== 'button') {
        errorLabel.style.display = 'none';
        errorLabel.textContent = '';
      }
    }
    return testFields(passwordField, cPasswordField, phoneField, emailField, form);
  }
}

// Custom field validation tests that will be called whether the HTML form validation
// passes or not.
function testFields(pw, cp, p, e, t) {
  let returnBool = true;
  let phoneBool = true;
  let emailBool = true;
  if (pw && cp) {
    if (pw !== cp) {
      const errorLabel = document.querySelector('.c-pass');
      errorLabel.style.display = 'inline-block';
      errorLabel.textContent = 'The confirm password field must match the password field.';
      returnBool = false;
    }
  }
  if (p) {
    if (!/^\(\d{3}\)\s\d{3}-\d{4}$/.test(p) && !/^([^0-9]*)$/.test(p)) {
      let errorLabel = document.querySelector('.phone-val');
      if (t.dataset.name === 'modal') {
        const elem = t[2];
        errorLabel = elem.parentNode.querySelector('.invalid-feedback');
      }
      errorLabel.style.display = 'inline-block';
      errorLabel.textContent = 'Please complete the phone number.';
      returnBool = false;
      phoneBool = false;
    }
  }
  if (e) {
    if (e !== '' && !/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(e)) {
      let errorLabel = document.querySelector('.email-val');
      if (t.dataset.name === 'modal') {
        const elem = t[1];
        errorLabel = elem.parentNode.querySelector('.invalid-feedback');
      }
      errorLabel.style.display = 'inline-block';
      errorLabel.textContent = 'Please correct invalid email address.';
      returnBool = false;
      emailBool = false;
    }
  }
  if (t.dataset.name === 'modal') {
    if (phoneBool && emailBool) {
      if (p === '' && e === '') {
        const elem = t[1];
        const elem2 = t[2];
        const errorLabel = elem.parentNode.querySelector('.invalid-feedback');
        const errorLabel2 = elem2.parentNode.querySelector('.invalid-feedback');
        errorLabel.style.display = 'inline-block';
        errorLabel2.style.display = 'inline-block';
        errorLabel.textContent = 'Phone or Email required.';
        errorLabel2.textContent = 'Phone or Email required.';
        returnBool = false;
      }
    }
  }
  return returnBool;
}


export { validate };
