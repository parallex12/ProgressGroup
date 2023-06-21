import React, { useEffect, useState, useRef } from "react";
import { StyleSheet, View, Text } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { connect } from "react-redux";
import { colorScheme, fontStyle } from "../../Theme";
import Header from "../../components/common/Header";
import PinInput from "../../components/common/PinInput";
import PrimaryButton from "../../components/common/PrimaryButton";

const ForgotPassword = (props) => {
  const [code, setCode] = useState("");

  return (
    <View style={styles.container}>
      <Header navigation={props.navigation} title="Reset Password" back />
      <View style={styles.titleWrapper}>
        <Text style={styles.titleTxt}>Forgot Password</Text>
        <Text style={styles.subText}>
          In order to reset your password, enter the 4 digit code was sent to
          +92 311 ********
        </Text>
      </View>
      <PinInput code={code} setCode={setCode} />
      <PrimaryButton
        title="CONFIRM"
        onPress={() => props.navigation.navigate("ResetPassword")}
      />
      <View style={styles.moreWrapper}>
        <Text style={styles.remText}>Didn’t receive the code? </Text>
        <Text style={styles.forgotTxt}>Resend Code</Text>
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
    width: wp("90%"),
    justifyContent: "flex-end",
    marginVertical: hp("2%"),
  },
  titleTxt: {
    fontFamily: fontStyle.SBOLD,
    fontSize: fontStyle.HEADING,
    color: fontStyle.TXT_WHITE,
  },
  subText: {
    fontFamily: fontStyle.MED,
    fontSize: fontStyle.EXTRA_SMALL,
    color: fontStyle.TXT_LIGHT,
    marginTop: hp("1%"),
  },
  moreWrapper: {
    marginVertical: hp("2%"),
    flexDirection: "row",
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
});

const mapStateToProps = (state) => ({
  errors: state.errors.errors,
});

export default connect(mapStateToProps)(ForgotPassword);
