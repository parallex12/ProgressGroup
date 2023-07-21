import React, { useEffect, useState, useRef } from "react";
import { StyleSheet, View, Text } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { RFValue as rf } from "react-native-responsive-fontsize";
import { connect } from "react-redux";
import { colorScheme, fontStyle } from "../../Theme";
import Header from "../../components/common/Header";
import BottomMenu from "../../components/common/BottomMenu";
import { Image } from "react-native";
import { TouchableOpacity } from "react-native";
import OptionCard from "./components/OptionCard";
import { removeAsyncData } from "../../utils/utils";

const Profile = (props) => {
  const [userInfo, setUserInfo] = useState(props?.adminData);

  useEffect(() => {
    setUserInfo(props?.adminData);
  }, [props?.adminData]);

  const onLogout = () => {
    removeAsyncData("userLoginStatus");
    props?.navigation.navigate("SignIn");
  };

  return (
    <View style={styles.container}>
      <Header navigation={props.navigation} title="My Profile" />
      {/* Profile Card */}

      <View style={styles.profileCard}>
        <View style={styles.imgWrapper}>
          <Image
            style={{ height: "100%", width: "100%" }}
            resizeMode="cover"
            source={
              userInfo?.profile?.url
                ? { uri: userInfo?.profile?.url }
                : require("../../assets/profileImg.png")
            }
          />
        </View>
        <View style={styles.txtWrapper}>
          <Text
            style={styles.nameText}
          >{`${userInfo?.firstName} ${userInfo?.lastName}`}</Text>
          <Text style={styles.sinText}>SIN: {userInfo?.sin}</Text>
        </View>
        <TouchableOpacity onPress={onLogout} style={styles.signOutBtn}>
          <Text style={styles.signOutTxt}>Sign Out</Text>
        </TouchableOpacity>
      </View>
      {/* Profile Card */}

      {/* Setting Options */}

      <View style={styles.titleTxtBox}>
        <Text style={styles.titleText}>General</Text>
      </View>
      <OptionCard
        title="Account Settings"
        img={require("../../assets/user.png")}
        onPress={() => props.navigation.navigate("Settings")}
      />
      <OptionCard
        title="Reset Password"
        img={require("../../assets/lock.png")}
        onPress={() => props.navigation.navigate("ResetPassword")}
      />
      <View style={styles.titleTxtBox}>
        <Text style={styles.titleText}>Privacy</Text>
      </View>

      <OptionCard
        title="Terms & Conditions"
        img={require("../../assets/terms.png")}
      />
      {/* Setting Options */}

      <BottomMenu navigation={props.navigation} select="profile" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: colorScheme.BACK_COLOR,
  },
  profileCard: {
    height: hp("10%"),
    width: wp("90%"),
    flexDirection: "row",
    alignItems: "center",
    marginBottom: hp("3%"),
  },
  imgWrapper: {
    height: hp("6%"),
    width: hp("6%"),
    borderRadius: 100,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
  },
  txtWrapper: {
    flex: 1,
    paddingLeft: wp("2.5%"),
  },
  nameText: {
    color: fontStyle.TXT_WHITE,
    fontFamily: fontStyle.MED,
    fontSize: fontStyle.SMALL,
  },
  sinText: {
    color: colorScheme.PLC_COLOR,
    fontFamily: fontStyle.MED,
    fontSize: fontStyle.EXTRA_SMALL,
  },
  signOutBtn: {
    flex: 1,
    alignItems: "flex-end",
  },
  signOutTxt: {
    color: fontStyle.RED_TXT,
    fontFamily: fontStyle.MED,
    fontSize: fontStyle.EXTRA_SMALL,
  },
  titleTxtBox: {
    width: wp("90%"),
    marginBottom: hp("2%"),
  },
  titleText: {
    color: colorScheme.WHITE,
    fontFamily: fontStyle.SBOLD,
    fontSize: fontStyle.MEDIUM,
  },
});

const mapStateToProps = (state) => ({
  errors: state.errors.errors,
  adminData: state.main.admin_data,
});

export default connect(mapStateToProps)(Profile);
