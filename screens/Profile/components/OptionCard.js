import React, { useEffect, useState, useRef } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  Pressable,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { RFValue as rf } from "react-native-responsive-fontsize";
import { connect } from "react-redux";
import { colorScheme, fontStyle } from "../../../Theme";
import { AntDesign } from "@expo/vector-icons";

const OptionCard = (props) => {
  return (
    <Pressable onPress={props?.onPress} style={styles.container}>
      <View style={styles.imgWrapper}>
        <Image
          source={props?.img}
          resizeMode="contain"
          style={{ height: "100%", width: "100%" }}
        />
      </View>
      <Text style={styles.titleTxt}>{props?.title}</Text>
      <View style={styles.nextIcon}>
        <AntDesign name="right" size={rf(12)} color={colorScheme.BTN_PRM} />
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    height: hp("6%"),
    width: wp("90%"),
    flexDirection: "row",
    alignItems: "center",
    marginBottom: hp("1.5%"),
    backgroundColor: colorScheme.WHITE,
    borderRadius: 8,
    paddingHorizontal: wp("3%"),
  },
  imgWrapper: {
    height: hp("3%"),
    width: wp("5.5%"),
    alignItems: "center",
    justifyContent: "center",
  },
  titleTxt: {
    flex: 1,
    paddingLeft: wp("2%"),

    color: fontStyle.TXT_DARK,
    fontFamily: fontStyle.MED,
    fontSize: fontStyle.SMALL,
  },
  nextIcon: {
    height: hp("2.7%"),
    width: hp("2.7%"),
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colorScheme.ICON_WRAP,
    borderRadius: 100,
  },
});

const mapStateToProps = (state) => ({
  errors: state.errors.errors,
});

export default connect(mapStateToProps)(OptionCard);
