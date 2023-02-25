import {
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";

import { TextInput } from "react-native-paper";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <SafeAreaView style={styles.container}>
      <SafeAreaView style={styles.logoArea}>
        <Image
          style={styles.image}
          source={require("../../assets/MedicalCross.png")}
        />
      </SafeAreaView>

      <StatusBar style="auto" />

      <SafeAreaView style={styles.textInputArea}>
        <TextInput
          style={styles.textInput}
          mode="outlined"
          placeholder="Email"
          placeholderTextColor="#003f5c"
          onChangeText={(email) => setEmail(email)}
        />
        <TextInput
          style={styles.textInput}
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
        <TouchableOpacity
          style={styles.loginBtn}
          onPress={() => navigation.navigate("Dashboard")}
        >
          <Text style={styles.loginBtnText}>LOGIN</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#99ccff",
    justifyContent: "center",
  },
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
    marginTop: 40,
    backgroundColor: "white",
  },
  loginBtnText: {
    fontWeight: "bold",
    color: "black",
  },
});
