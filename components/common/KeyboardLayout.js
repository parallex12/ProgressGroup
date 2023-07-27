import {
  View,
  Text,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import React from "react";
import { Keyboard } from "react-native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";

const KeyboardLayout = (props) => {
  return (
    <KeyboardAvoidingView
      keyboardVerticalOffset={0}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView>
          <View
            style={{
              flex: 1,
              alignItems: "center",
              height: hp("100%"),
            }}
          >
            {props?.children}
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default KeyboardLayout;
