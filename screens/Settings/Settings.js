import React, { useEffect, useState, useRef } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { RFValue as rf } from "react-native-responsive-fontsize";
import { connect } from "react-redux";
import { colorScheme, fontStyle } from "../../Theme";
import Header from "../../components/common/Header";
import BottomMenu from "../../components/common/BottomMenu";
import { Ionicons } from "@expo/vector-icons";
import TextField from "../../components/common/TextField";
import PrimaryButton from "../../components/common/PrimaryButton";

const Settings = (props) => {
  const [userForm, setUserForm] = useState({
    firstName: "Zuhran",
    lastName: "Ahmed",
    number: "+92 311 4053544",
    address: "Gulberg, Lahore",
    sin: "1234567890",
  });

  const onSubmit = () => {
    props?.navigation.navigate("OurServices");
  };

  return (
    <View style={styles.container}>
      <Header navigation={props.navigation} title="Account Settings" />
      {/* Profile Card */}

      <View style={styles.profileCard}>
        <View style={styles.imgWrapper}>
          <Image
            style={{ height: "100%", width: "100%" }}
            resizeMode="cover"
            source={require("../../assets/profileImg.png")}
          />
        </View>
        <View style={styles.cameraWrapper}>
          <TouchableOpacity style={styles.cameraIcon}>
            <Ionicons name="camera" size={rf(11)} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView>
        <TextField
          title="First Name"
          placeHolder="Zuhran"
          value={userForm.firstName}
        />
        <TextField
          title="Last Name"
          placeHolder="Ahmed"
          value={userForm.lastName}
        />
        <TextField
          title="Phone Number"
          placeHolder="+92 311 4053544"
          value={userForm.number}
        />
        <TextField
          title="Address"
          placeHolder="Gulberg 2, Lahore"
          value={userForm.address}
        />
        <TextField title="SIN" placeHolder="1234567890" value={userForm.sin} />
        <View style={styles.buttonWrapper}>
          <PrimaryButton title="Save" onPress={onSubmit} />
        </View>
      </ScrollView>
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
    height: hp("13%"),
    width: wp("100%"),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: hp("3%"),
    backgroundColor: "#1F1F20",
  },
  imgWrapper: {
    height: hp("10%"),
    width: hp("10%"),
    borderRadius: 100,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
  },
  cameraWrapper: {
    position: "absolute",
    right: wp("39%"),
    bottom: hp("1%"),
  },
  cameraIcon: {
    height: hp("3%"),
    width: hp("3%"),
    borderRadius: 100,
    backgroundColor: colorScheme.BACK_COLOR,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonWrapper: {
    marginTop: hp("3%"),
  },
});

const mapStateToProps = (state) => ({
  errors: state.errors.errors,
});

export default connect(mapStateToProps)(Settings);
