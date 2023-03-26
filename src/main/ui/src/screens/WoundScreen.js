import React, { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet, Text } from "react-native";

import { BottomNavigation } from 'react-native-paper';
import { useRoute } from "@react-navigation/native"

const globalStyle = require("../../Style");

export default function WoundScreen({ navigation }) {

  const WoundTracking = () => {
    return (
      <SafeAreaView style={globalStyle.container}>
        <Text>Wound Tracking</Text>
      </SafeAreaView>
    );
  }

  const WoundDetails = () => {
    return (
      <SafeAreaView style={globalStyle.container}>
        <Text>Wound Details</Text>
      </SafeAreaView>
    );
  }

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'woundTracking', title: 'Wound Tracking', focusedIcon: 'account-injury', unfocusedIcon: 'account-injury-outline' },
    { key: 'woundDetails', title: 'Wound Details', focusedIcon: 'view-list', unfocusedIcon: 'format-list-bulleted'},
  ]);

  const renderScene = BottomNavigation.SceneMap({
    woundTracking: WoundTracking,
    woundDetails: WoundDetails,
  });

  const route = useRoute()
  const woundId = route.params?.woundId

  return (
    <SafeAreaView style={globalStyle.container}>
      <BottomNavigation
        navigationState={{ index, routes }}
        onIndexChange={setIndex}
        renderScene={renderScene}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  scene: {
    flex: 1,
    backgroundColor: "#99ccff",
    justifyContent: "center",
  },
});
