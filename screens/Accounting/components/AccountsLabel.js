import React, { useEffect, useState, useRef } from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  Pressable,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { RFValue as rf } from "react-native-responsive-fontsize";
import { connect } from "react-redux";
import { colorScheme, fontStyle } from "../../../Theme";

const AccountsLabel = (props) => {
  const { item } = props;
  return (
    <View style={styles.labelWrapper}>
      <Text
        style={[
          styles.labelText,
          { color: item?.color ? item?.color : fontStyle.TXT_WHITE },
        ]}
      >
        {item?.label}
      </Text>
      <Text style={styles.accountsNum}>
        ${item?.amount?.toLocaleString("en-US")}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  labelWrapper: {
    height: hp("7%"),
    width: wp("100%"),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderColor: colorScheme.PLC_COLOR,
    borderBottomWidth: 1,
    paddingHorizontal: wp("5%"),
  },
  labelText: {
    fontFamily: fontStyle.SBOLD,
    fontSize: fontStyle.SMALL,
    color: fontStyle.TXT_WHITE,
  },
  accountsNum: {
    fontFamily: fontStyle.SBOLD,
    fontSize: fontStyle.SMALL,
    color: colorScheme.BTN_PRM,
  },
});

const mapStateToProps = (state) => ({
  errors: state.errors.errors,
});

export default connect(mapStateToProps)(AccountsLabel);
