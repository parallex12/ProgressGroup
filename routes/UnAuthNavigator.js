import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import OnBoarding from "../screens/OnBoarding/OnBoarding";
const { Navigator, Screen } = createStackNavigator();

function AppNavigation() {
  return (
    <Navigator screenOptions={{ headerShown: false}}>
      <Screen name="OnBoarding" component={OnBoarding} />
    </Navigator>
  );
}
export const UnAuthNavigator = () => (
  <NavigationContainer>
    <AppNavigation />
  </NavigationContainer>
);
