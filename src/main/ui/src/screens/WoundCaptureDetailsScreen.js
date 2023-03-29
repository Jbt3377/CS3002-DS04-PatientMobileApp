import { ActivityIndicator, Card } from "react-native-paper";
import React, { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { formatDate, formatTime } from "../actions/SharedFunctions";

import { REACT_APP_LOCAL_BACKEND_BASE_URL } from "@env";
import WoundCapture from "../models/WoundCapture";
import { useRoute } from "@react-navigation/native";

const globalStyle = require("../../Style");

export default function WoundCaptureDetailsScreen({ navigation }) {
  const [loading, setLoading] = useState(true);
  const [woundCapture, setWoundCapture, setWoundCaptureProperty] = WoundCapture(
    {
      uid: "",
      woundId: "",
      captureDate: null,
      filename: "",
      c02Value: null,
      isInfected: false,
      base64Image: null,
    }
  );

  const route = useRoute();
  const woundCaptureId = route.params?.woundCaptureId;

  useEffect(() => {
    const fetchWoundCaptureData = async () => {
      const response = await fetch(
        REACT_APP_LOCAL_BACKEND_BASE_URL +
          "/api/woundCapture/getWoundCapture/" +
          woundCaptureId,
        {
          method: "GET",
          headers: {
            "content-type": "application/json",
          },
        }
      );

      const json = await response.json();
      setWoundCaptureInformation(json);
      setLoading(false);
    };

    const unsubscribe = navigation.addListener("focus", async () => {
      fetchWoundCaptureData().catch((error) => {
        console.log("Error retrieving Wound Capture data: " + error.message);
        alert("Error: Couldn't retrieve Wound Capture data");
      });
    });

    return unsubscribe;
  }, []);

  const setWoundCaptureInformation = (json) => {
    setWoundCaptureProperty("woundCaptureId", json.woundCaptureId);
    setWoundCaptureProperty("uid", json.uid);
    setWoundCaptureProperty("woundId", json.woundId);
    setWoundCaptureProperty("captureDate", json.captureDate);
    setWoundCaptureProperty("filename", json.filename);
    setWoundCaptureProperty("c02Value", json.c02Value);
    setWoundCaptureProperty("isInfected", json.isInfected);
    setWoundCaptureProperty("base64Image", json.base64Image);
  };

  const getImageUri = (base64Data) => {
    return `data:image/jpeg;base64,${base64Data}`;
  };

  const renderSummary = () => {
    return (
      <Card style={styles.card}>
        <Card.Cover
          style={styles.cardCover}
          source={{ uri: getImageUri(woundCapture.base64Image) }}
        />
        <Card.Title title={"Wound Capture Summary"} />
        <Card.Content>
          <View style={styles.summaryContainer}>
            <View style={styles.summaryLabelContainer}>
              <Text style={styles.cardText}>Capture Date: </Text>
              <Text style={styles.cardText}>Capture Time: </Text>
              <Text style={styles.cardText}>C02 Reading: </Text>
              <Text style={styles.cardText}>Is Infected: </Text>
            </View>
            <View style={styles.summaryValueContainer}>
              <Text style={styles.cardText}>
                {formatDate(new Date(woundCapture.captureDate))}
              </Text>
              <Text style={styles.cardText}>
                {formatTime(new Date(woundCapture.captureDate))}
              </Text>
              <Text style={styles.cardText}>{woundCapture.c02Value}</Text>
              <Text style={styles.cardText}>
                {woundCapture.isInfected ? "Yes" : "No"}
              </Text>
            </View>
          </View>
          <Text></Text>
        </Card.Content>
      </Card>
    );
  };

  const renderNoDataText = () => {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator animating={true} size={"large"} color={"black"} />
      </SafeAreaView>
    );
  };

  return (
    <SafeAreaView style={globalStyle.container}>
      {loading ? renderNoDataText() : renderSummary()}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#99ccff",
    justifyContent: "center",
  },
  card: {
    margin: 10,
  },
  loadingContainer: {
    padding: 10,
    alignItems: "center",
  },
  loading: {
    fontSize: 20,
    color: "white",
  },
  cardCover: {
    height: 520,
  },
  summaryContainer: {
    flexDirection: "row",
    width: "100%",
    paddingHorizontal: 10,
  },
  summaryLabelContainer: {
    alignItems: "flex-start",
    width: "60%",
  },
  summaryValueContainer: {
    alignItems: "flex-end",
    width: "40%",
  },
  cardText: {
    fontSize: 13,
    marginBottom: 2,
  },
});
