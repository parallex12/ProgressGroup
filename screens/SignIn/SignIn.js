import React, { useEffect, useState, useRef } from "react";
import { StyleSheet, View, Text } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { connect } from "react-redux";
import { colorScheme, fontStyle } from "../../Theme";
import ImgHeader from "../../components/common/ImgHeader";
import TextField from "../../components/common/TextField";
import PrimaryButton from "../../components/common/PrimaryButton";
import CheckBox from "../../components/common/CheckBox";
import BottomMenu from "../../components/common/BottomMenu";

const SignIn = (props) => {
  const [select, setSelect] = useState(false);
  const [hidePass, setHidePass] = useState(false);

  const onSignIn = () => {
    props.navigation.navigate("OurServices");
  };

  return (
    <View style={styles.container}>
      <ImgHeader />
      <View style={styles.titleWrapper}>
        <Text style={styles.titleTxt}>Sign in</Text>
      </View>
      <TextField title="SIN" placeHolder="Enter Your SIN" />
      <TextField title="Phone Number" placeHolder="Enter your phone number" />
      <TextField
        title="Password"
        placeHolder="Enter your password"
        password
        hidePass={hidePass}
        setHidePass={setHidePass}
      />
      <View style={styles.forgotWrapper}>
        <View style={styles.checkBoxWrapper}>
          <CheckBox setSelect={setSelect} select={select} />
          <Text style={styles.remText}>Remember me</Text>
        </View>
        <Text
          onPress={() => props.navigation.navigate("ForgotPassword")}
          style={styles.forgotTxt}
        >
          Forgot Password?
        </Text>
      </View>
      <PrimaryButton title="SIGN IN" onPress={onSignIn} />
      <View style={styles.moreWrapper}>
        <Text style={styles.remText}>Don’t have an account? </Text>
        <Text style={styles.forgotTxt}>Learn more</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",

    backgroundColor: colorScheme.BACK_COLOR,
  },
  titleWrapper: {
    height: hp("12%"),
    width: wp("90%"),
    justifyContent: "flex-end",
    marginBottom: hp("2%"),
  },
  titleTxt: {
    fontFamily: fontStyle.BOLD,
    fontSize: fontStyle.EXTRA_LARGE,
    color: fontStyle.TXT_WHITE,
  },
  forgotWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: wp("90%"),
    marginVertical: hp("2%"),
  },
  checkBoxWrapper: {
    height: "100%",
    flexDirection: "row",
    alignItems: "center",
  },
  remText: {
    color: fontStyle.TXT_WHITE,
    fontFamily: fontStyle.MED,
    fontSize: fontStyle.EXTRA_SMALL,
  },
  forgotTxt: {
    color: colorScheme.BTN_PRM,
    fontFamily: fontStyle.MED,
    fontSize: fontStyle.EXTRA_SMALL,
  },
  moreWrapper: {
    marginVertical: hp("2%"),
    flexDirection: "row",
  },
});

const mapStateToProps = (state) => ({
  errors: state.errors.errors,
});

export default connect(mapStateToProps)(SignIn);
