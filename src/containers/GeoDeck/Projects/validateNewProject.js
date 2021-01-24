// only for demo
const validate = (values) => {
  const errors = {};

  const requiredFields = ["title", "url", "password"];

  requiredFields.forEach((field) => {
    if (!values[field]) {
      errors[field] = `${field} field shouldn’t be empty`;
    }
  });

  return errors;
};

export default validate;
