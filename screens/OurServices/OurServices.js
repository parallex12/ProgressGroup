import React, { useEffect, useState, useRef } from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { connect } from "react-redux";
import { colorScheme, fontStyle } from "../../Theme";
import ImgHeader from "../../components/common/ImgHeader";
import { servicesData } from "../../helper/data";
import BottomMenu from "../../components/common/BottomMenu";

const OurServices = (props) => {
  return (
    <View style={styles.container}>
      <ImgHeader />
      <View style={styles.titleWrapper}>
        <Text style={styles.titleTxt}>OUR SERVICES</Text>
      </View>
      <View style={styles.serviceWrapper}>
        {servicesData.map((item, index) => {
          if (index > 2) return;
          return (
            <View key={index} style={styles.serviceCard}>
              <View style={styles.imgWrapper}>
                <Image
                  resizeMode="contain"
                  style={{ height: "50%", width: "50%" }}
                  source={item?.img}
                />
              </View>
              <Text style={styles.serviceText}>{item?.title}</Text>
            </View>
          );
        })}
      </View>

      <View style={styles.serviceWrapper}>
        {servicesData.map((item, index) => {
          if (index < 3) return;
          if (index > 5) return;
          return (
            <View key={index} style={styles.serviceCard}>
              <View style={styles.imgWrapper}>
                <Image
                  resizeMode="contain"
                  style={{ height: "55%", width: "55%" }}
                  source={item?.img}
                />
              </View>
              <Text style={styles.serviceText}>{item?.title}</Text>
            </View>
          );
        })}
      </View>

      <View style={[styles.serviceWrapper, { justifyContent: "center" }]}>
        {servicesData.map((item, index) => {
          if (index < 6) return;
          return (
            <View key={index} style={styles.serviceCard}>
              <View style={styles.imgWrapper}>
                <Image
                  resizeMode="contain"
                  style={{ height: "55%", width: "55%" }}
                  source={item?.img}
                />
              </View>
              <Text style={styles.serviceText}>{item?.title}</Text>
            </View>
          );
        })}
      </View>

      <BottomMenu navigation={props.navigation} select="service" />
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
    height: hp("10%"),
    width: wp("90%"),
    justifyContent: "flex-end",
    marginBottom: hp("2%"),
  },
  titleTxt: {
    fontFamily: fontStyle.BOLD,
    fontSize: fontStyle.MEDIUM,
    color: fontStyle.TXT_WHITE,
  },
  serviceWrapper: {
    flexDirection: "row",
    width: wp("92%"),
    justifyContent: "space-between",
  },
  serviceCard: {
    width: wp("29%"),
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingTop: hp("1.8%"),
    paddingBottom: hp("1.8%"),
    marginBottom: hp("1.3%"),
    alignItems: "center",
    paddingHorizontal: wp("2%"),
  },
  imgWrapper: {
    height: hp("6%"),
    width: hp("6%"),
    borderRadius: 100,
    backgroundColor: colorScheme.BTN_LIGHT,
    justifyContent: "center",
    alignItems: "center",
  },
  serviceText: {
    marginTop: hp("1.5%"),
    fontFamily: fontStyle.REG,
    color: fontStyle.TXT_DARK,
    textAlign: "center",
  },
});

const mapStateToProps = (state) => ({
  errors: state.errors.errors,
});

export default connect(mapStateToProps)(OurServices);
