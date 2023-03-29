import { ActivityIndicator, Avatar, TextInput } from "react-native-paper";
import React, { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet, Text, TouchableOpacity } from "react-native";
import { signOut, updateProfile } from "firebase/auth";

import DatePicker from "../components/DatePicker";
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
  const [loading, setLoading] = useState(true);

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
        console.log("Error: " + error.message);
        alert("Error: Could not sign out");
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
    setIsButtonDisabled(false);
  };

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
          setLoading(false);
        })
        .catch((error) => {
          console.log(error.message);
          alert("Error: Couldn't retrieve patient information");
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
      console.log(error.message);
      alert("Error: Could not update user information");
    });

    await fetch(
      REACT_APP_LOCAL_BACKEND_BASE_URL +
        "/api/patient/update/" +
        user.patientId,
      {
        method: "PUT",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          uid: user.uid,
          firstname: user.firstname,
          surname: user.surname,
          dob: user.dob,
          gender: user.gender,
          homeAddress: user.homeAddress,
        }),
      }
    ).catch((error) => {
      console.log(error.message);
      alert("Error: Couldn't retrieve update Patient Information");
    });

    setIsEditMode(false);
    setIsButtonDisabled(false);
  };

  /**
   * Method accepts JSON response and updates the User props
   */
  const setPatientInformation = (jsonResponse) => {
    setUserProperty("patientId", jsonResponse.patientId);
    setUserProperty("uid", jsonResponse.uid);
    setUserProperty("firstname", jsonResponse.firstname);
    setUserProperty("surname", jsonResponse.surname);
    setUserProperty("dob", jsonResponse.dob);
    setUserProperty("gender", jsonResponse.gender);
    setUserProperty("homeAddress", jsonResponse.homeAddress);
  };

  if (loading) {
    return (
      <SafeAreaView style={globalStyle.container}>
        <ActivityIndicator
          animating={true}
          size={"large"}
          color={"black"}
        />
      </SafeAreaView>
      
    );
  } else {
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
              editable={isEditMode}
            />
          </SafeAreaView>

          <SafeAreaView style={globalStyle.fieldContainer}>
            <Text style={globalStyle.textInputLabel}>Date of Birth</Text>
            <DatePicker
              dateValue={user.dob}
              setDateValue={(value) => setUserProperty("dob", new Date(value))}
              isEditMode={isEditMode}
            />
          </SafeAreaView>

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
