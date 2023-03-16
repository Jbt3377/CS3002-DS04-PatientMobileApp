import React, { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet, Text, TouchableOpacity } from "react-native";

import FeatherIcon from "react-native-vector-icons/Feather";
import { auth } from "../../Firebase";
import { onAuthStateChanged } from "firebase/auth";

const globalStyle = require("../../Style");

export default function DashboardScreen({ navigation }) {
  const [displayName, setDisplayName] = useState("");

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      const user = auth.currentUser;
      if (user !== null) {
        setDisplayName(user.displayName);
      }
    });
    return unsubscribe;
  }, [navigation]);

  return (
    <SafeAreaView style={globalStyle.container}>
      <SafeAreaView style={styles.welcomeTextContainer}>
        <Text style={styles.welcomeText}>Hello, {displayName}!</Text>
      </SafeAreaView>
      <SafeAreaView style={styles.row}>
        <TouchableOpacity
          style={styles.dashboardBtn}
          onPress={() => navigation.navigate("WoundCaptureScreen")}
        >
          <SafeAreaView style={styles.dashboardOption}>
            <FeatherIcon style={styles.btnIcon} name="camera" size={60} />
            <Text style={styles.btnText}>Take Photo</Text>
          </SafeAreaView>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.dashboardBtn}
          onPress={() => navigation.navigate("WoundSelectScreen")}
        >
          <SafeAreaView style={styles.dashboardOption}>
            <FeatherIcon style={styles.btnIcon} name="list" size={60} />
            <Text style={styles.btnText}>See Records</Text>
          </SafeAreaView>
        </TouchableOpacity>
      </SafeAreaView>

      <SafeAreaView style={styles.row}>
        <TouchableOpacity
          style={styles.dashboardBtn}
          onPress={() => navigation.navigate("ProfileScreen")}
        >
          <SafeAreaView style={styles.dashboardOption}>
            <FeatherIcon style={styles.btnIcon} name="user" size={60} />
            <Text style={styles.btnText}>Edit Profile</Text>
          </SafeAreaView>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.dashboardBtn}
          onPress={() => navigation.navigate("SettingsScreen")}
        >
          <SafeAreaView style={styles.dashboardOption}>
            <FeatherIcon style={styles.btnIcon} name="tool" size={60} />
            <Text style={styles.btnText}>Settings</Text>
          </SafeAreaView>
        </TouchableOpacity>
      </SafeAreaView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  row: {
    justifyContent: "space-evenly",
    flexDirection: "row",
    padding: 10,
  },
  dashboardBtn: {
    backgroundColor: "white",
    width: 150,
    height: 150,
    borderRadius: 20,
    justifyContent: "center",
  },
  dashboardOption: {
    alignItems: "center",
    justifyContent: "center",
  },
  btnIcon: {
    marginBottom: 12,
  },
  btnText: {
    fontWeight: "bold",
    color: "black",
  },
  welcomeTextContainer: {
    alignItems: "center",
  },
  welcomeText: {
    color: "white",
  },
});
