import { StyleSheet, Text, View } from "react-native";
import React from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { RFValue as rf } from "react-native-responsive-fontsize";
import { Image } from "react-native";

const ImgHeader = () => {
  return (
    <View style={styles.container}>
      <View style={styles.imgWrapper}>
        <Image
          source={require("../../assets/titleImg.png")}
          style={styles.bgImg}
          resizeMode="contain"
        />
      </View>
    </View>
  );
};

export default ImgHeader;

const styles = StyleSheet.create({
  container: {
    height: hp("18%"),
    width: wp("100%"),
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  imgWrapper: {
    height: hp("9%"),
    width: wp("42%"),
  },
  bgImg: {
    height: "100%",
    width: "100%",
  },
});
