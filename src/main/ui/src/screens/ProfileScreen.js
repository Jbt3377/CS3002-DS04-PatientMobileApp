import { Avatar, TextInput } from "react-native-paper";
import {
  Keyboard,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { signOut, updateProfile } from "firebase/auth";

import DateTimePicker from "@react-native-community/datetimepicker";
import DialogWithRadioButtons from "../components/DialogWithRadioButtons";
import FeatherIcon from "react-native-vector-icons/Feather";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { REACT_APP_LOCAL_BACKEND_BASE_URL } from "@env";
import User from "../models/User";
import { auth } from "../../Firebase";

const globalStyle = require("../../Style");

export default function ProfileScreen({ navigation }) {
  const [isEditMode, setIsEditMode] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const [dateOfBirthText, setDateOfBirthText] = useState("");
  const [dateOfBirthDatePickerVisible, setDateOfBirthDatePickerVisible] =
    useState(false);

  const [user, setUser, setUserProperty] = User({
    patientId: "",
    uid: "",
    username: "",
    email: "",
    firstname: "",
    surname: "",
    dob: null,
    gender: "",
    homeAddress: "",
  });

  const [tempUser, setTempUser] = User({
    patientId: "",
    uid: "",
    username: "",
    email: "",
    firstname: "",
    surname: "",
    dob: null,
    gender: "",
    homeAddress: "",
  });

  /**
   * Method performs a Sign Out action on current user and returns to Login Screen
   */
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        navigation.navigate("LoginScreen");
        alert("Signed Out");
      })
      .catch((error) => {
        const errorMessage = error.message;
        alert(errorMessage);
      });
  };

  /**
   * Method saves a copy of User details to tempUser
   */
  const handleEnableEditMode = () => {
    setIsButtonDisabled(true);
    setIsEditMode(true);
    setTempUser({ ...user });
    setIsButtonDisabled(false);
  };

  /**
   * Method reverts state of User to the values of tempUser (set upon Edit Mode)
   */
  const handleDiscardChanges = () => {
    setIsButtonDisabled(true);
    setIsEditMode(false);
    setUser({ ...tempUser });
    checkUserDobAndUpdateDobTextAccordingly(user.dob);
    setIsButtonDisabled(false);
  };

  function showDOBPicker() {
    Keyboard.dismiss();
    setDateOfBirthDatePickerVisible(true);
  }

  /**
   * Method accepts a timestamp and returns the date in DD/MM/YYYY format
   */
  function formatDate(tempDate) {
    const year = tempDate.getFullYear();
    let month = tempDate.getMonth() + 1;
    let day = tempDate.getDate();

    if (day < 10) day = "0" + day;
    if (month < 10) month = "0" + month;

    return day + "/" + month + "/" + year;
  }

  function onDateSelected(event, value) {
    setDateOfBirthDatePickerVisible(false);

    if (event.type == "set") {
      setUserProperty("dob", new Date(value));
    }

  }

  /**
   * Callback to close popups when a textInput field is selected
   */
  const onTextInputPress = useCallback(() => {
    setDateOfBirthDatePickerVisible(false);
  }, []);

  /**
   * Method calls process to retrieve User Information on screen load
   */
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      handleGetInformation();
    });

    return unsubscribe;
  }, []);

  const handleGetInformation = async () => {
    const signedInUser = auth.currentUser;

    if (signedInUser) {
      setUserProperty("email", signedInUser.email);
      setUserProperty("username", signedInUser.displayName);

      await fetch(
        REACT_APP_LOCAL_BACKEND_BASE_URL +
          "/api/patient/getPatientByUserId/" +
          signedInUser.uid,
        {
          method: "GET",
          headers: {
            "content-type": "application/json",
          },
        }
      )
        .then((response) => response.json())
        .then((json) => {
          setPatientInformation(json);
        })
        .catch((error) => {
          alert("Couldnt retrieve patient information: " + error.message);
        });
    }
  };

  /**
   * Method performs update on User and Patient details
   */
  const handleSaveChanges = async () => {
    const signedInUser = auth.currentUser;
    setIsButtonDisabled(true);

    updateProfile(signedInUser, {
      displayName: user.username,
    }).catch((error) => {
      alert(error.message);
    });

    const updatedPatientProps = {
      uid: user.uid,
      firstname: user.firstname,
      surname: user.surname,
      dob: user.dob,
      gender: user.gender,
      homeAddress: user.homeAddress,
    };

    await fetch(
      REACT_APP_LOCAL_BACKEND_BASE_URL +
        "/api/patient/update/" +
        user.patientId,
      {
        method: "PUT",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(updatedPatientProps),
      }
    ).catch((error) => {
      console.log(error);
      alert("Couldnt retrieve update Patient Information: " + error.message);
    });

    setIsEditMode(false);
    setIsButtonDisabled(false);
  };

  /**
   * Method accepts JSON response and updates the User props
   */
  function setPatientInformation(jsonResponse) {
    setUserProperty("patientId", jsonResponse.patientId);
    setUserProperty("uid", jsonResponse.uid);
    setUserProperty("firstname", jsonResponse.firstname);
    setUserProperty("surname", jsonResponse.surname);
    setUserProperty("dob", jsonResponse.dob);
    setUserProperty("gender", jsonResponse.gender);
    setUserProperty("homeAddress", jsonResponse.homeAddress);
  }

  /**
   * Set the dateOfBirthText field accordingly based on the User's saved DOB
   */
  checkUserDobAndUpdateDobTextAccordingly = () => {
    if (user.dob == null) {
      setDateOfBirthText("DD/MM/YYYY");
    } else {
      setDateOfBirthText(formatDate(new Date(user.dob)));
    }
  }

  /**
   * useEffect acts as a replacement callback for textInput field showing dateOfBirthText
   */
  useEffect(() => {
    checkUserDobAndUpdateDobTextAccordingly();
  });


  return (
    <KeyboardAwareScrollView style={globalStyle.scrollableContainer}>
      <SafeAreaView style={styles.avatarArea}>
        <Avatar.Image
          size={100}
          style={styles.avatar}
          source={require("../../assets/avatar.png")}
        />
      </SafeAreaView>

      <SafeAreaView style={styles.informationArea}>
        <SafeAreaView style={globalStyle.fieldContainer}>
          <Text style={globalStyle.textInputLabel}>Email</Text>
          <TextInput
            outlineColor={"black"}
            placeholder={""}
            value={user.email}
            mode="outlined"
            onChangeText={(value) => setUserProperty("email", value)}
            onPressIn={onTextInputPress}
            editable={isEditMode}
          />
        </SafeAreaView>

        <SafeAreaView style={globalStyle.fieldContainer}>
          <Text style={globalStyle.textInputLabel}>Username</Text>
          <TextInput
            outlineColor={"black"}
            placeholder={""}
            value={user.username}
            mode="outlined"
            onChangeText={(value) => setUserProperty("username", value)}
            onPressIn={onTextInputPress}
            editable={isEditMode}
          />
        </SafeAreaView>

        <SafeAreaView style={globalStyle.fieldContainer}>
          <Text style={globalStyle.textInputLabel}>Firstname</Text>
          <TextInput
            outlineColor={"black"}
            placeholder={""}
            value={user.firstname}
            mode="outlined"
            onChangeText={(value) => setUserProperty("firstname", value)}
            onPressIn={onTextInputPress}
            editable={isEditMode}
          />
        </SafeAreaView>

        <SafeAreaView style={globalStyle.fieldContainer}>
          <Text style={globalStyle.textInputLabel}>Surname</Text>
          <TextInput
            outlineColor={"black"}
            placeholder={""}
            value={user.surname}
            mode="outlined"
            onChangeText={(value) => setUserProperty("surname", value)}
            onPressIn={onTextInputPress}
            editable={isEditMode}
          />
        </SafeAreaView>

        <SafeAreaView style={globalStyle.fieldContainer}>
          <Text style={globalStyle.textInputLabel}>Date of Birth</Text>
          <SafeAreaView style={globalStyle.datePickerContainer}>
            <TextInput
              style={globalStyle.datePickerTextInput}
              outlineColor={"black"}
              placeholder={"DD/MM/YYYY"}
              value={dateOfBirthText}
              mode="outlined"
              editable={false}
            />

            <TouchableOpacity
              style={globalStyle.datePickerPressable}
              onPress={showDOBPicker}
              disabled={!isEditMode}
            >
              <FeatherIcon name="calendar" size={30} />
            </TouchableOpacity>
          </SafeAreaView>
        </SafeAreaView>

        {dateOfBirthDatePickerVisible && (
          <DateTimePicker
            value={new Date()}
            mode={"date"}
            is24Hour={true}
            onChange={onDateSelected}
            style={globalStyle.datePicker}
          />
        )}

        <SafeAreaView style={globalStyle.fieldContainer}>
          <Text style={globalStyle.dropDownLabel}>Gender</Text>
          <DialogWithRadioButtons
            dialogOptions={"genders"}
            onSelectValue={(value) => setUserProperty("gender", value)}
            currentValue={user.gender}
            isEditMode={isEditMode}
          />
        </SafeAreaView>

        <SafeAreaView style={globalStyle.fieldContainer}>
          <Text style={globalStyle.textInputLabel}>Home Address</Text>
          <TextInput
            outlineColor={"black"}
            placeholder={""}
            value={user.homeAddress}
            mode="outlined"
            onChangeText={(value) => setUserProperty("homeAddress", value)}
            onPressIn={onTextInputPress}
            editable={isEditMode}
          />
        </SafeAreaView>
      </SafeAreaView>

      <SafeAreaView style={styles.btnArea}>
        {!isEditMode && (
          <TouchableOpacity
            style={styles.optionBtn}
            onPress={handleEnableEditMode}
            disabled={isButtonDisabled}
          >
            <Text style={styles.optionBtnText}>Edit Profile</Text>
          </TouchableOpacity>
        )}

        {!isEditMode && (
          <TouchableOpacity
            style={styles.optionBtn}
            onPress={handleSignOut}
            disabled={isButtonDisabled}
          >
            <Text style={styles.optionBtnText}>Sign Out</Text>
          </TouchableOpacity>
        )}

        {isEditMode && (
          <TouchableOpacity
            style={styles.saveChangesBtn}
            onPress={handleSaveChanges}
            disabled={isButtonDisabled}
          >
            <Text style={styles.saveOrDiscardBtnText}>Save Changes</Text>
            <FeatherIcon name="check-circle" size={20} />
          </TouchableOpacity>
        )}

        {isEditMode && (
          <TouchableOpacity
            style={styles.discardChangesBtn}
            onPress={() => handleDiscardChanges()}
            disabled={isButtonDisabled}
          >
            <Text style={styles.saveOrDiscardBtnText}>Discard Changes</Text>
            <FeatherIcon name="x-circle" size={20} />
          </TouchableOpacity>
        )}
      </SafeAreaView>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  avatarArea: {
    flexDirection: "column",
    padding: 30,
  },
  informationArea: {
    flexDirection: "column",
    justifyContent: "space-around",
    paddingHorizontal: 20,
  },
  btnArea: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginTop: 10,
    marginBottom: 20,
  },
  avatar: {
    alignSelf: "center",
  },

  text: {
    fontSize: 10,
  },
  textInput: {
    backgroundColor: "transparent",
    marginBottom: 10,
    height: 40,
  },
  optionBtnText: {
    fontWeight: "bold",
    color: "black",
  },
  saveOrDiscardBtnText: {
    fontWeight: "bold",
    color: "black",
    marginRight: 5,
  },
  optionBtn: {
    width: "45%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    backgroundColor: "white",
  },
  saveChangesBtn: {
    width: "45%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    backgroundColor: "green",
    flexDirection: "row",
  },
  discardChangesBtn: {
    width: "45%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    backgroundColor: "red",
    flexDirection: "row",
  },
  btnIcon: {
    marginLeft: 20,
  },
});
