import { useState } from "react";

export default function User(initialInformation) {
  const [user, setUser] = useState(initialInformation);

  function handlePatientIdChange(update) {
    setUser({ ...user, patientId: update.target.value });
  }

  function handleUserIdChange(update) {
    setUser({ ...user, uid: update.target.value });
  }

  function handleUsernameChange(update) {
    setUser({ ...user, username: update.target.value });
  }

  function handleEmailChange(update) {
    setUser({ ...user, email: update.target.value });
  }

  function handleFirstnameChange(update) {
    setUser({ ...user, firstname: update.target.value });
  }

  function handleSurnameChange(update) {
    setUser({ ...user, surname: update.target.value });
  }

  function handleDOBChange(update) {
    setUser({ ...user, dob: update.target.value });
  }

  function handleGenderChange(update) {
    setUser({ ...user, gender: update.target.value });
  }

  function handleHomeAddressChange(update) {
    setUser({ ...user, homeAddress: update.target.value });
  }

  return [
    user,
    handlePatientIdChange,
    handleUserIdChange,
    handleUsernameChange,
    handleEmailChange,
    handleFirstnameChange,
    handleSurnameChange,
    handleDOBChange,
    handleGenderChange,
    handleHomeAddressChange,
  ];
}
