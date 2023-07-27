import React, { useState } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { RFValue as rf } from "react-native-responsive-fontsize";
import { StyleSheet, View, Text } from "react-native";
import { connect } from "react-redux";
import { colorScheme, fontStyle } from "../../Theme";
import { TextInput } from "react-native";
import { AntDesign, Feather } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";

const TextField = (props) => {
  const { hidePass, setHidePass, value } = props;
  return (
    <View style={styles.container}>
      <Text style={styles.titleTxt}>{props?.title}</Text>
      <View style={styles.inputWrapper}>
        <TextInput
          style={styles.inputField}
          placeholder={props?.placeHolder}
          placeholderTextColor={colorScheme.PLC_COLOR}
          secureTextEntry={hidePass ? true : false}
          value={value}
          onChangeText={props?.onChangeText}
          keyboardType={props?.keyboardType}
          editable={props?.editable}
        />
        {props.password && (
          <TouchableOpacity onPress={() => setHidePass(!hidePass)}>
            <Feather
              name={hidePass ? "eye-off" : "eye"}
              size={rf(14)}
              color={colorScheme.PLC_COLOR}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: hp("9.5%"),
    width: wp("90%"),
    justifyContent: "space-between",
    marginTop: hp("1.5%"),
  },
  titleTxt: {
    fontFamily: fontStyle.MED,
    fontSize: fontStyle.SMALL,
    color: fontStyle.TXT_WHITE,
  },
  inputWrapper: {
    height: hp("6%"),
    width: wp("90%"),
    backgroundColor: colorScheme.WHITE,
    borderRadius: 40,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: wp("5%"),
  },
  inputField: {
    flex: 1,
    fontFamily: fontStyle.MED,
    fontSize: fontStyle.EXTRA_SMALL,
    paddingRight: wp("1%"),
  },
});

const mapStateToProps = (state) => ({
  errors: state.errors.errors,
});

export default connect(mapStateToProps)(TextField);
