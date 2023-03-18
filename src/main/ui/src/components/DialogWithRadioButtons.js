import {
  Button,
  Dialog,
  Portal,
  RadioButton,
  TextInput,
} from "react-native-paper";
import { Keyboard, StyleSheet, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";

const DialogWithRadioButtons = ({
  dialogOptions,
  onSelectValue,
  currentValue,
  isEditMode,
}) => {
  const [visible, setVisible] = useState(false);
  const [selectedValue, setSelectedValue] = useState("");

  const showDialog = () => {
    Keyboard.dismiss();
    setVisible(true);
  };
  const hideDialog = () => setVisible(false);

  const handleRadioButtonChange = (value) => {
    setSelectedValue(value);
  };

  const handleOkButtonPress = () => {
    onSelectValue(selectedValue);
    hideDialog();
  };

  const handleCancelButtonPress = () => {
    setSelectedValue(currentValue);
    hideDialog();
  };

  /**
   * Method returns Gender Options
   */
  const genderOptions = () => {
    return (
      <View>
        <RadioButton.Item label="Male" value="Male" />
        <RadioButton.Item label="Female" value="Female" />
        <RadioButton.Item label="Nonbinary" value="Nonbinary" />
        <RadioButton.Item label="Other" value="Other" />
      </View>
    );
  };

  /**
   * Method returns Wound Type Options
   */
  const woundTypeOptions = () => {
    return (
      <View>
        <RadioButton.Item label="Venous Ulcer" value="Venous Ulcer" />
        <RadioButton.Item label="Arterial Ulcer" value="Arterial Ulcer" />
        <RadioButton.Item
          label="Diabetic Foot Ulcer"
          value="Diabetic Foot Ulcer"
        />
        <RadioButton.Item label="Pressure Ulcer" value="Pressure Ulcer" />
        <RadioButton.Item label="Infectious Wound" value="Infectious Wound" />
        <RadioButton.Item label="Ischemic Wound" value="Ischemic Wound" />
        <RadioButton.Item label="Surgical Wounds" value="Surgical Wounds" />
        <RadioButton.Item
          label="Radiation Poisoning Wounds"
          value="Radiation Poisoning Wounds"
        />
      </View>
    );
  };

  /**
   * Method returns Yes or No Options
   */
  const yesNoOptions = () => {
    return (
      <View>
        <RadioButton.Item label="Yes" value={true} />
        <RadioButton.Item label="No" value={false} />
      </View>
    );
  };

  /**
   * Method returns the radiobutton options depending on the passed in context: dialogOptions
   */
  const Options = () => {
    if (dialogOptions === "genders") {
      return genderOptions();
    } else if (dialogOptions === "woundTypes") {
      return woundTypeOptions();
    } else if (dialogOptions === "yesOrNo") {
      return yesNoOptions();
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
   * useEffect that sets the pre-selected/rendered option of the dialog box
   */
  useEffect(() => {
    if (isEditMode) {
      if (currentValue && selectedValue === "") {
        // If in Edit Mode AND there is an initial value AND the modal just opened,
        // set the selected value of the Modal to the current user prop
        setSelectedValue(currentValue);
      }
    } else {
      // Otherwise, reflect the current state of the prop in the Text Input
      setSelectedValue(currentValue);
    }
  });

  /**
   * Method checks the data type of selectedValue and returns a diplayable version of the value
   */
  const getSelectedValueToDisplay = (value) => {
    if (typeof selectedValue === "boolean") {
      return value ? "Yes" : "No";
    } else {
      return selectedValue;
    }
  };

  return (
    <View>
      <TouchableOpacity onPress={showDialog} disabled={!isEditMode}>
        <TextInput
          outlineColor={"black"}
          value={getSelectedValueToDisplay(selectedValue)}
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
            <RadioButton.Group
              onValueChange={handleRadioButtonChange}
              value={selectedValue}
            >
              <Options />
            </RadioButton.Group>
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

export default DialogWithRadioButtons;

const styles = StyleSheet.create({
  dialogBox: {
    borderRadius: 20,
  },
});
