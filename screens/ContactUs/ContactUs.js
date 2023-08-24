import React from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Linking,
  Platform,
} from "react-native";
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
import MapView, { Marker } from "react-native-maps";

const ContactUs = (props) => {
  const dialCall = () => {
    let phoneNumber = "";

    if (Platform.OS === "android") {
      phoneNumber = "tel:${+12898133378}";
    } else {
      phoneNumber = "telprompt:${+12898133378}";
    }

    Linking.openURL(phoneNumber);
  };

  const openMailer = () => {
    Linking.openURL("mailto:info@progressgroupinc.com");
  };

  const openGoogleMaps = () => {
    const { latitude, longitude } = location.coords;
    const url = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
    Linking.openURL(url);
  };

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
          detail="(289) 707-5891"
          img={require("../../assets/call.png")}
          onPress={dialCall}
        />
        <ContactCard
          title="Email Us"
          detail="info@martinitec.com"
          img={require("../../assets/sms.png")}
          onPress={openMailer}
        />
        <ContactCard
          title="Office Location"
          img={require("../../assets/location.png")}
          noBorder
        />
        <MapComponent
          title="Oakville Office"
          latitude="43.42657348186626"
          longitude="-79.7157079763088"
        />
        <MapView
          style={styles.mapWrapper}
          initialRegion={{
            latitude: 43.42657348186626,
            longitude: -79.7157079763088,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
          }}
        >
          <Marker
            coordinate={{
              latitude: 43.42657348186626,
              longitude: -79.7157079763088,
            }}
            title="OakVille Office"
            description="OakVille Office"
          />
        </MapView>
        <MapComponent
          title="Toronto Office"
          latitude="43.63846947361462"
          longitude="-79.42520027241855"
        />
        <MapView
          style={styles.mapWrapper}
          initialRegion={{
            latitude: 43.63846947361462,
            longitude: -79.42520027241855,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
          }}
        >
          <Marker
            coordinate={{
              latitude: 43.63846947361462,
              longitude: -79.42520027241855,
            }}
            title="Toronto Office"
            description="Toronto Office"
          />
        </MapView>
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
  mapWrapper: {
    height: hp("20%"),
    width: wp("90%"),
    marginBottom: hp("1.5%"),
  },
});

const mapStateToProps = (state) => ({
  errors: state.errors.errors,
});

export default connect(mapStateToProps)(ContactUs);
