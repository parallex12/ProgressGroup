import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { connect } from "react-redux";
import { colorScheme, fontStyle } from "../../Theme";
import Header from "../../components/common/Header";
import PrimaryButton from "../../components/common/PrimaryButton";
import TextField from "../../components/common/TextField";
import { validateOldPass } from "../../utils/validation";
import { _ResetPassword } from "../../state-management/actions/Features/Actions";
import { ActivityIndicator } from "react-native";
import KeyboardLayout from "../../components/common/KeyboardLayout";

const ForgotPassword = (props) => {
  const [hideNewPass, setHideNewPass] = useState(true);
  const [hideConfirmPass, setHideConfirmPass] = useState(true);
  const [userDetails, setUserDetails] = useState({
    oldPass: "",
    newPass: "",
  });
  const [adminInfo, setAdminInfo] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setAdminInfo(props?.adminData);
  }, [props?.adminData]);

  const onReset = () => {
    validateOldPass(userDetails, adminInfo?.password)
      .then((res) => {
        props?._ResetPassword(userDetails, props?.navigation, setLoading);
      })
      .catch((e) => alert(e?.message));
    // props?.resetPassword()
    // () => props.navigation.navigate("OurServices")
  };

  return (
    <View style={styles.container}>
      <KeyboardLayout>
        <Header navigation={props.navigation} title="Reset Password" back />
        <TextField
          title="Old Password"
          placeHolder="Enter your password"
          password
          hidePass={hideNewPass}
          setHidePass={setHideNewPass}
          value={userDetails?.oldPass}
          onChangeText={(val) =>
            setUserDetails({ ...userDetails, oldPass: val })
          }
        />
        <TextField
          title="New Password"
          placeHolder="Enter your password"
          password
          hidePass={hideConfirmPass}
          setHidePass={setHideConfirmPass}
          value={userDetails?.newPass}
          onChangeText={(val) =>
            setUserDetails({ ...userDetails, newPass: val })
          }
        />
        <View style={styles.buttonWrapper}>
          <PrimaryButton
            title={
              loading ? (
                <ActivityIndicator size="small" color="#fff" />
              ) : (
                "RESET"
              )
            }
            onPress={onReset}
          />
        </View>
      </KeyboardLayout>
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
  adminData: state.main.admin_data,
});

export default connect(mapStateToProps, { _ResetPassword })(ForgotPassword);
