import { SafeAreaView, StyleSheet, Text, TouchableOpacity } from "react-native";

import FeatherIcon from "react-native-vector-icons/Feather";

function DashboardScreen(props) {
  return (
    <SafeAreaView style={styles.container}>
      <SafeAreaView style={styles.row}>
        <TouchableOpacity style={styles.dashboardBtn}>
          <SafeAreaView style={styles.dashboardOption}>
            <FeatherIcon style={styles.btnIcon} name="camera" size={60} />
            <Text style={styles.btnText}>Take Photo</Text>
          </SafeAreaView>
        </TouchableOpacity>

        <TouchableOpacity style={styles.dashboardBtn}>
          <SafeAreaView style={styles.dashboardOption}>
            <FeatherIcon style={styles.btnIcon} name="list" size={60} />
            <Text style={styles.btnText}>See Records</Text>
          </SafeAreaView>
        </TouchableOpacity>
      </SafeAreaView>

      <SafeAreaView style={styles.row}>
        <TouchableOpacity style={styles.dashboardBtn}>
          <SafeAreaView style={styles.dashboardOption}>
            <FeatherIcon style={styles.btnIcon} name="user" size={60} />
            <Text style={styles.btnText}>Edit Profile</Text>
          </SafeAreaView>
        </TouchableOpacity>

        <TouchableOpacity style={styles.dashboardBtn}>
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
  container: {
    flex: 1,
    backgroundColor: "#99ccff",
    justifyContent: "center",
  },
  row: {
    justifyContent: "space-evenly",
    flexDirection: "row",
    padding: 10,
  },
  dashboardBtn: {
    backgroundColor: "#ffffff",
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
});

export default DashboardScreen;
