import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { RFValue as rf } from "react-native-responsive-fontsize";
import { colorScheme } from "../../Theme";
import { AntDesign } from "@expo/vector-icons";

const CheckBox = (props) => {
  const { select, setSelect } = props;

  const onCheck = () => {
    setSelect((prev) => !prev);
  };
  return (
    <TouchableOpacity
      onPress={onCheck}
      style={[
        styles.checkBoxx,
        {
          backgroundColor: select ? colorScheme.BTN_PRM : colorScheme.WHITE,
        },
      ]}
    >
      {select && (
        <AntDesign name="check" size={rf(12)} color={colorScheme.WHITE} />
      )}
    </TouchableOpacity>
  );
};

export default CheckBox;

const styles = StyleSheet.create({
  checkBoxx: {
    height: hp("2%"),
    width: hp("2%"),
    backgroundColor: colorScheme.BTN_PRM,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    marginRight: wp("1.5%"),
  },
});
