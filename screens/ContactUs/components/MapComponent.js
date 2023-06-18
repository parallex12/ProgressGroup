import React, { useEffect, useState, useRef } from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { connect } from "react-redux";
import { fontStyle } from "../../../Theme";
import MapView from "react-native-maps";

const MapComponent = (props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>{props?.title}</Text>
      <View style={styles.titleLines}>
        <Image
          source={require("../../../assets/lines.png")}
          resizeMode="contain"
          style={{ height: "100%", width: "100%" }}
        />
      </View>
      <MapView style={styles.mapWrapper} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: hp("28%"),
    width: wp("90%"),
    alignItems: "center",
  },
  titleText: {
    fontFamily: fontStyle.SBOLD,
    fontSize: fontStyle.MEDIUM,
    color: fontStyle.TXT_WHITE,
  },
  titleLines: {
    height: hp("2%"),
    width: wp("40%"),
    alignItems: "center",
    justifyContent: "center",
    marginBottom: hp("1%"),
  },
  mapWrapper: {
    height: hp("20%"),
    width: wp("90%"),
    backgroundColor: "green",
  },
});

const mapStateToProps = (state) => ({
  errors: state.errors.errors,
});

export default connect(mapStateToProps)(MapComponent);
