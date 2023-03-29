import {
  ActivityIndicator,
  BottomNavigation,
  Divider,
  List,
  TextInput,
} from "react-native-paper";
import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { formatDate, formatTime } from "../actions/SharedFunctions";

import DatePicker from "../components/DatePicker";
import DialogWithCheckboxes from "../components/DialogWithCheckboxes";
import DialogWithRadioButtons from "../components/DialogWithRadioButtons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { REACT_APP_LOCAL_BACKEND_BASE_URL } from "@env";
import Wound from "../models/Wound";
import { auth } from "../../Firebase";
import { useRoute } from "@react-navigation/native";

const globalStyle = require("../../Style");

export default function WoundScreen({ navigation }) {
  const route = useRoute();
  const woundId = route.params?.woundId;

  const [loading, setLoading] = useState(true);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [wound, setWound, setWoundProperty, woundModelIsValid] = Wound({
    woundId: "",
    uid: "",
    woundType: "",
    woundLocationOnBody: "",
    injuryDate: null,
    placeOfInjury: "",
    injuryIntent: "",
    injuryActivityStatus: "",
    injuryActivityType: "",
    injuryMechanism: [],
    injuryDrugOrAlcoholInvolvement: false,
    assaultLocationDescription: "",
  });
  const [tempWound, setTempWound] = Wound({
    woundId: "",
    uid: "",
    woundType: "",
    woundLocationOnBody: "",
    injuryDate: null,
    placeOfInjury: "",
    injuryIntent: "",
    injuryActivityStatus: "",
    injuryActivityType: "",
    injuryMechanism: [],
    injuryDrugOrAlcoholInvolvement: false,
    assaultLocationDescription: "",
  });
  const [woundCaptures, setWoundCaptures] = useState(null);

  useEffect(() => {
    const fetchWoundData = async () => {
      setLoading(true);

      // Fetch Wound Data
      const woundResponse = await fetch(
        REACT_APP_LOCAL_BACKEND_BASE_URL + "/api/wound/getWound/" + woundId,
        {
          method: "GET",
          headers: {
            "content-type": "application/json",
          },
        }
      );

      // Set Wound
      const woundJson = await woundResponse.json();
      setWoundInformation(woundJson);

      // Fetch Wound Capture Data
      const woundCaptureResponse = await fetch(
        REACT_APP_LOCAL_BACKEND_BASE_URL +
          "/api/woundCapture/findWoundCapturesByUser/" +
          auth.currentUser.uid,
        {
          method: "GET",
          headers: {
            "content-type": "application/json",
          },
        }
      );

      // Sort Wound Capture Data with most recent first
      await woundCaptureResponse.json().then((data) => {
        data.sort((a, b) => new Date(b.captureDate) - new Date(a.captureDate));
        setWoundCaptures(data);
        setLoading(false);
      });
    };

    const unsubscribe = navigation.addListener("focus", async () => {
      fetchWoundData().catch((error) => {
        console.log("Error retrieving wound data: " + error.message);
        alert("Error: Couldn't retrieve wound data");
      });
    });

    return unsubscribe;
  }, []);

  const setWoundInformation = (json) => {
    setWoundProperty("woundId", json.woundId);
    setWoundProperty("uid", json.uid);
    setWoundProperty("woundType", json.woundType);
    setWoundProperty("woundLocationOnBody", json.woundLocationOnBody);
    setWoundProperty("injuryDate", json.injuryDate);
    setWoundProperty("placeOfInjury", json.placeOfInjury);
    setWoundProperty("injuryIntent", json.injuryIntent);
    setWoundProperty("injuryActivityStatus", json.injuryActivityStatus);
    setWoundProperty("injuryActivityType", json.injuryActivityType);
    setWoundProperty("injuryMechanism", json.injuryMechanism);
    setWoundProperty(
      "injuryDrugOrAlcoholInvolvement",
      json.injuryDrugOrAlcoholInvolvement
    );
    setWoundProperty(
      "assaultLocationDescription",
      json.assaultLocationDescription
    );
  };

  // Removed as request timing out retrieving multiple images
  // const getImageUri = (base64Data) => {
  //   return `data:image/jpeg;base64,${base64Data}`;
  // };

  const renderNoWoundCapturesText = () => {
    return (
      <SafeAreaView style={trackingStyles.loadingContainer}>
        <ActivityIndicator animating={true} size={"large"} color={"black"} />
      </SafeAreaView>
    );
  };

  const renderWoundCaptureList = () => {
    return woundCaptures.map((woundCapture) => {
      return (
        <TouchableOpacity
          style={trackingStyles.woundCaptureContainer}
          key={woundCapture.woundCaptureId}
          disabled={isButtonDisabled}
          onPress={() => handleWoundCaptureSelect(woundCapture.woundCaptureId)}
        >
          <List.Item
            key={woundCapture.woundCaptureId}
            title={"Wound Capture"}
            style={trackingStyles.woundCaptureListItem}
            description={"See details"}
            // left={() => <List.Image source={{uri: getImageUri(woundCapture.base64Image)}} />}
            left={() => <List.Icon icon="image" />}
            right={() => (
              <View style={trackingStyles.lastCapture}>
                <Text>{formatDate(new Date(woundCapture.captureDate))}</Text>
                <Text>{formatTime(new Date(woundCapture.captureDate))}</Text>
              </View>
            )}
          />
        </TouchableOpacity>
      );
    });
  };

  const handleWoundCaptureSelect = (woundCaptureId) => {
    console.log("Wound Capture Selected: " + woundCaptureId);
    navigation.navigate("WoundCaptureDetailsScreen", {
      woundCaptureId: woundCaptureId,
    });
  };

  const WoundTracking = () => {
    return (
      <SafeAreaView style={globalStyle.container}>
        <SafeAreaView style={trackingStyles.captureWoundBtnArea}>
          <TouchableOpacity
            style={trackingStyles.captureWoundBtn}
            onPress={() =>
              navigation.navigate("WoundCaptureScreen", { woundId: woundId })
            }
          >
            <SafeAreaView style={trackingStyles.captureWoundBtnContent}>
              <MaterialCommunityIcons
                style={trackingStyles.btnIcon}
                name="camera-outline"
                size={60}
              />
              <Text style={trackingStyles.btnText}>Take Picture</Text>
            </SafeAreaView>
          </TouchableOpacity>
        </SafeAreaView>

        <SafeAreaView style={trackingStyles.woundCapturesArea}>
          <View>
            <View style={trackingStyles.woundCaptureListHeader}>
              <Text style={trackingStyles.woundCaptureHeader}>
                Wound Capture
              </Text>
              <Text style={trackingStyles.recordedHeader}>Recorded</Text>
            </View>
            <View style={trackingStyles.dividerContainer}>
              <Divider style={trackingStyles.divider} />
            </View>
          </View>

          <ScrollView
            style={globalStyle.scrollableContainer}
            keyboardShouldPersistTaps="handled"
            nestedScrollEnabled={true}
          >
            <View style={trackingStyles.woundCaptureListContainer}>
              <List.Section>
                {loading
                  ? renderNoWoundCapturesText()
                  : renderWoundCaptureList()}
              </List.Section>
            </View>
          </ScrollView>
        </SafeAreaView>
      </SafeAreaView>
    );
  };

  /**
   * Method formats Wound Properties of type string
   */
  const formatWoundValue = (value) => {
    const maxLen = 16;
    if (value.length > maxLen) {
      return value.slice(0, maxLen) + "...";
    } else {
      return value;
    }
  };

  /**
   * Method renders formatted Wound Property or Activity Indicator
   */
  const renderWoundValue = (woundValue) => {
    if (loading) {
      return (
        <ActivityIndicator
          animating={true}
          size={12}
          color={"black"}
          style={{ marginBottom: 12 }}
        />
      );
    } else {
      switch (typeof woundValue) {
        case "string":
          return (
            <Text style={overviewStyles.cardText}>
              {formatWoundValue(woundValue)}
            </Text>
          );
        case "object":
          return (
            <Text style={overviewStyles.cardText}>
              {formatDate(woundValue)}
            </Text>
          );
        default:
          return <Text style={overviewStyles.cardText}>{"-"}</Text>;
      }
    }
  };

  /**
   * Method formats Wound Capture property depending on type
   */
  const formatWoundCaptureValue = (value) => {
    if (woundCaptures.length != 0) {
      switch (value) {
        case "captureDate":
          return formatDate(new Date(woundCaptures[0].captureDate));
        case "c02Value":
          return woundCaptures[0].c02Value;
        case "isInfected":
          return woundCaptures[0].isInfected ? "Yes" : "No";
        default:
          return "-";
      }
    } else {
      return "-";
    }
  };

  /**
   * Method renders formatted Wound Capture Property or Activity Indicator
   */
  const renderWoundCaptureValue = (woundCapturePropertyToDisplay) => {
    return (
      <Text style={overviewStyles.cardText}>
        {formatWoundCaptureValue(woundCapturePropertyToDisplay)}
      </Text>
    );
  };

  const renderWoundInformation = () => {
    if (loading) {
      return (
        <ActivityIndicator
          animating={true}
          size={"large"}
          color={"black"}
          style={{ marginTop: 30 }}
        />
      );
    } else {
      return (
        <View style={overviewStyles.cardContents}>
          <View style={overviewStyles.cardContentsLeft}>
            <Text style={overviewStyles.cardText}>Wound Type:</Text>
            <Text style={overviewStyles.cardText}>Wound Location on Body:</Text>
            <Text style={overviewStyles.cardText}>Injury Date:</Text>
            <Text style={overviewStyles.cardText}>Place of Injury:</Text>
            <Text style={overviewStyles.cardText}>Injury Intent:</Text>
            <Text style={overviewStyles.cardText}>Injury Activity Status:</Text>
            <Text style={overviewStyles.cardText}>Injury Activity Type:</Text>
            <Text style={overviewStyles.cardText}>Injury Mechanism:</Text>
            <Text style={overviewStyles.cardText}>
              Drug or Alcohol Involvement:
            </Text>
          </View>
          <View style={overviewStyles.cardContentsRight}>
            {renderWoundValue(wound.woundType)}
            {renderWoundValue(wound.woundLocationOnBody)}
            {renderWoundValue(new Date(wound.injuryDate))}
            {renderWoundValue(wound.placeOfInjury)}
            {renderWoundValue(wound.injuryIntent)}
            {renderWoundValue(wound.injuryActivityStatus)}
            {renderWoundValue(wound.injuryActivityType)}
            {renderWoundValue(wound.injuryMechanism.toString())}
            {renderWoundValue(
              wound.injuryDrugOrAlcoholInvolvement ? "Yes" : "No"
            )}
          </View>
        </View>
      );
    }
  };

  const renderLatestCaptureInformation = () => {
    if (loading) {
      return (
        <ActivityIndicator
          animating={true}
          size={"large"}
          color={"black"}
          style={{ marginVertical: 26 }}
        />
      );
    } else {
      return (
        <View style={overviewStyles.cardContents}>
          <View style={overviewStyles.cardContentsLeft}>
            <Text style={overviewStyles.cardText}>Latest Capture:</Text>
            <Text style={overviewStyles.cardText}>Latest C02 Reading:</Text>
            <Text style={overviewStyles.cardText}>Is Infected:</Text>
          </View>
          <View style={overviewStyles.cardContentsRight}>
            {renderWoundCaptureValue("captureDate")}
            {renderWoundCaptureValue("c02Value")}
            {renderWoundCaptureValue("isInfected")}
          </View>
        </View>
      );
    }
  };

  const WoundOverview = () => {
    return (
      <SafeAreaView style={overviewStyles.scene}>
        <View style={overviewStyles.titleCard}>
          <Text style={overviewStyles.woundTitleText}>
            {wound.woundType} Overview
          </Text>
        </View>

        <View style={overviewStyles.woundDetailsCard}>
          <Text style={overviewStyles.cardTitle}>Wound Information</Text>
          {renderWoundInformation()}
        </View>

        <View style={overviewStyles.trackingSummaryCard}>
          <Text style={overviewStyles.cardTitle}>Tracking Summary</Text>
          {renderLatestCaptureInformation()}
          <TouchableOpacity
            style={overviewStyles.seeLatestWoundCaptureBtn}
            disabled={isButtonDisabled}
            onPress={() =>
              navigation.navigate("WoundCaptureDetailsScreen", {
                woundCaptureId: woundCaptures[0].woundCaptureId,
              })
            }
          >
            <Text style={trackingStyles.btnText}>View Latest Capture</Text>
            <MaterialCommunityIcons
              style={overviewStyles.btnIcon}
              name="arrow-right-circle"
              size={30}
            />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  };

  const handleEnableEditMode = () => {
    setIsButtonDisabled(true);
    setIsEditMode(true);
    setTempWound({ ...wound });
    setIsButtonDisabled(false);
  };

  const handleDiscardChanges = () => {
    setIsButtonDisabled(true);
    setIsEditMode(false);
    setWound({ ...tempWound });
    setIsButtonDisabled(false);
  };

  const handleSaveChanges = async () => {
    setIsButtonDisabled(true);

    await fetch(
      REACT_APP_LOCAL_BACKEND_BASE_URL + "/api/wound/update/" + woundId,
      {
        method: "PUT",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          woundId: wound.woundId,
          uid: wound.uid,
          woundType: wound.woundType,
          woundLocationOnBody: wound.woundLocationOnBody,
          injuryDate: wound.injuryDate,
          placeOfInjury: wound.placeOfInjury,
          injuryIntent: wound.injuryIntent,
          injuryActivityStatus: wound.injuryActivityStatus,
          injuryActivityType: wound.injuryActivityType,
          injuryMechanism: wound.injuryMechanism,
          injuryDrugOrAlcoholInvolvement: wound.injuryDrugOrAlcoholInvolvement,
          assaultLocationDescription: wound.assaultLocationDescription,
        }),
      }
    ).catch((error) => {
      console.log(error.message);
      alert("Error: Couldn't update wound information");
    });

    setIsEditMode(false);
    setIsButtonDisabled(false);
  };

  const WoundDetails = () => {
    return (
      <ScrollView
        style={globalStyle.scrollableContainer}
        keyboardShouldPersistTaps="none"
        nestedScrollEnabled={true}
      >
        <SafeAreaView style={detailsStyles.scene}>
          <SafeAreaView style={detailsStyles.inputContainer}>
            <Text style={detailsStyles.dropDownComponentText}>
              Wound Type
              <Text style={detailsStyles.requiredAsterisk}>
                {isEditMode ? " *" : ""}
              </Text>
            </Text>
            <DialogWithRadioButtons
              dialogOptions={"woundTypes"}
              onSelectValue={(value) => setWoundProperty("woundType", value)}
              currentValue={wound.woundType}
              isEditMode={isEditMode}
            />
          </SafeAreaView>

          <SafeAreaView style={detailsStyles.inputContainer}>
            <Text style={detailsStyles.textComponentText}>
              Wound Location On Body
              <Text style={detailsStyles.requiredAsterisk}>
                {isEditMode ? " *" : ""}
              </Text>
            </Text>
            <TextInput
              outlineColor={"black"}
              placeholder={"E.g. Arm"}
              value={wound.woundLocationOnBody}
              mode="outlined"
              editable={isEditMode}
              onChangeText={(value) =>
                setWoundProperty("woundLocationOnBody", value)
              }
            />
          </SafeAreaView>

          <SafeAreaView style={detailsStyles.inputContainer}>
            <Text style={detailsStyles.textComponentText}>
              Injury Date
              <Text style={detailsStyles.requiredAsterisk}>
                {isEditMode ? " *" : ""}
              </Text>
            </Text>
            <DatePicker
              dateValue={wound.injuryDate}
              setDateValue={(value) =>
                setWoundProperty("injuryDate", new Date(value))
              }
              isEditMode={isEditMode}
            />
          </SafeAreaView>

          <SafeAreaView style={detailsStyles.inputContainer}>
            <Text style={detailsStyles.textComponentText}>
              Place of Injury
              <Text style={detailsStyles.requiredAsterisk}>
                {isEditMode ? " *" : ""}
              </Text>
            </Text>
            <TextInput
              outlineColor={"black"}
              placeholder={"E.g. Educational establishment"}
              value={wound.placeOfInjury}
              mode="outlined"
              editable={isEditMode}
              onChangeText={(value) => setWoundProperty("placeOfInjury", value)}
            />
          </SafeAreaView>

          <SafeAreaView style={detailsStyles.inputContainer}>
            <Text style={detailsStyles.textComponentText}>
              Injury Intent
              <Text style={detailsStyles.requiredAsterisk}>
                {isEditMode ? " *" : ""}
              </Text>
            </Text>
            <TextInput
              outlineColor={"black"}
              placeholder={"E.g. Non-intentional, Self-harm"}
              value={wound.injuryIntent}
              mode="outlined"
              editable={isEditMode}
              onChangeText={(value) => setWoundProperty("injuryIntent", value)}
            />
          </SafeAreaView>

          <SafeAreaView style={detailsStyles.inputContainer}>
            <Text style={detailsStyles.textComponentText}>
              Injury Activity Status
              <Text style={detailsStyles.requiredAsterisk}>
                {isEditMode ? " *" : ""}
              </Text>
            </Text>
            <TextInput
              outlineColor={"black"}
              placeholder={"E.g. Recreational Exercise"}
              value={wound.injuryActivityStatus}
              mode="outlined"
              editable={isEditMode}
              onChangeText={(value) =>
                setWoundProperty("injuryActivityStatus", value)
              }
            />
          </SafeAreaView>

          <SafeAreaView style={detailsStyles.inputContainer}>
            <Text style={detailsStyles.textComponentText}>
              Injury Activity Type
              <Text style={detailsStyles.requiredAsterisk}>
                {isEditMode ? " *" : ""}
              </Text>
            </Text>
            <TextInput
              outlineColor={"black"}
              placeholder={"E.g. Ascending Stairs"}
              value={wound.injuryActivityType}
              mode="outlined"
              editable={isEditMode}
              onChangeText={(value) =>
                setWoundProperty("injuryActivityType", value)
              }
            />
          </SafeAreaView>

          <SafeAreaView style={detailsStyles.inputContainer}>
            <Text style={detailsStyles.dropDownComponentText}>
              Injury Mechanism
              <Text style={detailsStyles.requiredAsterisk}>
                {isEditMode ? " *" : ""}
              </Text>
            </Text>
            <DialogWithCheckboxes
              checkboxOptions={"injuryMechanisms"}
              onConfirmValues={(selectedValues) =>
                setWoundProperty("injuryMechanism", selectedValues)
              }
              currentValues={wound.injuryMechanism}
              isEditMode={isEditMode}
            />
          </SafeAreaView>

          <SafeAreaView style={detailsStyles.inputContainer}>
            <Text style={detailsStyles.dropDownComponentText}>
              Injury Drug or Alcohol Involvement
              <Text style={detailsStyles.requiredAsterisk}>
                {isEditMode ? " *" : ""}
              </Text>
            </Text>
            <DialogWithRadioButtons
              dialogOptions={"yesOrNo"}
              onSelectValue={(value) =>
                setWoundProperty("injuryDrugOrAlcoholInvolvement", value)
              }
              currentValue={wound.injuryDrugOrAlcoholInvolvement}
              isEditMode={isEditMode}
            />
          </SafeAreaView>

          {wound.injuryDrugOrAlcoholInvolvement && (
            <SafeAreaView style={detailsStyles.inputContainer}>
              <Text style={detailsStyles.textComponentText}>
                Assault Location Description
              </Text>
              <TextInput
                outlineColor={"black"}
                placeholder={"Provide further details..."}
                value={wound.assaultLocationDescription}
                mode="outlined"
                editable={isEditMode}
                onChangeText={(value) =>
                  setWoundProperty("assaultLocationDescription", value)
                }
              />
            </SafeAreaView>
          )}

          <SafeAreaView style={detailsStyles.btnArea}>
            {!isEditMode && (
              <TouchableOpacity
                style={detailsStyles.optionBtn}
                onPress={() => handleEnableEditMode()}
                disabled={isButtonDisabled}
              >
                <Text style={detailsStyles.optionBtnText}>Edit Details</Text>
              </TouchableOpacity>
            )}

            {!isEditMode && (
              <TouchableOpacity
                style={detailsStyles.optionBtn}
                onPress={() => console.log("Delete Pressed")}
                disabled={isButtonDisabled}
              >
                <Text style={detailsStyles.optionBtnText}>Delete Wound</Text>
              </TouchableOpacity>
            )}

            {isEditMode && (
              <TouchableOpacity
                style={detailsStyles.saveChangesBtn}
                onPress={() => handleSaveChanges()}
                disabled={isButtonDisabled}
              >
                <Text style={detailsStyles.saveOrDiscardBtnText}>
                  Save Changes
                </Text>
                <MaterialCommunityIcons name="check-circle" size={20} />
              </TouchableOpacity>
            )}

            {isEditMode && (
              <TouchableOpacity
                style={detailsStyles.discardChangesBtn}
                onPress={() => handleDiscardChanges()}
                disabled={isButtonDisabled}
              >
                <Text style={detailsStyles.saveOrDiscardBtnText}>
                  Discard Changes
                </Text>
                <MaterialCommunityIcons name="close-circle" size={20} />
              </TouchableOpacity>
            )}
          </SafeAreaView>
        </SafeAreaView>
      </ScrollView>
    );
  };

  const [index, setIndex] = useState(1);
  const [routes] = useState([
    {
      key: "woundTracking",
      title: "Tracking",
      focusedIcon: "camera",
      unfocusedIcon: "camera-outline",
    },
    {
      key: "woundOverview",
      title: "Overview",
      focusedIcon: "account-injury",
      unfocusedIcon: "account-injury-outline",
    },
    {
      key: "woundDetails",
      title: "Edit Info",
      focusedIcon: "view-list",
      unfocusedIcon: "format-list-bulleted",
    },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    woundTracking: WoundTracking,
    woundOverview: WoundOverview,
    woundDetails: WoundDetails,
  });

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

const overviewStyles = StyleSheet.create({
  scene: {
    flex: 1,
    backgroundColor: "#99ccff",
    alignItems: "center",
  },
  titleCard: {
    backgroundColor: "red",
    width: "90%",
    height: 60,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    marginBottom: 30,
  },
  woundDetailsCard: {
    backgroundColor: "white",
    width: "90%",
    height: 270,
    borderRadius: 10,
    justifyContent: "flex-start",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 20,
  },
  trackingSummaryCard: {
    backgroundColor: "white",
    width: "90%",
    height: 195,
    borderRadius: 10,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  woundTitleText: {
    fontWeight: "bold",
    color: "black",
    fontSize: 20,
  },
  cardTitle: {
    fontWeight: "bold",
    color: "black",
    fontSize: 16,
    marginTop: 10,
  },
  cardContents: {
    flexDirection: "row",
    width: "100%",
    marginTop: 10,
    paddingHorizontal: 5,
  },
  cardContentsLeft: {
    alignItems: "flex-start",
    width: "60%",
    padding: 10,
  },
  cardContentsRight: {
    alignItems: "flex-end",
    width: "40%",
    padding: 10,
  },
  cardText: {
    fontSize: 13,
    marginBottom: 5,
  },
  seeLatestWoundCaptureBtn: {
    backgroundColor: "red",
    width: "80%",
    height: 50,
    borderRadius: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  btnIcon: {
    marginLeft: 10,
  },
});

const trackingStyles = StyleSheet.create({
  captureWoundBtnArea: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  captureWoundBtn: {
    backgroundColor: "white",
    width: 150,
    height: 150,
    borderRadius: 20,
    justifyContent: "center",
  },
  captureWoundBtnContent: {
    alignItems: "center",
    justifyContent: "center",
  },
  woundCapturesArea: {
    flex: 2,
  },
  btnIcon: {
    marginBottom: 12,
  },
  btnText: {
    fontWeight: "bold",
    color: "black",
  },
  woundCaptureListHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  woundCaptureHeader: {
    paddingLeft: 25,
  },
  recordedHeader: {
    paddingRight: 30,
  },
  dividerContainer: {
    alignItems: "center",
  },
  divider: {
    backgroundColor: "white",
    width: "90%",
    marginTop: 10,
  },
  woundCaptureListContainer: {
    padding: 10,
  },
  lastCapture: {
    alignItems: "flex-end",
  },
  woundCaptureContainer: {
    borderRadius: 15,
    height: 70,
    backgroundColor: "white",
    marginBottom: 10,
  },
  woundCaptureListItem: {
    paddingHorizontal: 10,
  },
  loadingContainer: {
    padding: 10,
    alignItems: "center",
  },
  loading: {
    fontSize: 20,
    color: "white",
  },
});

const detailsStyles = StyleSheet.create({
  scene: {
    flex: 1,
    backgroundColor: "#99ccff",
    justifyContent: "flex-start",
    padding: 20,
  },
  inputContainer: {
    marginBottom: 10,
  },
  dropDownComponentText: {
    fontSize: 12,
    marginBottom: 5,
  },
  textComponentText: {
    fontSize: 12,
  },
  datePickerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  datePickerTextInput: {
    width: "83%",
  },
  datePickerPressable: {
    backgroundColor: "white",
    borderColor: "black",
    width: 50,
    height: 50,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 5,
  },
  datePicker: {
    justifyContent: "center",
    alignItems: "flex-start",
    width: 320,
    height: 260,
    display: "flex",
  },
  requiredAsterisk: {
    fontSize: 12,
    color: "red",
  },
  btnArea: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 10,
  },
  optionBtnText: {
    fontWeight: "bold",
    color: "black",
  },
  saveOrDiscardBtnText: {
    fontWeight: "bold",
    color: "black",
    marginRight: 5,
  },
  optionBtn: {
    width: "45%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    backgroundColor: "white",
  },
  saveChangesBtn: {
    width: "45%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    backgroundColor: "green",
    flexDirection: "row",
  },
  discardChangesBtn: {
    width: "45%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    backgroundColor: "red",
    flexDirection: "row",
  },
  btnIcon: {
    marginLeft: 20,
  },
});
