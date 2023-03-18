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
  if (!prop || wound.injuryMechanism.length === 0) {
    return false;
  }
  return true;
};
