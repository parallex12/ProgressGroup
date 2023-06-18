import { StyleSheet, Text, View } from "react-native";
import React from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Image } from "react-native";
import { colorScheme, fontStyle } from "../../../Theme";

const ContactCard = (props) => {
  return (
    <View
      style={[styles.container, { borderBottomWidth: props?.noBorder ? 0 : 1 }]}
    >
      <View style={styles.imgWrapper}>
        <Image
          source={props?.img}
          resizeMode="contain"
          style={{ width: "55%", height: "55%" }}
        />
      </View>
      <View>
        <Text style={styles.titleTtxt}>{props?.title}</Text>
        {props?.detail && <Text style={styles.subText}>{props?.detail}</Text>}
      </View>
    </View>
  );
};

export default ContactCard;

const styles = StyleSheet.create({
  container: {
    height: hp("9%"),
    width: wp("100%"),
    paddingHorizontal: wp("5%"),
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: colorScheme.PLC_COLOR,
  },
  imgWrapper: {
    height: hp("5%"),
    width: hp("5%"),
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colorScheme.BTN_PRM,
    marginRight: wp("3%"),
  },
  titleTtxt: {
    fontFamily: fontStyle.SBOLD,
    fontSize: fontStyle.SMALL,
    color: fontStyle.TXT_WHITE,
  },
  subText: {
    fontFamily: fontStyle.MED,
    fontSize: fontStyle.SMALL,
    color: colorScheme.BTN_PRM,
  },
});
