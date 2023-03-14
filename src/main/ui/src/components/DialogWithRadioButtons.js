import {
  Button,
  Dialog,
  Portal,
  RadioButton,
  TextInput,
} from "react-native-paper";
import React, { useEffect, useState } from "react";
import { TouchableOpacity, View } from "react-native";

const DialogWithRadioButtons = ({
  dialogOptions,
  onSelectValue,
  defaultValue,
  isActivatable
}) => {
  const [visible, setVisible] = useState(false);
  const [selectedValue, setSelectedValue] = useState("");

  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);

  const handleRadioButtonChange = (value) => {
    setSelectedValue(value);
  };

  const handleOkButtonPress = () => {
    onSelectValue(selectedValue);
    hideDialog();
  };

  const genderOptions = () => {
    return (
      <View>
        <RadioButton.Item label="Male" value="male" />
        <RadioButton.Item label="Female" value="female" />
        <RadioButton.Item label="Nonbinary" value="nonbinary" />
        <RadioButton.Item label="Other" value="other" />
      </View>
    );
  };

  const woundTypeOptions = () => {
    return (
      <View>
        <RadioButton.Item label="Venous Ulcer" value="venous ulcer" />
        <RadioButton.Item label="Arterial Ulcer" value="arterial ulcer" />
        <RadioButton.Item
          label="Diabetic Foot Ulcer"
          value="diabetic foot ulcer"
        />
        <RadioButton.Item label="Pressure Ulcer" value="pressure ulcer" />
        <RadioButton.Item label="Infectious Wound" value="infectious wound" />
        <RadioButton.Item label="Ischemic Wound" value="ischemic wound" />
        <RadioButton.Item label="Surgical Wounds" value="surgical wounds" />
        <RadioButton.Item
          label="Radiation Poisoning Wounds"
          value="radiation poisoning wounds"
        />
      </View>
    );
  };

  const Options = () => {
    if (dialogOptions === "genders") {
      return genderOptions();
    } else if (dialogOptions === "woundTypes") {
      return woundTypeOptions();
    } else {
      return null;
    }
  };

  useEffect(() => {
    if(defaultValue && selectedValue === ""){
        setSelectedValue(defaultValue);
    }
  })

  return (
    <View>
      <TouchableOpacity
        onPress={showDialog}
        disabled={!isActivatable}
      >
        <TextInput
          outlineColor={"black"}
          value={selectedValue}
          mode="outlined"
          editable={false}
          right={<TextInput.Icon icon="chevron-down" />}
        />
      </TouchableOpacity>
      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog}>
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
            <Button onPress={hideDialog}>Cancel</Button>
            <Button onPress={handleOkButtonPress}>Ok</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
};

export default DialogWithRadioButtons;
