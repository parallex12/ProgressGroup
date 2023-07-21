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
import {
  updateUserDataOnly,
  updateImgFunc,
} from "../../state-management/actions/Features/Actions";
import { ActivityIndicator } from "react-native";
import { validateUpdateInfo } from "../../utils/validation";
import * as ImagePicker from "expo-image-picker";

const Settings = (props) => {
  const [loading, setLoading] = useState(false);
  const [userInfo, setUserInfo] = useState(props?.adminData);
  const [userForm, setUserForm] = useState({
    firstName: userInfo?.firstName,
    lastName: userInfo?.lastName,
    phone: userInfo?.phone,
    address: userInfo?.address,
    sin: userInfo?.sin,
  });
  const [image, setImage] = useState(null);
  let id = "07664DVAMVB268ktoycT";
  useEffect(() => {
    setUserInfo(props?.adminData);
  }, [props?.adminData]);

  const onSubmit = () => {
    validateUpdateInfo(userForm, props?.adminData, image)
      .then((res) => {
        if (res == "imageValid") {
          props?.updateImgFunc(
            "imageValid",
            id,
            null,
            image,
            props?.navigation,
            setLoading
          );
        } else if (res == "dataValid") {
          props?.updateUserDataOnly(
            id,
            userForm,
            props?.navigation,
            setLoading
          );
        } else if (res == "bothValid") {
          props?.updateImgFunc(
            "bothValid",
            id,
            userForm,
            image,
            props?.navigation,
            setLoading
          );
        } else {
          alert("Something Went Wrong");
        }
      })
      .catch((e) => props?.navigation.navigate("Profile"));
  };

  const handleChangeValue = (key, value) => {
    setUserForm((prev) => ({ ...prev, [key]: value }));
  };

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.container}>
      <Header navigation={props.navigation} title="Account Settings" back />
      {/* Profile Card */}

      <View style={styles.profileCard}>
        <View style={styles.imgWrapper}>
          <Image
            style={{ height: "100%", width: "100%" }}
            resizeMode="cover"
            source={
              image
                ? { uri: image }
                : userInfo?.profile?.url
                ? { uri: userInfo?.profile?.url }
                : require("../../assets/profileImg.png")
            }
          />
        </View>
        <View style={styles.cameraWrapper}>
          <TouchableOpacity onPress={pickImage} style={styles.cameraIcon}>
            <Ionicons name="camera" size={rf(11)} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView>
        <TextField
          title="First Name"
          placeHolder="Zuhran"
          value={userForm.firstName}
          onChangeText={(val) => handleChangeValue("firstName", val)}
        />
        <TextField
          title="Last Name"
          placeHolder="Ahmed"
          value={userForm.lastName}
          onChangeText={(val) => handleChangeValue("lastName", val)}
        />
        <TextField
          title="Phone Number"
          placeHolder="+923114053544"
          value={userForm.phone}
          onChangeText={(val) => handleChangeValue("phone", val)}
        />
        <TextField
          title="Address"
          placeHolder="Gulberg 2, Lahore"
          value={userForm.address}
          onChangeText={(val) => handleChangeValue("address", val)}
        />
        <TextField
          title="SIN"
          value={userForm.sin}
          onChangeText={(val) => handleChangeValue("sin", val)}
        />
        <View style={styles.buttonWrapper}>
          <PrimaryButton
            title={
              loading ? (
                <ActivityIndicator size={"small"} color="#fff" />
              ) : (
                "Save"
              )
            }
            onPress={onSubmit}
          />
        </View>
      </ScrollView>
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
  adminData: state.main.admin_data,
});
export default connect(mapStateToProps, { updateUserDataOnly, updateImgFunc })(
  Settings
);
