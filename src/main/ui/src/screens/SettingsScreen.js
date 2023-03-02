import { SafeAreaView, StyleSheet } from "react-native";

const globalStyle = require("../../Style");

export default function SettingsScreen({ navigation }) {
  return <SafeAreaView style={globalStyle.container}></SafeAreaView>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#99ccff",
    justifyContent: "center",
  },
});
