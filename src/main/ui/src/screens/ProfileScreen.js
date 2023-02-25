import { Avatar, TextInput } from "react-native-paper";
import React, { useState } from "react";
import { SafeAreaView, StyleSheet, Text } from "react-native";

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export default function ProfileScreen({ navigation }) {
  const [firstname, setFirstname] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [dob, setDob] = useState("");
  const [address, setAddress] = useState("");

  return (
    <KeyboardAwareScrollView style={styles.container}>
      <SafeAreaView style={styles.avatarArea}>
        <Avatar.Image
          size={100}
          style={styles.avatar}
          source={require("../../assets/avatar.png")}
        />
      </SafeAreaView>

      <SafeAreaView style={styles.informationArea}>
        <Text style={styles.text}>Firstname</Text>
        <TextInput
          style={styles.textInput}
          value={firstname}
          mode="flat"
          onChangeText={(firstname) => setFirstname(firstname)}
        />

        <Text style={styles.text}>Surname</Text>
        <TextInput
          style={styles.textInput}
          value={surname}
          mode="outflatlined"
          onChangeText={(surname) => setSurname(surname)}
        />

        <Text style={styles.text}>Email</Text>
        <TextInput
          style={styles.textInput}
          value={email}
          mode="flat"
          onChangeText={(email) => setEmail(email)}
        />

        <Text style={styles.text}>Date of Birth</Text>
        <TextInput
          style={styles.textInput}
          value={dob}
          mode="flat"
          onChangeText={(dob) => setDob(dob)}
        />

        <Text style={styles.text}>Home Address</Text>
        <TextInput
          style={styles.textInput}
          value={address}
          mode="flat"
          onChangeText={(address) => setAddress(address)}
        />
      </SafeAreaView>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#99ccff",
  },
  avatarArea: {
    flexDirection: "column",
    padding: 30,
  },
  avatar: {
    alignSelf: "center",
  },
  informationArea: {
    flexDirection: "column",
    justifyContent: "space-around",
    padding: 20,
  },
  text: {
    fontSize: 10,
  },
  textInput: {
    backgroundColor: "transparent",
    marginBottom: 10,
    height: 40,
  },
});
