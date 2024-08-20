const isValidEmail = (input) => {
  const pattern =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

  return pattern.test(input);
};

const isValidPassword = (input) => {
  const pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;

  return input.match(pattern);
};

const isValidNumber = (input) => {
  const pattern = /^[0-9]+$/;
  return pattern.test(input);
};

export { isValidEmail, isValidPassword, isValidNumber };
