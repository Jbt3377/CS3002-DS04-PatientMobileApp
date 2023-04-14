import {
  Image,
  Keyboard,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";

import { REACT_APP_LOCAL_BACKEND_BASE_URL } from "@env";
import { TextInput } from "react-native-paper";
import { auth } from "../../Firebase";
import { isValidPassword } from "../util/ValidationFunctions";

const globalStyle = require("../../Style");

export default function LoginScreen({ navigation }) {
  const [isSignInMode, setSignInMode] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [username, setUsername] = useState("");

  /**
   * Listener that performs a SignOut action when the user navigates to the Login Screen
   */
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      signOut(auth);
      setSignInMode(true);
    });

    return unsubscribe;
  }, [navigation]);

  /**
   * Method that performs User Sign Up action
   */
  const handleSignUp = async () => {

    if (isValidPassword(password)){
      alert("Password is invalid. Must have at least 8 characters, an uppercase, a lowercase, a number, and special character");
      return;
    }
    
    if (password !== confirmPassword) {
      alert("Password's do not match");
      return;
    }

    // Create User Action
    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        // Set Username Action
        updateProfile(auth.currentUser, {
          displayName: username,
        })
          .then(async () => {
            // Create Patient Action
            await fetch(
              REACT_APP_LOCAL_BACKEND_BASE_URL + "/api/patient/create",
              {
                method: "POST",
                headers: {
                  "content-type": "application/json",
                },
                body: JSON.stringify({ uid: auth.currentUser.uid }),
              }
            ).catch((error) => {
              console.log(
                "An error occured creating Patient: " + error.message
              );
              alert("Error: Could not create patient profile");
            });

            clearLoginScreenUseStates();

            if (auth.currentUser) {
              navigation.navigate("Dashboard");
            }
          })
          .catch((error) => {
            console.log(error.message);
            alert("Error: Could not set display name");
          });
      })
      .catch((error) => {
        console.log(error.message);
        alert("Error: Could not create user account");
      });
  };

  /**
   * Method that performs User Sign In action
   */
  const handleSignIn = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        clearLoginScreenUseStates();

        if (auth.currentUser) {
          navigation.navigate("Dashboard");
        }
      })
      .catch((error) => {
        console.log("Could not sign in: " + error.message);
        alert("Username or Password Incorrect");
      });
  };

  /**
   * Method that clears Login Screen fields
   */
  function clearLoginScreenUseStates() {
    setEmail("");
    setUsername("");
    setPassword("");
    setConfirmPassword("");
  }

  if (isSignInMode) {
    // Render Sign In Components
    return (
      <SafeAreaView style={globalStyle.container}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View>
            <SafeAreaView style={styles.logoArea}>
              <Image
                style={styles.image}
                source={require("../../assets/MedicalCross.png")}
              />
            </SafeAreaView>

            <SafeAreaView style={styles.textInputArea}>
              <TextInput
                style={styles.textInput}
                value={email}
                mode="outlined"
                placeholder="Email"
                placeholderTextColor="#003f5c"
                onChangeText={(email) => setEmail(email)}
              />
              <TextInput
                style={styles.textInput}
                value={password}
                mode="outlined"
                placeholder="Password"
                placeholderTextColor="#003f5c"
                secureTextEntry={true}
                onChangeText={(password) => setPassword(password)}
              />
            </SafeAreaView>

            <SafeAreaView style={styles.forgotButtonArea}>
              <TouchableOpacity>
                <Text style={styles.forgotBtn}>Forgot Password?</Text>
              </TouchableOpacity>
            </SafeAreaView>

            <SafeAreaView style={styles.loginBtnArea}>
              <TouchableOpacity style={styles.loginBtn} onPress={handleSignIn}>
                <Text style={styles.loginBtnText}>Login</Text>
              </TouchableOpacity>
              <Text style={styles.orText}>or</Text>
              <TouchableOpacity
                style={styles.signUpBtn}
                onPress={() => setSignInMode(false)}
              >
                <Text style={styles.signUpBtnText}>Create an Account</Text>
              </TouchableOpacity>
            </SafeAreaView>
          </View>
        </TouchableWithoutFeedback>
      </SafeAreaView>
    );
  } else {
    // Render Create Account Components
    return (
      <SafeAreaView style={globalStyle.container}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View>
            <SafeAreaView style={styles.logoArea}>
              <Image
                style={styles.image}
                source={require("../../assets/MedicalCross.png")}
              />
            </SafeAreaView>

            <SafeAreaView style={styles.textInputArea}>
              <TextInput
                style={styles.textInput}
                value={email}
                mode="outlined"
                placeholder="Email"
                placeholderTextColor="#003f5c"
                onChangeText={(email) => setEmail(email)}
              />
              <TextInput
                style={styles.textInput}
                value={username}
                mode="outlined"
                placeholder="Username"
                placeholderTextColor="#003f5c"
                onChangeText={(name) => setUsername(name)}
              />
              <TextInput
                style={styles.textInput}
                value={password}
                mode="outlined"
                placeholder="Password"
                placeholderTextColor="#003f5c"
                secureTextEntry={true}
                onChangeText={(password) => setPassword(password)}
              />
              <TextInput
                style={styles.textInput}
                value={confirmPassword}
                mode="outlined"
                placeholder="Confirm Password"
                placeholderTextColor="#003f5c"
                secureTextEntry={true}
                onChangeText={(confirmPassword) =>
                  setConfirmPassword(confirmPassword)
                }
              />
            </SafeAreaView>

            <SafeAreaView style={styles.loginBtnArea}>
              <TouchableOpacity
                style={styles.loginBtn}
                onPress={() => handleSignUp()}
              >
                <Text style={styles.loginBtnText}>Create Account</Text>
              </TouchableOpacity>
              <Text style={styles.orText}>or</Text>
              <TouchableOpacity
                style={styles.signUpBtn}
                onPress={() => setSignInMode(true)}
              >
                <Text style={styles.signUpBtnText}>
                  Sign in with an Existing Account
                </Text>
              </TouchableOpacity>
            </SafeAreaView>
          </View>
        </TouchableWithoutFeedback>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  image: {
    width: 150,
    height: 150,
    marginBottom: 40,
  },
  logoArea: {
    alignItems: "center",
  },
  inputArea: {
    backgroundColor: "#FFC0CB",
    borderRadius: 30,
    height: 45,
    marginBottom: 20,
    alignItems: "center",
  },
  textInputArea: {
    flexDirection: "column",
    justifyContent: "center",
    padding: 20,
  },
  forgotButtonArea: {
    alignItems: "center",
  },
  loginBtnArea: {
    alignItems: "center",
  },
  textInput: {
    backgroundColor: "#f0f8ff",
    marginBottom: 10,
    height: 45,
  },
  forgotBtn: {
    height: 30,
    marginBottom: 30,
  },
  loginBtn: {
    width: "80%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
    backgroundColor: "red",
  },
  loginBtnText: {
    fontWeight: "bold",
    color: "black",
  },
  signUpBtn: {
    width: "60%",
    borderRadius: 25,
    height: 45,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    backgroundColor: "white",
  },
  signUpBtnText: {
    fontWeight: "bold",
    color: "black",
  },
  orText: {
    marginTop: 8,
  },
});
