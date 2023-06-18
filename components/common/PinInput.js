import React, { useState } from "react";
import { SafeAreaView, Text, StyleSheet } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { RFValue as rf } from "react-native-responsive-fontsize";
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from "react-native-confirmation-code-field";
import { colorScheme, fontStyle } from "../../Theme";

const CELL_COUNT = 4;

const PinInput = ({ setCode }) => {
  const [value, setValue] = useState("");
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  return (
    <SafeAreaView style={styles.root}>
      <CodeField
        ref={ref}
        {...props}
        // Use `caretHidden={false}` when users can't paste a text value, because context menu doesn't appear
        value={value}
        onChangeText={(val) => {
          setValue(val);
          setCode(val);
        }}
        cellCount={CELL_COUNT}
        rootStyle={styles.codeFieldRoot}
        keyboardType="number-pad"
        textContentType="oneTimeCode"
        renderCell={({ index, symbol, isFocused }) => (
          <Text
            key={index}
            style={[styles.cell, isFocused && styles.focusCell]}
            onLayout={getCellOnLayoutHandler(index)}
          >
            {symbol || (isFocused ? <Cursor /> : null)}
          </Text>
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    height: hp("8%"),
    width: wp("90%"),
    alignSelf: "center",
    justifyContent: "flex-end",
    marginBottom: hp("4%"),
  },
  codeFieldRoot: { marginTop: hp("2%") },
  cell: {
    width: hp("9%"),
    height: hp("6.5%"),
    lineHeight: 38,
    fontFamily: fontStyle.MED,
    fontSize: rf(24),
    borderRadius: 30,
    textAlign: "center",
    textAlignVertical: "center",
    backgroundColor: colorScheme.WHITE,
    color: fontStyle.TXT_DARK,
  },
  focusCell: {
    borderColor: "#000",
  },
});

export default PinInput;
