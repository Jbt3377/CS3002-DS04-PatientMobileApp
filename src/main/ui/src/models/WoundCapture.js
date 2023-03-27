import { useState } from "react";

export default function WoundCapture(initialInformation) {
  const [woundCapture, setWoundCapture] = useState(initialInformation);

  const setWoundCaptureProperty = (name, value) => {
    setUser((prevState) => ({ ...prevState, [name]: value }));
  };

  return [woundCapture, setWoundCapture, setWoundCaptureProperty];
}
