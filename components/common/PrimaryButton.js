import React from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { StyleSheet, TouchableOpacity, Text } from "react-native";
import { connect } from "react-redux";
import { colorScheme, fontStyle } from "../../Theme";

const PrimaryButton = (props) => {
  return (
    <TouchableOpacity onPress={props?.onPress} style={styles.container}>
      <Text style={styles.buttonTxt}>{props?.title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    height: hp("6.5%"),
    width: wp("90%"),
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colorScheme.BTN_PRM,
    borderRadius: 40,
  },
  buttonTxt: {
    fontFamily: fontStyle.REG,
    color: fontStyle.TXT_WHITE,
    fontSize: fontStyle.SMALL,
  },
});

const mapStateToProps = (state) => ({
  errors: state.errors.errors,
});

export default connect(mapStateToProps)(PrimaryButton);
