import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import React from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { PrivateRoute, PrivateRoute_Context } from "./Routers/PrivateRoute";

import Loading_Screen from "./Pages/Loading_Screen";

import Admin_Screen from "./Pages/Admin_Screen";
import Admin_AddFlowering_Screen from "./Pages/Admin_AddFlowering";
import Admin_EditFlowering_Screen from "./Pages/Admin_EditFlowering";
import ExampleUI_Screen from "./Pages/ExampleUI_Screen";

import Home_Screen from "./Pages/Home_Screen";
import DashBoard_Screen from "./Pages/DashBoard_Screen";
import SelectFlowerting_Screen from "./Pages/SelectFlowerting_Screen";

import SignIn_Screen from "./Pages/SignIn_Screen";
import SignUp_Screen from "./Pages/SignUp_Screen";

const Stack = createNativeStackNavigator();

const Tabs = createBottomTabNavigator();
const tabs = [
  { name: "A" },
  { name: "B" },
  { name: "C" },
  { name: "D" },
  { name: "E" },
];

export default function App() {
  console.log("");
  // console.log("App.js");

  // const [userToken, setUserToken] = React.useState(null);
  // const [loading, setLoading] = React.useState(true);

  // if (loading == true) {
  //   return <></>;
  // }

  return (
    <PrivateRoute>
      <PrivateRoute_Context.Consumer>
        {(event) => {
          // console.log("CheckUser: ", event.state.userName)
          // console.log("state.token", state.token);
          // console.log("state.authContext", state.authContext);

          // console.log("state.authContext", state.authContext.userToken);
          // console.log("state", state.stateToken.userToken)
          // console.log("state", event.state.userToken);

          //ซ่อน Header แบบ Group และ Page
          // <Stack.Navigator screenOptions={{headerShown: false}}>
          // <Stack.Screen options={{headerShown: false}} name="route-name" component={ScreenComponent} />

          // console.log("event.state.role", event.state.userRole);
          return (
            <NavigationContainer>
              {event.state.isLoading == true ? (
                <Stack.Navigator screenOptions={{ headerShown: false }}>
                  <Stack.Screen
                    name="Loading_Screen"
                    component={Loading_Screen}
                  />
                </Stack.Navigator>
              ) : event.state.userToken == null ? (
                <Stack.Navigator screenOptions={{ headerShown: false }}>
                  <Stack.Screen name="SignIn" component={SignIn_Screen} />
                  <Stack.Screen name="SignUp" component={SignUp_Screen} />
                </Stack.Navigator>
              ) : event.state.userRole != "Admin" ? (
                <Stack.Navigator screenOptions={{ headerShown: false }}>
                  <Stack.Screen name="Member_Home" component={Home_Screen} />
                  <Stack.Screen
                    name="Member_DashBoard"
                    component={DashBoard_Screen}
                  />
                  <Stack.Screen
                    name="Member_SelectFlowerting"
                    component={SelectFlowerting_Screen}
                  />
                </Stack.Navigator>
              ) : (
                <Stack.Navigator screenOptions={{ headerShown: false }}>
                  <Stack.Screen name="Admin_Home" component={Admin_Screen} />
                  <Stack.Screen
                    name="Admin_AddFlowering_Screen"
                    component={Admin_AddFlowering_Screen}
                  />
                  <Stack.Screen
                    name="Admin_EditFlowering_Screen"
                    component={Admin_EditFlowering_Screen}
                  />

                  <Stack.Screen
                    name="ExampleUI_Screen"
                    component={ExampleUI_Screen}
                  />
                </Stack.Navigator>
              )}
            </NavigationContainer>
          );
        }}
      </PrivateRoute_Context.Consumer>
    </PrivateRoute>
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
