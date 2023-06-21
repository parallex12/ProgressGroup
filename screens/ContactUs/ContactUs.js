import React, { useEffect, useState, useRef } from "react";
import { StyleSheet, View, Text } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { connect } from "react-redux";
import { colorScheme, fontStyle } from "../../Theme";
import Header from "../../components/common/Header";
import BottomMenu from "../../components/common/BottomMenu";
import ContactCard from "./components/ContactCard";
import MapComponent from "./components/MapComponent";
import { ScrollView } from "react-native";

const ContactUs = (props) => {
  return (
    <View style={styles.container}>
      <Header navigation={props.navigation} title="Contact Us" />
      <ScrollView
        contentContainerStyle={{
          alignItems: "center",
          paddingBottom: hp("10%"),
        }}
      >
        <ContactCard
          title="Contact Us"
          detail="(289) 813-3378"
          img={require("../../assets/call.png")}
        />
        <ContactCard
          title="Email Us"
          detail="info@progressgroupinc.com"
          img={require("../../assets/sms.png")}
        />
        <ContactCard
          title="Office Location"
          img={require("../../assets/location.png")}
          noBorder
        />
        <MapComponent title="Oakville Office" />
        <MapComponent title="Toronto Office" />
      </ScrollView>
      <BottomMenu navigation={props.navigation} select="contact" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: colorScheme.BACK_COLOR,
  },
});

const mapStateToProps = (state) => ({
  errors: state.errors.errors,
});

export default connect(mapStateToProps)(ContactUs);
