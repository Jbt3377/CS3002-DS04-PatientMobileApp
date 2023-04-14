import {
  isDateOrBoolPropValid,
  isMultiSelectPropValid,
  isStringValid,
} from "../util/ValidationFunctions";

import { useState } from "react";

export default function Wound(initialInformation) {
  const [wound, setWound] = useState(initialInformation);

  const setWoundProperty = (name, value) => {
    setWound((prevState) => ({ ...prevState, [name]: value }));
  };

  const woundModelIsValid = () => {
    return (
      isStringValid(wound.woundType) &&
      isStringValid(wound.woundLocationOnBody) &&
      isDateOrBoolPropValid(wound.injuryDate) &&
      isStringValid(wound.placeOfInjury) &&
      isStringValid(wound.injuryIntent) &&
      isStringValid(wound.injuryActivityStatus) &&
      isStringValid(wound.injuryActivityType) &&
      isMultiSelectPropValid(wound.injuryMechanism) &&
      isDateOrBoolPropValid(wound.injuryDrugOrAlcoholInvolvement)
    );
  };

  return [wound, setWound, setWoundProperty, woundModelIsValid];
}
