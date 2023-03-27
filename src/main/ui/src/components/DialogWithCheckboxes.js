import {
  Button,
  Checkbox,
  Dialog,
  Portal,
  TextInput,
} from "react-native-paper";
import { Keyboard, StyleSheet, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";

const DialogWithCheckboxes = ({
  checkboxOptions,
  onConfirmValues,
  currentValues,
  isEditMode,
}) => {
  const [visible, setVisible] = useState(false);
  const [selectedValues, setSelectedValues] = useState([]);
  const joinedValues = selectedValues.join(", ");

  const showDialog = () => {
    Keyboard.dismiss();
    setVisible(true);
  };
  const hideDialog = () => setVisible(false);

  const handleCheckboxChange = (value) => {
    const currentIndex = selectedValues.indexOf(value);
    const newSelectedValues = [...selectedValues];

    if (currentIndex === -1) {
      newSelectedValues.push(value);
    } else {
      newSelectedValues.splice(currentIndex, 1);
    }

    setSelectedValues(newSelectedValues);
  };

  const handleOkButtonPress = () => {
    onConfirmValues(selectedValues);
    hideDialog();
  };

  const handleCancelButtonPress = () => {
    onConfirmValues(currentValues);
    hideDialog();
  };

  /**
   * Method returns Injury Mechanism Options
   */
  const injuryMechanismOptions = () => {
    return (
      <View>
        <Checkbox.Item
          label="Blunt Force Trauma"
          status={isChecked("Blunt Force Trauma")}
          onPress={() => handleCheckboxChange("Blunt Force Trauma")}
        />
        <Checkbox.Item
          label="Penetrating Trauma"
          status={isChecked("Penetrating Trauma")}
          onPress={() => handleCheckboxChange("Penetrating Trauma")}
        />
        <Checkbox.Item
          label="Thermal Injury"
          status={isChecked("Thermal Injury")}
          onPress={() => handleCheckboxChange("Thermal Injury")}
        />
        <Checkbox.Item
          label="Chemical Injury"
          status={isChecked("Chemical Injury")}
          onPress={() => handleCheckboxChange("Chemical Injury")}
        />
        <Checkbox.Item
          label="Radiation Injury"
          status={isChecked("Radiation Injury")}
          onPress={() => handleCheckboxChange("Radiation Injury")}
        />
        <Checkbox.Item
          label="Electrical Injury"
          status={isChecked("Electrical Injury")}
          onPress={() => handleCheckboxChange("Electrical Injury")}
        />
        <Checkbox.Item
          label="Overuse Injury"
          status={isChecked("Overuse Injury")}
          onPress={() => handleCheckboxChange("Overuse Injury")}
        />
      </View>
    );
  };

  const isChecked = (value) => {
    return selectedValues.includes(value) ? "checked" : "unchecked";
  };

  /**
   * Method returns the checkbox options depending on the passed in context checkboxOptions
   */
  const Options = () => {
    if (checkboxOptions === "injuryMechanisms") {
      return injuryMechanismOptions();
    } else {
      return null;
    }
  };

  /**
   * Method decides if Dropdown Icon should be displayed or not
   */
  const ShowTextInputIcon = () => {
    if (isEditMode) {
      return <TextInput.Icon icon="chevron-down" />;
    } else {
      return null;
    }
  };

  /**
   * useEffect that sets the pre-selected checkboxes
   */
  useEffect(() => {
    if (isEditMode) {
      if (currentValues != null) {
        // Condition: in edit mode AND no differing values selected to the already saved values
        // therefore pre-selected/saved valeus are displayed
        setSelectedValues(currentValues);
      }
    } else {
      // Condition: In display mode and textInput should reflect saved items
      setSelectedValues(currentValues);
    }
  }, []);

  return (
    <View>
      <TouchableOpacity onPress={showDialog} disabled={!isEditMode}>
        <TextInput
          outlineColor={"black"}
          value={joinedValues}
          mode="outlined"
          editable={false}
          right={ShowTextInputIcon()}
        />
      </TouchableOpacity>
      <Portal>
        <Dialog
          style={styles.dialogBox}
          visible={visible}
          onDismiss={hideDialog}
        >
          <Dialog.Title>Select a value</Dialog.Title>
          <Dialog.Content>
            <Options />
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={handleCancelButtonPress}>Cancel</Button>
            <Button onPress={handleOkButtonPress}>Ok</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
};

export default DialogWithCheckboxes;

const styles = StyleSheet.create({
  dialogBox: {
    borderRadius: 20,
  },
});
