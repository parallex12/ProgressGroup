import React, { useEffect, useState, useRef } from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  Pressable,
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
import { AntDesign } from "@expo/vector-icons";
import AccountsLabel from "./components/AccountsLabel";
import { accountsDataHelper } from "../../helper/data";
import PrimaryButton from "../../components/common/PrimaryButton";
import { generateArrayOfYears } from "../../utils/utils";
import * as FileSystem from "expo-file-system";
import * as MediaLibrary from "expo-media-library";
import * as Sharing from "expo-sharing";
import * as Asset from "expo-asset";
import { shareAsync } from "expo-sharing";

const Accounting = (props) => {
  const [accountsData, setAccountsData] = useState(accountsDataHelper);
  const [yearPop, setYearPop] = useState(false);
  const [selectedYear, setselectedYear] = useState("");

  const savePDFToDevice = async () => {
    try {
      const asset = Asset.Asset.fromModule(
        require("../../assets/IncomeStatement.pdf")
      );
      await asset.downloadAsync();

      const pdfUri = `${FileSystem.cacheDirectory}IncomeStatement.pdf`;
      await FileSystem.copyAsync({
        from: asset.localUri,
        to: pdfUri,
      });

      save(asset.localUri, "IncomeStatement.pdf");
    } catch (error) {
      console.error("Error saving PDF:", error);
    }
  };

  const save = async (uri, filename) => {
    try {
      const base64 = await FileSystem.readAsStringAsync(uri, {
        encoding: FileSystem.EncodingType.Base64,
      });
      const localUri = `${FileSystem.cacheDirectory}${filename}`;
      await FileSystem.writeAsStringAsync(localUri, base64, {
        encoding: FileSystem.EncodingType.Base64,
      });

      await Sharing.shareAsync(localUri, {
        mimeType: "application/pdf",
        copyToCacheDirectory: true,
      });
    } catch (error) {
      console.error("Error saving PDF:", error);
    }
  };

  const onSelectYear = (item) => {
    setselectedYear(item);
    setYearPop(false);
  };

  return (
    <View style={styles.container}>
      <Header navigation={props.navigation} title="Accounting" back />
      <View style={styles.labelWrapper}>
        <Text style={styles.labelText}>Fiscal Year</Text>
        <Pressable
          onPress={() => setYearPop(true)}
          style={styles.yearBoxWrapper}
        >
          <Text style={styles.inputText}>
            {selectedYear ? selectedYear : "Select"}
          </Text>
          <AntDesign
            name="caretdown"
            size={rf(11)}
            color={colorScheme.PLC_COLOR}
          />
        </Pressable>
      </View>
      {accountsDataHelper.map((item, index) => {
        return <AccountsLabel item={item} key={index} />;
      })}
      <View style={styles.buttonWrapper}>
        <PrimaryButton onPress={savePDFToDevice} title="Download PDF" />
      </View>
      {yearPop && (
        <>
          <Pressable
            onPress={() => setYearPop(false)}
            style={styles.popLayer}
          ></Pressable>
          <View style={styles.popContainer}>
            <ScrollView showsVerticalScrollIndicator={false}>
              {generateArrayOfYears().map((item, index) => {
                return (
                  <Pressable
                    onPress={() => onSelectYear(item)}
                    style={styles.popItem}
                    key={index}
                  >
                    <Text style={styles.popText}>{item}</Text>
                  </Pressable>
                );
              })}
            </ScrollView>
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: colorScheme.BACK_COLOR,
  },
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
    fontFamily: fontStyle.MED,
    fontSize: fontStyle.SMALL,
    color: fontStyle.TXT_WHITE,
  },
  yearBoxWrapper: {
    height: hp("4.5%"),
    width: wp("23%"),
    backgroundColor: colorScheme.WHITE,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: wp("3%"),
    borderRadius: 20,
  },
  inputText: {
    fontFamily: fontStyle.MED,
    fontSize: fontStyle.SMALL,
    color: colorScheme.PLC_COLOR,
  },
  buttonWrapper: {
    flex: 1,
    justifyContent: "flex-end",
    marginBottom: hp("10%"),
  },
  popLayer: {
    height: hp("100%"),
    width: wp("100%"),
    position: "absolute",
    backgroundColor: "rgba(0,0,0,0.7)",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 2,
  },
  popContainer: {
    width: wp("50%"),
    height: hp("20%"),
    justifyContent: "center",
    backgroundColor: "#fff",
    borderRadius: 10,
    position: "absolute",
    top: hp("40%"),
    zIndex: 10,
  },
  popItem: {
    height: hp("5%"),
    width: wp("50%"),
    justifyContent: "center",
    alignItems: "center",
  },
  popText: {
    fontFamily: fontStyle.MED,
    fontSize: fontStyle.SMALL,
    color: fontStyle.TXT_DARK,
  },
});

const mapStateToProps = (state) => ({
  errors: state.errors.errors,
});

export default connect(mapStateToProps)(Accounting);
