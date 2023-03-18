import { useState } from "react";

export default function Wound(initialInformation) {
  const [wound, setWound] = useState(initialInformation);

  const setWoundProperty = (name, value) => {
    setWound((prevState) => ({ ...prevState, [name]: value }));
  };

  return [wound, setWound, setWoundProperty];
}
