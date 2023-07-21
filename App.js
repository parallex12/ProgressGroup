import React, { useState, useEffect } from "react";
import { View } from "react-native";
import { AppNavigator } from "./routes/AppNavigator";
import { Provider } from "react-redux";
import store from "./state-management/store";
import { useFonts } from "expo-font";
import { ActivityIndicator } from "react-native";
import firebase from "firebase/compat/app";
import { getFirestore } from "firebase/firestore";
import { firebaseConfig } from "./state-management/actions/env";

export default function App() {
  useEffect(() => {
    if (!firebase.apps.length) {
      const app = firebase.initializeApp(firebaseConfig);
      const db = getFirestore(app);
    }
  }, []);

  const [fontsLoaded] = useFonts({
    AR: require("./assets/fonts/Arimo-Regular.ttf"),
    AM: require("./assets/fonts/Arimo-Medium.ttf"),
    ASB: require("./assets/fonts/Arimo-SemiBold.ttf"),
    AB: require("./assets/fonts/Arimo-Bold.ttf"),
  });

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator size="large" color="black" />
      </View>
    );
  }

  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );
}
