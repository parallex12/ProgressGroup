import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import SignIn from "../screens/SignIn/SignIn";
import ForgotPassword from "../screens/ForgotPassword/ForgotPassword";
import ResetPassword from "../screens/ResetPassword/ResetPassword";
import OurServices from "../screens/OurServices/OurServices";
import Profile from "../screens/Profile/Profile";
import ContactUs from "../screens/ContactUs/ContactUs";
import Settings from "../screens/Settings/Settings";
import Accounting from "../screens/Accounting/Accounting";
const { Navigator, Screen } = createStackNavigator();

function AppNavigation() {
  return (
    <Navigator screenOptions={{ headerShown: false, animationEnabled: false }}>
      <Screen name="SignIn" component={SignIn} />
      <Screen name="ContactUs" component={ContactUs} />
      <Screen name="ForgotPassword" component={ForgotPassword} />
      <Screen name="ResetPassword" component={ResetPassword} />
      <Screen name="OurServices" component={OurServices} />
      <Screen name="Profile" component={Profile} />
      <Screen name="Settings" component={Settings} />
      <Screen name="Accounting" component={Accounting} />
    </Navigator>
  );
}
export const AppNavigator = () => (
  <NavigationContainer>
    <AppNavigation />
  </NavigationContainer>
);
