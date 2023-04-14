export const isStringValid = (prop) => {
  if (!prop || prop.length === 0) {
    return false;
  }
  return true;
};

export const isDateOrBoolPropValid = (prop) => {
  if (typeof prop === "undefined" || prop === null) {
    return false;
  }
  return true;
};

export const isMultiSelectPropValid = (prop) => {
  if (!prop || prop.length === 0) {
    return false;
  }
  return true;
};

export const isValidPassword = (password) => {
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/;
  return regex.test(password);
};
