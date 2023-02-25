import { SafeAreaView, StyleSheet } from "react-native";

export default function SettingsScreen({ navigation }) {
  return <SafeAreaView style={styles.container}></SafeAreaView>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#99ccff",
    justifyContent: "center",
  },
});
