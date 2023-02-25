import { SafeAreaView, StyleSheet, Text, TouchableOpacity } from "react-native";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

export default function WoundSelectScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <SafeAreaView style={styles.addWoundArea}>
        <TouchableOpacity
          style={styles.addWoundBtn}
          onPress={() => navigation.navigate("RegisterWoundScreen")}
        >
          <SafeAreaView style={styles.addWoundBtnContent}>
            <MaterialCommunityIcons
              style={styles.btnIcon}
              name="account-injury-outline"
              size={60}
            />
            <Text style={styles.btnText}>Register a Wound</Text>
          </SafeAreaView>
        </TouchableOpacity>
      </SafeAreaView>

      <SafeAreaView style={styles.selectWoundArea}>
        <TouchableOpacity style={styles.woundBtn}>
          <Text style={styles.btnText}>Wound 1</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.woundBtn}>
          <Text style={styles.btnText}>Wound 1</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.woundBtn}>
          <Text style={styles.btnText}>Wound 1</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#99ccff",
  },
  addWoundArea: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  selectWoundArea: {
    flex: 2,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  addWoundBtn: {
    backgroundColor: "white",
    width: 150,
    height: 150,
    borderRadius: 20,
    justifyContent: "center",
  },
  addWoundBtnContent: {
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
  woundBtn: {
    width: "80%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    backgroundColor: "white",
  },
});
