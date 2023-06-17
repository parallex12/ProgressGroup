import "react-native-gesture-handler";
import { StyleSheet, Text, View } from "react-native";
import { AppNavigator } from "./routes/AppNavigator";
import { UnAuthNavigator } from "./routes/UnAuthNavigator";
import { Provider } from "react-redux";
import store from "./state-management/store";

export default function App() {
  return (
    <Provider store={store}>
      <UnAuthNavigator />
    </Provider>
  );
}
