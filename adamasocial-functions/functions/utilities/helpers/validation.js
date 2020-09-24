const isEmpty = (string) => {
  if (string.trim() === '') return true;
};

const isEmail = (email) => {
  const regEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (email.match(regEx)) return true;
  else return false;
};

exports.loginValidation = (data) => {
  let errors = {},
  valid;
  if (isEmpty(data.email)) errors.email = 'Must not be empty';
  else if (!isEmail(data.email)) errors.email = 'Must be a valid email';
  if (isEmpty(data.password)) error.password = 'Must not be empty';

  valid = Object.keys(errors).length === 0 ? true : false;
  return { errors, valid };
};

exports.signupValidation = (data) => {
  let errors = {}, valid;
  if (isEmpty(data.email)) {
    errors.email = 'Must not be empty';
  } else if (!isEmail(data.email)) {
    error.email = 'Must be a valid email address';
  }
  if (isEmpty(data.password)) {
    errors.password = 'Must not be empty';
  }
  if (data.password !== data.confirmPassword)
    errors.password = 'Passwords do not match!';
  if (isEmpty(data.handle)) errors.handle = 'Handle cannot be empty';

  valid = Object.keys(errors).length === 0 ? true : false;
  return { errors, valid };
};