import React, { useState } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { RFValue as rf } from "react-native-responsive-fontsize";
import { StyleSheet, TouchableOpacity, View, Text, Image } from "react-native";
import { connect } from "react-redux";
import { colorScheme, fontStyle } from "../../Theme";
import { AntDesign, Feather } from "@expo/vector-icons";

const BottomMenu = (props) => {
  const [select, setSelect] = useState();

  const handlePress = (screen) => {
    if (screen == "service") {
      props?.navigation.navigate("OurServices");
    } else if (screen == "contact") {
      props?.navigation.navigate("ContactUs");
    } else if (screen == "profile") {
      props?.navigation.navigate("Profile");
    } else {
      return null;
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => handlePress("contact")}
        style={styles.optionWrapper}
      >
        <View style={styles.imgWrapper}>
          <Image
            resizeMode="contain"
            style={{ height: "80%", width: "80%" }}
            source={
              props?.select == "contact"
                ? require("../../assets/callDark.png")
                : require("../../assets/call.png")
            }
          />
        </View>
        <Text
          style={[
            styles.menuTxt,
            {
              color:
                props?.select == "contact"
                  ? colorScheme.BTN_PRM
                  : colorScheme.WHITE,
            },
          ]}
        >
          Contact Us
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => handlePress("service")}
        style={styles.optionWrapper}
      >
        <View style={styles.imgWrapper}>
          <Image
            resizeMode="contain"
            style={{ height: "80%", width: "80%" }}
            source={
              props?.select == "service"
                ? require("../../assets/serviceIcon.png")
                : require("../../assets/serviceLight.png")
            }
          />
        </View>
        <Text
          style={[
            styles.menuTxt,
            {
              color:
                props?.select == "service"
                  ? colorScheme.BTN_PRM
                  : colorScheme.WHITE,
            },
          ]}
        >
          Services
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => handlePress("profile")}
        style={styles.optionWrapper}
      >
        <View style={styles.imgWrapper}>
          <Image
            resizeMode="contain"
            style={{ height: "80%", width: "80%" }}
            source={
              props?.select == "profile"
                ? require("../../assets/userDark.png")
                : require("../../assets/userLight.png")
            }
          />
        </View>
        <Text
          style={[
            styles.menuTxt,
            {
              color:
                props?.select == "profile"
                  ? colorScheme.BTN_PRM
                  : colorScheme.WHITE,
            },
          ]}
        >
          Profile
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: hp("10%"),
    width: wp("100%"),
    position: "absolute",
    bottom: 0,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: wp("2%"),
    borderTopWidth: 0.5,
    borderTopColor: colorScheme.PLC_COLOR,
    backgroundColor: colorScheme.BACK_COLOR,
  },
  optionWrapper: {
    height: "100%",
    flex: 1,
    alignItems: "center",
    // justifyContent: "center",
    paddingTop: hp("1%"),
  },
  imgWrapper: {
    height: hp("3%"),
    width: wp("10%"),
    justifyContent: "center",
    alignItems: "center",
  },
  menuTxt: {
    color: fontStyle.TXT_WHITE,
    fontFamily: fontStyle.MED,
    fontSize: fontStyle.MENU_TXT,
    marginTop: hp("0.5%"),
  },
});

const mapStateToProps = (state) => ({
  errors: state.errors.errors,
});

export default connect(mapStateToProps)(BottomMenu);
