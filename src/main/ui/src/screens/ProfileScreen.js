import { Avatar, TextInput } from "react-native-paper";
import {
  Keyboard,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { onAuthStateChanged, signOut, updateProfile } from "firebase/auth";

import DateTimePicker from "@react-native-community/datetimepicker";
import DialogWithRadioButtons from "../components/DialogWithRadioButtons";
import DropDownPicker from "react-native-dropdown-picker";
import { Dropdown } from "react-native-element-dropdown";
import FeatherIcon from "react-native-vector-icons/Feather";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { REACT_APP_LOCAL_BACKEND_BASE_URL } from "@env";
import { auth } from "../../Firebase";

const globalStyle = require("../../Style");

export default function ProfileScreen({ navigation }) {
  const [isEditMode, setIsEditMode] = useState(false);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [firstname, setFirstname] = useState("");
  const [surname, setSurname] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState(new Date());
  const [dateOfBirthText, setDateOfBirthText] = useState("");
  const [dateOfBirthDatePickerVisible, setDateOfBirthDatePickerVisible] =
    useState(false);
  const [gender, setGender] = useState("");
  const [homeAddress, setHomeAddress] = useState("");

  const [temp, setTemp] = useState([]);

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
   * Method saves a copy of the users details and enables edit mode
   */
  const handleEnableEditMode = () => {
    
  };

  function showDOBPicker() {
    Keyboard.dismiss();
    setDateOfBirthDatePickerVisible(true);
  }

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
    setDateOfBirthText(formatDate(newDate(value)));
  }

  const onGenderOpen = useCallback(() => {
    Keyboard.dismiss();
    setDateOfBirthDatePickerVisible(false);
  }, []);

  const onTextInputPress = useCallback(() => {
    setDateOfBirthDatePickerVisible(false);
  }, []);

  /**
   * Method grabs basic User information and corresponding Patient data on screen load
   */
  useEffect(() => {
    const user = auth.currentUser;

    // Grab User Information
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setEmail(user.email);
        setUsername(user.displayName);
      }
    });

    // Grab Patient Information
    if (user) {
      fetch(
        REACT_APP_LOCAL_BACKEND_BASE_URL +
          "/api/patient/getPatientByUserId/" +
          user.uid,
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
          console.log(error);
          alert("Couldnt retrieve patient information: " + error.message);
        });
    }
  }, []);

  const handleUpdateProfile = () => {
    updateProfile(auth.currentUser, {
      displayName: username,
    })
      .then(() => {
        setIsEditMode(false);
        console.log("User information updated!");
        console.log("User ID: " + auth.currentUser.uid);
        // Todo: Update Patient data
        // fetch("https://localhost:8080/api/patient/update/", {
        //   method: "POST",
        //   headers: {
        //     Accept: 'application/json',
        //     'Content-Type': 'application/json',
        //   }, body: JSON.stringify({

        //   }),
        // })
        //   .then(() => {
        //     setIsEditMode(false)
        //     console.log("User information updated!")
        //     console.log("User ID: " + auth.currentUser.uid)
        //   })
        //   .catch((error) => {
        //     // An error occured
        //     alert(error.message);
        //   });
      })
      .catch((error) => {
        // An error occured
        alert(error.message);
      });
  };

  function setPatientInformation(jsonResponse) {
    setFirstname(jsonResponse.firstname);
    setSurname(jsonResponse.surname);
    setDateOfBirth(Date.parse(jsonResponse.dob));
    // setDateOfBirthText(formatDate(Date.parse(jsonResponse.dob)));
    parseGender(jsonResponse.gender);
    setHomeAddress(jsonResponse.homeAddress);
  }

  function parseGender(responseGender) {
    switch (responseGender) {
      case "Male":
        setGender("male");
        break;
      case "Female":
        setGender("female");
        break;
      case "Nonbinary":
        setGender("nonbinary");
        break;
      case "Other":
        setGender("other");
        break;
    }
  }

  const handleGenderSelect = (value) => {
    setGender(value);
  };

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
            value={email}
            mode="outlined"
            onChangeText={(email) => setEmail(email)}
            onPressIn={onTextInputPress}
            editable={isEditMode}
          />
        </SafeAreaView>

        <SafeAreaView style={globalStyle.fieldContainer}>
          <Text style={globalStyle.textInputLabel}>Username</Text>
          <TextInput
            outlineColor={"black"}
            placeholder={""}
            value={username}
            mode="outlined"
            onChangeText={(username) => setUsername(username)}
            onPressIn={onTextInputPress}
            editable={isEditMode}
          />
        </SafeAreaView>

        <SafeAreaView style={globalStyle.fieldContainer}>
          <Text style={globalStyle.textInputLabel}>Firstname</Text>
          <TextInput
            outlineColor={"black"}
            placeholder={""}
            value={firstname}
            mode="outlined"
            onChangeText={(firstname) => setFirstname(firstname)}
            onPressIn={onTextInputPress}
            editable={isEditMode}
          />
        </SafeAreaView>

        <SafeAreaView style={globalStyle.fieldContainer}>
          <Text style={globalStyle.textInputLabel}>Surname</Text>
          <TextInput
            outlineColor={"black"}
            placeholder={""}
            value={surname}
            mode="outlined"
            onChangeText={(surname) => setSurname(surname)}
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
            value={dateOfBirth}
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
            onSelectValue={handleGenderSelect}
            defaultValue={gender}
            isActivatable={isEditMode}
          />
        </SafeAreaView>

        <SafeAreaView style={globalStyle.fieldContainer}>
          <Text style={globalStyle.textInputLabel}>Home Address</Text>
          <TextInput
            outlineColor={"black"}
            placeholder={""}
            value={homeAddress}
            mode="outlined"
            onChangeText={(homeAddress) => setHomeAddress(homeAddress)}
            onPressIn={onTextInputPress}
            editable={isEditMode}
          />
        </SafeAreaView>
      </SafeAreaView>

      <SafeAreaView style={styles.btnArea}>
        {!isEditMode && (
          <TouchableOpacity
            style={styles.optionBtn}
            onPress={() => setIsEditMode(true)}
          >
            <Text style={styles.optionBtnText}>Edit Profile</Text>
          </TouchableOpacity>
        )}

        {!isEditMode && (
          <TouchableOpacity style={styles.optionBtn} onPress={handleSignOut}>
            <Text style={styles.optionBtnText}>Sign Out</Text>
          </TouchableOpacity>
        )}

        {isEditMode && (
          <TouchableOpacity
            style={styles.saveChangesBtn}
            onPress={handleUpdateProfile}
          >
            <Text style={styles.saveOrDiscardBtnText}>Save Changes</Text>
            <FeatherIcon name="check-circle" size={20} />
          </TouchableOpacity>
        )}

        {isEditMode && (
          <TouchableOpacity
            style={styles.discardChangesBtn}
            onPress={() => setIsEditMode(false)}
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
