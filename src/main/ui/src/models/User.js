import { useState } from "react";

export default function User(initialInformation) {
  const [user, setUser] = useState(initialInformation);

  const setUserProperty = (name, value) => {
    setUser((prevState) => ({ ...prevState, [name]: value }));
  };

  return [user, setUser, setUserProperty];
}
