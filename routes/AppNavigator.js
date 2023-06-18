import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import OurServices from "../screens/OurServices/OurServices";
import Profile from "../screens/Profile/Profile";
import ContactUs from "../screens/ContactUs/ContactUs";
const { Navigator, Screen } = createStackNavigator();

function AppNavigation() {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="OurServices" component={OurServices} />
      <Screen name="Profile" component={Profile} />
      <Screen name="ContactUs" component={ContactUs} />
    </Navigator>
  );
}
export const AppNavigator = () => (
  <NavigationContainer>
    <AppNavigation />
  </NavigationContainer>
);
