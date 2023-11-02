import React, { useEffect, useState, useRef } from "react";
import { StyleSheet, View, Text, ScrollView, Keyboard } from "react-native";
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
import { validateAdmin } from "../../utils/validation";
import { getAdmin } from "../../state-management/actions/Features/Actions";
import { ActivityIndicator } from "react-native";
import {
  getAsyncData,
  removeAsyncData,
  storeAsyncData,
} from "../../utils/utils";
import { KeyboardAvoidingView } from "react-native";
import { Platform } from "react-native";
import KeyboardLayout from "../../components/common/KeyboardLayout";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SignIn = (props) => {
  const [remember, setRemember] = useState(true);
  const [hidePass, setHidePass] = useState(true);
  const [userDetails, setUserDetails] = useState({
    sin: "",
    phone: "",
    password: "",
  });

  const [loading, setLoading] = useState(true);
  const [adminInfo, setAdminInfo] = useState({});

  const [keyboardStatus, setKeyboardStatus] = useState("Keyboard Hidden");
  useEffect(() => {
    const showSubscription = Keyboard.addListener("keyboardDidShow", () => {
      setKeyboardStatus("Keyboard Shown");
    });
    const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
      setKeyboardStatus("Keyboard Hidden");
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  useEffect(() => {
    props?.getAdmin(setLoading);
  }, []);

  useEffect(() => {
    (async () => {
      let status = await getAsyncData("userLoginStatus");
      if (status) {
        props.navigation.reset({
          index: 0,
          routes: [{ name: "OurServices" }],
        });
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      let userRemData = await getAsyncData("userRememberedData");
      let objIsFilled = Object.keys(userRemData).length !== 0;
      if (objIsFilled) {
        setUserDetails(userRemData);
      }
    })();
  }, []);

  useEffect(() => {
    if (props?.adminData) {
      setAdminInfo(props?.adminData);
    }
  }, [props?.adminData]);

  const onSignIn = async () => {
    validateAdmin(userDetails, adminInfo)
      .then((res) => {
        if (remember) {
          storeAsyncData("userRememberedData", userDetails);
        } else {
          storeAsyncData("userRememberedData", {});
        }
        props.navigation.reset({
          index: 0,
          routes: [{ name: "OurServices" }],
        });
        storeAsyncData("userLoginStatus", "true");
      })
      .catch((e) => alert(e?.message));
  };

  return (
    <View style={styles.container}>
      <KeyboardLayout>
        <ImgHeader />
        {loading ? (
          <View style={styles.loader}>
            <ActivityIndicator size="large" color="#FFF" />
          </View>
        ) : (
          <>
            <View style={styles.titleWrapper}>
              <Text style={styles.titleTxt}>Sign in</Text>
            </View>
            <TextField
              title="SIN"
              placeHolder="Enter Your SIN"
              value={userDetails?.sin}
              onChangeText={(val) =>
                setUserDetails({ ...userDetails, sin: val })
              }
              keyboardType="numeric"
            />
            <TextField
              title="Phone Number"
              placeHolder="Enter your phone number"
              value={userDetails?.phone}
              onChangeText={(val) =>
                setUserDetails({ ...userDetails, phone: val })
              }
              keyboardType="phone-pad"
            />
            <TextField
              title="Password"
              placeHolder="Enter your password"
              password
              hidePass={hidePass}
              setHidePass={setHidePass}
              value={userDetails?.password}
              onChangeText={(val) =>
                setUserDetails({ ...userDetails, password: val })
              }
            />
            <View style={styles.forgotWrapper}>
              <View style={styles.checkBoxWrapper}>
                <CheckBox setSelect={setRemember} select={remember} />
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
          </>
        )}
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
    alignSelf: "center",
  },
  loader: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: hp("15%"),
  },
});

const mapStateToProps = (state) => ({
  errors: state.errors.errors,
  adminData: state.main.admin_data,
});

export default connect(mapStateToProps, { getAdmin })(SignIn);
