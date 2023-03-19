import { Keyboard, StyleSheet, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView, TextInput } from "react-native-paper";

import DateTimePicker from "@react-native-community/datetimepicker";
import FeatherIcon from "react-native-vector-icons/Feather";
import { formatDate } from "../actions/SharedFunctions";

const globalStyle = require("../../Style");

const DatePicker = ({ dateValue, setDateValue, isEditMode }) => {
  const [dateText, setDateText] = useState("");
  const [datePickerVisible, setDatePickerVisible] = useState(false);

  const showDatePicker = () => {
    Keyboard.dismiss();
    setDatePickerVisible(true);
  };

  const handleDateSelected = (event, value) => {
    setDatePickerVisible(false);

    if (event.type == "set") {
      setDateValue(value);
    }
  };

  /**
   * useEffect reads current value of dateValue prop, formats it and updates the dateText prop
   */
  useEffect(() => {
    if (dateValue == null) {
      setDateText("DD/MM/YYYY");
    } else {
      setDateText(formatDate(new Date(dateValue)));
    }
  });

  return (
    <View style={globalStyle.datePickerContainer}>
      <TextInput
        style={globalStyle.datePickerTextInput}
        outlineColor={"black"}
        placeholder={"DD/MM/YYYY"}
        value={dateText}
        mode="outlined"
        editable={false}
      />

      <TouchableOpacity
        style={globalStyle.datePickerPressable}
        onPress={showDatePicker}
        disabled={!isEditMode}
      >
        <FeatherIcon name="calendar" size={30} />
      </TouchableOpacity>

      {datePickerVisible && (
        <DateTimePicker
          value={new Date()}
          mode={"date"}
          is24Hour={true}
          onChange={handleDateSelected}
          style={globalStyle.datePicker}
        />
      )}
    </View>
  );
};

export default DatePicker;
