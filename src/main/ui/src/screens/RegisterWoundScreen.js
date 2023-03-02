import { Button, TextInput } from "react-native-paper";
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  Touchable,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";

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

  // Wound Location on Body
  const [woundLocationOnBody, setWoundLocationOnBody] = useState("");

  // Injury Date
  const [injuryDate, setInjuryDate] = React.useState(new Date());
  const [injuryDateText, setInjuryDateText] = React.useState("");
  const [injuryDatePickerVisible, setInjuryDatePickerVisible] =
    React.useState(false);

  function showInjuryDatePicker() {
    setInjuryDatePickerVisible(true);
  }

  function onDateSelected(event, value) {
    setInjuryDate(value);
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
  // const [injuryIntent, setInjuryIntent] = useState("");

  return (
    <ScrollView
      style={globalStyle.scrollableContainer}
      keyboardShouldPersistTaps="handled"
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
});
