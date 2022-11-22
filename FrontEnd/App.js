import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Home_Screen from "./Pages/Home_Screen";
import Page01 from "./Pages/Page01";
import Page02 from "./Pages/Page02";

import SignIn_Screen from "./Pages/SignIn_Screen";
import SignUp_Screen from "./Pages/SignUp_Screen";
// import PrivateRoute from './Routers/PrivateRoute';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      {/* <PrivateRoute> */}
      {1 == 1 ? (
        <Stack.Navigator>
          <Stack.Screen name="SignIn" component={SignIn_Screen} />
          <Stack.Screen name="SignUp" component={SignUp_Screen} />
        </Stack.Navigator>
      ) : (
        <Stack.Navigator>
          <Stack.Screen name="Home" component={Home_Screen} />
          <Stack.Screen name="Page01" component={Page01} />
          <Stack.Screen name="Page02" component={Page02} />
        </Stack.Navigator>
      )}
      {/* </PrivateRoute> */}
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
