import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import React from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { PrivateRoute, PrivateRoute_Context } from "./Routers/PrivateRoute";

import Loading_Screen from "./Pages/Loading_Screen";

import Admin_Screen from "./Pages/Admin_Screen";

import Home_Screen from "./Pages/Home_Screen";
import Page01 from "./Pages/Page01";
import Page02 from "./Pages/Page02";

import SignIn_Screen from "./Pages/SignIn_Screen";
import SignUp_Screen from "./Pages/SignUp_Screen";

const Stack = createNativeStackNavigator();

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
          // console.log("state.token", state.token);
          // console.log("state.authContext", state.authContext);

          // console.log("state.authContext", state.authContext.userToken);
          // console.log("state", state.stateToken.userToken)
          // console.log("state", event.state.userToken);

          //ซ่อน Header แบบ Group และ Page
          // <Stack.Navigator screenOptions={{headerShown: false}}>
          // <Stack.Screen options={{headerShown: false}} name="route-name" component={ScreenComponent} />

          // console.log("event.state.role", event.state.role);

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
              ) : event.state.role != "Admin" ? (
                <Stack.Navigator screenOptions={{ headerShown: false }}>
                  <Stack.Screen name="Member_Home" component={Home_Screen} />
                  <Stack.Screen name="Page01" component={Page01} />
                  <Stack.Screen name="Page02" component={Page02} />
                </Stack.Navigator>
              ) : (
                <Stack.Navigator screenOptions={{ headerShown: false }}>
                  <Stack.Screen name="Admin_Home" component={Admin_Screen} />
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
