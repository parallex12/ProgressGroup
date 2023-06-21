import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { RFValue as rf } from "react-native-responsive-fontsize";
import { Entypo } from "@expo/vector-icons";
import { colorScheme, fontStyle } from "../../Theme";
const Header = (props) => {
  return (
    <View style={styles.container}>
      {props?.back && (
        <TouchableOpacity
          onPress={() => props.navigation.goBack()}
          style={styles.iconWrapper}
        >
          <Entypo
            name="chevron-thin-left"
            size={rf(13)}
            color={colorScheme.WHITE}
          />
        </TouchableOpacity>
      )}
      <Text style={styles.titleTxt}>{props?.title}</Text>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    height: hp("8%"),
    marginTop: hp("5%"),
    width: wp("100%"),
    justifyContent: "center",
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: colorScheme.PLC_COLOR,
  },
  iconWrapper: {
    position: "absolute",
    left: wp("4%"),
  },
  titleTxt: {
    fontFamily: fontStyle.SBOLD,
    color: fontStyle.TXT_WHITE,
    fontSize: fontStyle.HEADING,
  },
});
