import * as React from "react";
import { StyleSheet, Button, View, Text } from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { PrivateRoute_Context } from "../Routers/PrivateRoute";

const Home_Screen = ({ navigation }) => {
  /////////////////////////////////////////////////////////////////
  const { authSign } = React.useContext(PrivateRoute_Context);
  /////////////////////////////////////////////////////////////////

  const removeValue = async () => {
    try {
      await AsyncStorage.removeItem("@storage_Key");
      // navigation.navigate("SignIn")
    } catch (e) {
      // remove error
    }

    console.log("Done.");
  };

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Home Screen</Text>

      <Button
        title="Go to Page01"
        onPress={() => navigation.navigate("Page01")}
      />

      <Button
        title="Go to Page02"
        onPress={() => navigation.navigate("Page02")}
      />

      {/* <Button title="Logout" onPress={() => removeValue()} /> */}
      <Button title="Logout" onPress={authSign.signOut} />
    </View>
  );
};

export default Home_Screen;

const styles = StyleSheet.create({});
