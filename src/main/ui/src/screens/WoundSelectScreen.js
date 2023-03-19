import { Divider, List } from "react-native-paper";
import React, { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { REACT_APP_LOCAL_BACKEND_BASE_URL } from "@env";
import { auth } from "../../Firebase";
import { formatDate } from "../actions/SharedFunctions";

const globalStyle = require("../../Style");

export default function WoundSelectScreen({ navigation }) {
  const [wounds, setWounds] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchWounds = async () => {
      const response = await fetch(
        REACT_APP_LOCAL_BACKEND_BASE_URL +
          "/api/wound/findWounds/" +
          auth.currentUser.uid,
        {
          method: "GET",
          headers: {
            "content-type": "application/json",
          },
        }
      );
      const json = await response.json();
      setWounds(json);
      setLoading(false);
    };

    fetchWounds();
  }, []);

  const renderWoundList = () => {
    return wounds.map((wound) => {
      return (
        <TouchableOpacity style={styles.woundContainer}>
          <List.Item
            title={wound.woundType}
            description={wound.woundLocationOnBody}
            style={styles.listItem}
            left={() => <List.Icon icon="account-injury-outline" />}
            right={() => <Text>{formatDate(new Date(wound.injuryDate))}</Text>}
          />
        </TouchableOpacity>
        
      )
    })
  };

  return (
    <SafeAreaView style={globalStyle.container}>
      <SafeAreaView style={styles.addWoundArea}>
        <TouchableOpacity
          style={styles.addWoundBtn}
          onPress={() => navigation.navigate("RegisterWoundScreen")}
        >
          <SafeAreaView style={styles.addWoundBtnContent}>
            <MaterialCommunityIcons
              style={styles.btnIcon}
              name="plus"
              size={60}
            />
            <Text style={styles.btnText}>Register a Wound</Text>
          </SafeAreaView>
        </TouchableOpacity>
      </SafeAreaView>

      <View style={styles.woundListHeader}>
        <Text style={styles.woundDetails}>Wound Details</Text>
        <Text style={styles.lastCapture}>Last Capture</Text>
      </View>
      <KeyboardAwareScrollView style={styles.scrollableContainer}>
        <View style={styles.woundListContainer}>
          <List.Section>
            {loading ? <Text>...</Text> : renderWoundList()}
          </List.Section>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  scrollableContainer: {
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
  woundContainer: {
    borderRadius: 15,
    height: 60,
    marginBottom: 10,
    backgroundColor: "white",
  },
  woundListHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  woundDetails: {
    paddingLeft: 15,
  },
  lastCapture: {
    paddingRight: 30,
  },
  woundListContainer: {
    padding: 10,
  },
  listItem: {
    paddingHorizontal: 10,
    marginBottom: 16,

  },
});
