import { IconButton, TextInput } from "react-native-paper";
import {
  Keyboard,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import React, { useCallback, useState } from "react";

import DateTimePicker from "@react-native-community/datetimepicker";
import DropDownPicker from "react-native-dropdown-picker";
import FeatherIcon from "react-native-vector-icons/Feather";

const globalStyle = require("../../Style");

export default function RegisterWoundScreen({ navigation }) {
  // Wound Type
  const [woundTypeOpen, setWoundTypeOpen] = useState(false);
  const [woundType, setWoundType] = useState("");
  const [woundTypeList, setWoundTypeList] = useState([
    { label: "Venous Ulcer", value: "venous ulcer" },
    { label: "Arterial Ulcer", value: "arterial ulcer" },
    { label: "Diabetic Foot Ulcer", value: "diabetic foot ulcer" },
    { label: "Pressure Ulcer", value: "pressure ulcer" },
    { label: "Infectious Wound", value: "infectious wound" },
    { label: "Ischemic Wound", value: "ischemic wound" },
    { label: "Surgical Wounds", value: "surgical wounds" },
    {
      label: "Radiation Poisoning Wounds",
      value: "radiation poisoning wounds",
    },
  ]);

  const onWoundTypeOpen = useCallback(() => {
    Keyboard.dismiss();
    setInjuryMechanismOpen(false);
    setInjuryDatePickerVisible(false);
    setInjuryDrugOrAlcoholInvolvementOpen(false);
  }, []);

  // Wound Location on Body
  const [woundLocationOnBody, setWoundLocationOnBody] = useState("");

  // Injury Date
  const [injuryDate, setInjuryDate] = React.useState(new Date());
  const [injuryDateText, setInjuryDateText] = React.useState("");
  const [injuryDatePickerVisible, setInjuryDatePickerVisible] =
    React.useState(false);

  function showInjuryDatePicker() {
    Keyboard.dismiss();
    setWoundTypeOpen(false);
    setInjuryMechanismOpen(false);
    setInjuryDrugOrAlcoholInvolvementOpen(false);
    setInjuryDatePickerVisible(true);
  }

  function onDateSelected(event, value) {
    setInjuryDatePickerVisible(false);

    const tempDate = new Date(value);
    const year = tempDate.getFullYear();
    let month = tempDate.getMonth() + 1;
    let day = tempDate.getDate();

    if (day < 10) day = "0" + day;
    if (month < 10) month = "0" + month;

    const fDate = day + "/" + month + "/" + year;
    setInjuryDateText(fDate);
  }

  // Place of Injury
  const [placeOfInjury, setPlaceOfInjury] = useState("");

  // Injury Intent
  const [injuryIntent, setInjuryIntent] = useState("");

  // Injury Activity Status
  const [injuryActivityStatus, setInjuryActivityStatus] = useState("");

  // Injury Activity Type
  const [injuryActivityType, setInjuryActivityType] = useState("");

  // Injury Mechanism
  const [injuryMechanismOpen, setInjuryMechanismOpen] = useState(false);
  const [injuryMechanism, setInjuryMechanism] = useState([]);
  const [injuryMechanismOptions, setInjuryMechanismOptions] = useState([
    { label: "Blunt Force Trauma", value: "blunt force trauma" },
    { label: "Penetrating Trauma", value: "penetrating trauma" },
    { label: "Thermal Injury", value: "thermal injury" },
    { label: "Chemical Injury", value: "chemical injury" },
    { label: "Radiation Injury", value: "radiation injury" },
    { label: "Electrical Injury", value: "electrical injury" },
    { label: "Overuse Injury", value: "overuse injury" },
  ]);

  const onInjuryMechanismOpen = useCallback(() => {
    Keyboard.dismiss();
    setWoundTypeOpen(false);
    setInjuryDatePickerVisible(false);
    setInjuryDrugOrAlcoholInvolvementOpen(false);
  }, []);

  // Injury Alcohol or Drug Involvement
  const [
    injuryDrugOrAlcoholInvolvementOpen,
    setInjuryDrugOrAlcoholInvolvementOpen,
  ] = useState(false);
  const [injuryDrugOrAlcoholInvolvement, setInjuryDrugOrAlcoholInvolvement] =
    useState();
  const [
    injuryDrugOrAlcoholInvolvementOptions,
    setInjuryDrugOrAlcoholInvolvementOptions,
  ] = useState([
    { label: "Yes", value: true },
    { label: "No", value: false },
  ]);

  const onInjuryAlcoholOrDrugInvolvementOpen = useCallback(() => {
    Keyboard.dismiss();
    setWoundTypeOpen(false);
    setInjuryDatePickerVisible(false);
    setInjuryMechanismOpen(false);
  }, []);

  const onTextInputPress = useCallback(() => {
    setWoundTypeOpen(false);
    setInjuryDatePickerVisible(false);
    setInjuryMechanismOpen(false);
    setInjuryDrugOrAlcoholInvolvementOpen(false);
  }, []);

  // Assault Location Description
  const [asaultLocationDescription, setAsaultLocationDescription] =
    useState("");
  const [showAsaultLocationDescription, setShowAsaultLocationDescription] =
    useState(false);

  function onInjuryAlcoholOrDrugInvolvementChange() {
    if (injuryDrugOrAlcoholInvolvement) {
      setShowAsaultLocationDescription(true);
    } else {
      setShowAsaultLocationDescription(false);
    }
  }

  return (
    <ScrollView
      style={globalStyle.scrollableContainer}
      keyboardShouldPersistTaps="handled"
      nestedScrollEnabled={true}
    >
      <SafeAreaView style={styles.container}>
        <SafeAreaView style={styles.inputContainer}>
          <Text style={styles.dropDownComponentText}>Wound Type</Text>
          <DropDownPicker
            style={styles.dropDownComponent}
            open={woundTypeOpen}
            value={woundType}
            items={woundTypeList}
            setOpen={setWoundTypeOpen}
            setValue={setWoundType}
            setItems={setWoundTypeList}
            listMode="SCROLLVIEW"
            onOpen={onWoundTypeOpen}
          />
        </SafeAreaView>

        <SafeAreaView style={styles.inputContainer}>
          <Text style={styles.textComponentText}>Wound Location On Body</Text>
          <TextInput
            style={styles.textComponent}
            outlineColor={"black"}
            placeholder={"E.g. Arm"}
            value={woundLocationOnBody}
            mode="outlined"
            onChangeText={(woundLocationOnBody) =>
              setWoundLocationOnBody(woundLocationOnBody)
            }
            onPressIn={onTextInputPress}
          />
        </SafeAreaView>

        <SafeAreaView style={styles.inputContainer}>
          <Text style={styles.textComponentText}>Injury Date</Text>
          <SafeAreaView style={styles.datePickerContainer}>
            <TextInput
              style={styles.datePickerTextInput}
              outlineColor={"black"}
              placeholder={"DD/MM/YYYY"}
              value={injuryDateText}
              mode="outlined"
              editable={false}
            />

            <TouchableOpacity
              style={styles.datePickerPressable}
              onPress={showInjuryDatePicker}
            >
              <FeatherIcon name="calendar" size={30} />
            </TouchableOpacity>
          </SafeAreaView>
        </SafeAreaView>

        {injuryDatePickerVisible && (
          <DateTimePicker
            value={injuryDate}
            mode={"date"}
            is24Hour={true}
            onChange={onDateSelected}
            style={styles.datePicker}
          />
        )}

        <SafeAreaView style={styles.inputContainer}>
          <Text style={styles.textComponentText}>Place of Injury</Text>
          <TextInput
            style={styles.textComponent}
            outlineColor={"black"}
            placeholder={"E.g. Educational establishment"}
            value={placeOfInjury}
            mode="outlined"
            onChangeText={(placeOfInjury) => setPlaceOfInjury(placeOfInjury)}
            onPressIn={onTextInputPress}
          />
        </SafeAreaView>

        <SafeAreaView style={styles.inputContainer}>
          <Text style={styles.textComponentText}>Injury Intent</Text>
          <TextInput
            style={styles.textComponent}
            outlineColor={"black"}
            placeholder={"E.g. Non-intentional, Self-harm"}
            value={injuryIntent}
            mode="outlined"
            onChangeText={(injuryIntent) => setInjuryIntent(injuryIntent)}
            onPressIn={onTextInputPress}
          />
        </SafeAreaView>

        <SafeAreaView style={styles.inputContainer}>
          <Text style={styles.textComponentText}>Injury Activity Status</Text>
          <TextInput
            style={styles.textComponent}
            outlineColor={"black"}
            placeholder={"E.g. Recreational Exercise"}
            value={injuryActivityStatus}
            mode="outlined"
            onChangeText={(injuryActivityStatus) =>
              setInjuryActivityStatus(injuryActivityStatus)
            }
            onPressIn={onTextInputPress}
          />
        </SafeAreaView>

        <SafeAreaView style={styles.inputContainer}>
          <Text style={styles.textComponentText}>Injury Activity Type</Text>
          <TextInput
            style={styles.textComponent}
            outlineColor={"black"}
            placeholder={"E.g. Ascending Stairs"}
            value={injuryActivityType}
            mode="outlined"
            onChangeText={(injuryActivityType) =>
              setInjuryActivityType(injuryActivityType)
            }
            onPressIn={onTextInputPress}
          />
        </SafeAreaView>

        <SafeAreaView style={styles.inputContainer}>
          <Text style={styles.dropDownComponentText}>Injury Mechanism</Text>
          <DropDownPicker
            style={styles.dropDownComponent}
            multiple={true}
            mode="BADGE"
            open={injuryMechanismOpen}
            value={injuryMechanism}
            items={injuryMechanismOptions}
            setOpen={setInjuryMechanismOpen}
            setValue={setInjuryMechanism}
            setItems={setInjuryMechanismOptions}
            listMode="SCROLLVIEW"
            onOpen={onInjuryMechanismOpen}
          />
        </SafeAreaView>

        <SafeAreaView style={styles.inputContainer}>
          <Text style={styles.dropDownComponentText}>
            Injury Alcohol or Drug Involvement
          </Text>
          <DropDownPicker
            style={styles.dropDownComponent}
            open={injuryDrugOrAlcoholInvolvementOpen}
            value={injuryDrugOrAlcoholInvolvement}
            items={injuryDrugOrAlcoholInvolvementOptions}
            setOpen={setInjuryDrugOrAlcoholInvolvementOpen}
            setValue={setInjuryDrugOrAlcoholInvolvement}
            setItems={setInjuryDrugOrAlcoholInvolvementOptions}
            listMode="SCROLLVIEW"
            onOpen={onInjuryAlcoholOrDrugInvolvementOpen}
            dropDownDirection="BOTTOM"
            onChangeValue={onInjuryAlcoholOrDrugInvolvementChange}
          />
        </SafeAreaView>

        {showAsaultLocationDescription && (
          <SafeAreaView style={styles.inputContainer}>
            <Text style={styles.textComponentText}>
              Assault Location Description
            </Text>
            <TextInput
              style={styles.textComponent}
              outlineColor={"black"}
              placeholder={"Provide further details..."}
              value={asaultLocationDescription}
              mode="outlined"
              onChangeText={(asaultLocationDescription) =>
                setShowAsaultLocationDescription(asaultLocationDescription)
              }
              onPressIn={onTextInputPress}
            />
          </SafeAreaView>
        )}

        <SafeAreaView style={styles.nextBtnContainer}>
          <IconButton
            icon="arrow-right"
            mode="contained-tonal"
            iconColor={"green"}
            containerColor={"darkseagreen"}
            size={40}
            onPress={() => console.log("Pressed")}
          />
        </SafeAreaView>
      </SafeAreaView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
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
  dropDownComponent: {},
  textComponentText: {
    fontSize: 12,
  },
  textComponent: {},
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
  nextBtnContainer: {
    alignItems: "flex-end",
  },
});
