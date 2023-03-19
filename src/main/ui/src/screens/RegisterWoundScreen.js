import { IconButton, TextInput } from "react-native-paper";
import React, { useState } from "react";
import { SafeAreaView, ScrollView, StyleSheet, Text } from "react-native";

import DatePicker from "../components/DatePicker";
import DialogWithCheckboxes from "../components/DialogWithCheckboxes";
import DialogWithRadioButtons from "../components/DialogWithRadioButtons";
import { REACT_APP_LOCAL_BACKEND_BASE_URL } from "@env";
import Wound from "../models/Wound";
import { auth } from "../../Firebase";

const globalStyle = require("../../Style");

export default function RegisterWoundScreen({ navigation }) {
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
    asaultLocationDescription: "",
  });

  /**
   * onChange Method passed to DatePicker Component to update the injuryDate Wound Property
   */
  const setInjuryDateProperty = (value) => {
    setWoundProperty("injuryDate", new Date(value));
  };

  /**
   * onChange Method passed to DialogWithCheckboxes Component to update the injuryMechanism Wound Property
   */
  const setInjuryMechanismProperty = (selectedValues) => {
    setWoundProperty("injuryMechanism", selectedValues);
  };

  const handleSaveWound = async () => {
    setIsButtonDisabled(true);

    // Check validity of Wound properties
    if (!woundModelIsValid()) {
      alert("Not all required fields completed");
      return null;
    }

    // POST Request Action
    await fetch(REACT_APP_LOCAL_BACKEND_BASE_URL + "/api/wound/create", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        uid: auth.currentUser.uid,
        woundType: wound.woundType,
        woundLocationOnBody: wound.woundLocationOnBody,
        injuryDate: wound.injuryDate,
        placeOfInjury: wound.placeOfInjury,
        injuryIntent: wound.injuryIntent,
        injuryActivityStatus: wound.injuryActivityStatus,
        injuryActivityType: wound.injuryActivityType,
        injuryMechanism: wound.injuryMechanism,
        injuryDrugOrAlcoholInvolvement: wound.injuryDrugOrAlcoholInvolvement,
        asaultLocationDescription: wound.asaultLocationDescription,
      }),
    }).catch((error) => {
      alert("An error occured creating Wound: " + error.message);
    });

    navigation.navigate("WoundSelectScreen");
    setIsButtonDisabled(false);
  };

  const setWoundInformation = () => {};

  return (
    <ScrollView
      style={globalStyle.scrollableContainer}
      keyboardShouldPersistTaps="handled"
      nestedScrollEnabled={true}
    >
      <SafeAreaView style={styles.container}>
        <SafeAreaView style={styles.inputContainer}>
          <Text style={styles.dropDownComponentText}>
            Wound Type<Text style={styles.requiredAsterisk}> *</Text>
          </Text>
          <DialogWithRadioButtons
            dialogOptions={"woundTypes"}
            onSelectValue={(value) => setWoundProperty("woundType", value)}
            currentValue={wound.woundType}
            isEditMode={true}
          />
        </SafeAreaView>

        <SafeAreaView style={styles.inputContainer}>
          <Text style={styles.textComponentText}>
            Wound Location On Body
            <Text style={styles.requiredAsterisk}> *</Text>
          </Text>
          <TextInput
            style={styles.textComponent}
            outlineColor={"black"}
            placeholder={"E.g. Arm"}
            value={wound.woundLocationOnBody}
            mode="outlined"
            onChangeText={(value) =>
              setWoundProperty("woundLocationOnBody", value)
            }
          />
        </SafeAreaView>

        <SafeAreaView style={styles.inputContainer}>
          <Text style={styles.textComponentText}>
            Injury Date<Text style={styles.requiredAsterisk}> *</Text>
          </Text>
          <DatePicker
            dateValue={wound.injuryDate}
            setDateValue={(value) =>
              setWoundProperty("injuryDate", new Date(value))
            }
            isEditMode={true}
          />
        </SafeAreaView>

        <SafeAreaView style={styles.inputContainer}>
          <Text style={styles.textComponentText}>
            Place of Injury<Text style={styles.requiredAsterisk}> *</Text>
          </Text>
          <TextInput
            style={styles.textComponent}
            outlineColor={"black"}
            placeholder={"E.g. Educational establishment"}
            value={wound.placeOfInjury}
            mode="outlined"
            onChangeText={(value) => setWoundProperty("placeOfInjury", value)}
          />
        </SafeAreaView>

        <SafeAreaView style={styles.inputContainer}>
          <Text style={styles.textComponentText}>
            Injury Intent<Text style={styles.requiredAsterisk}> *</Text>
          </Text>
          <TextInput
            style={styles.textComponent}
            outlineColor={"black"}
            placeholder={"E.g. Non-intentional, Self-harm"}
            value={wound.injuryIntent}
            mode="outlined"
            onChangeText={(value) => setWoundProperty("injuryIntent", value)}
          />
        </SafeAreaView>

        <SafeAreaView style={styles.inputContainer}>
          <Text style={styles.textComponentText}>
            Injury Activity Status
            <Text style={styles.requiredAsterisk}> *</Text>
          </Text>
          <TextInput
            style={styles.textComponent}
            outlineColor={"black"}
            placeholder={"E.g. Recreational Exercise"}
            value={wound.injuryActivityStatus}
            mode="outlined"
            onChangeText={(value) =>
              setWoundProperty("injuryActivityStatus", value)
            }
          />
        </SafeAreaView>

        <SafeAreaView style={styles.inputContainer}>
          <Text style={styles.textComponentText}>
            Injury Activity Type<Text style={styles.requiredAsterisk}> *</Text>
          </Text>
          <TextInput
            style={styles.textComponent}
            outlineColor={"black"}
            placeholder={"E.g. Ascending Stairs"}
            value={wound.injuryActivityType}
            mode="outlined"
            onChangeText={(value) =>
              setWoundProperty("injuryActivityType", value)
            }
          />
        </SafeAreaView>

        <SafeAreaView style={styles.inputContainer}>
          <Text style={styles.dropDownComponentText}>
            Injury Mechanism<Text style={styles.requiredAsterisk}> *</Text>
          </Text>
          <DialogWithCheckboxes
            checkboxOptions={"injuryMechanisms"}
            onConfirmValues={(selectedValues) =>
              setInjuryMechanismProperty(selectedValues)
            }
            currentValues={wound.injuryMechanism}
            isEditMode={true}
          />
        </SafeAreaView>

        <SafeAreaView style={styles.inputContainer}>
          <Text style={styles.dropDownComponentText}>
            Injury Drug or Alcohol Involvement
            <Text style={styles.requiredAsterisk}> *</Text>
          </Text>
          <DialogWithRadioButtons
            dialogOptions={"yesOrNo"}
            onSelectValue={(value) =>
              setWoundProperty("injuryDrugOrAlcoholInvolvement", value)
            }
            currentValue={wound.injuryDrugOrAlcoholInvolvement}
            isEditMode={true}
          />
        </SafeAreaView>

        {wound.injuryDrugOrAlcoholInvolvement && (
          <SafeAreaView style={styles.inputContainer}>
            <Text style={styles.textComponentText}>
              Assault Location Description
            </Text>
            <TextInput
              style={styles.textComponent}
              outlineColor={"black"}
              placeholder={"Provide further details..."}
              value={wound.asaultLocationDescription}
              mode="outlined"
              onChangeText={(value) =>
                setWoundProperty("asaultLocationDescription", value)
              }
            />
          </SafeAreaView>
        )}

        <SafeAreaView style={styles.nextBtnContainer}>
          <IconButton
            icon="check"
            mode="contained-tonal"
            iconColor={"green"}
            containerColor={"darkseagreen"}
            size={40}
            onPress={() => handleSaveWound()}
            disabled={isButtonDisabled}
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
  requiredAsterisk: {
    fontSize: 12,
    color: "red",
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
  nextBtnContainer: {
    alignItems: "flex-end",
  },
});
