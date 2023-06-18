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
import TextField from "../../components/common/TextField";

const ForgotPassword = (props) => {
  const [hideNewPass, setHideNewPass] = useState(false);
  const [hideConfirmPass, setHideConfirmPass] = useState(false);
  return (
    <View style={styles.container}>
      <Header navigation={props.navigation} title="Reset Password" />
      <TextField
        title="New Password"
        placeHolder="Enter your password"
        password
        hidePass={hideNewPass}
        setHidePass={setHideNewPass}
      />
      <TextField
        title="Confirm Password"
        placeHolder="Enter your password"
        password
        hidePass={hideConfirmPass}
        setHidePass={setHideConfirmPass}
      />
      <View style={styles.buttonWrapper}>
        <PrimaryButton
          title="RESET"
          onPress={() => props.navigation.navigate("OurServices")}
        />
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
  buttonWrapper: {
    marginTop: hp("3%"),
  },
});

const mapStateToProps = (state) => ({
  errors: state.errors.errors,
});

export default connect(mapStateToProps)(ForgotPassword);
