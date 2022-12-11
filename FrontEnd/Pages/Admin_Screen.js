import * as React from "react";
import { StyleSheet, Button, View, Text } from "react-native";

import { PrivateRoute_Context } from "../Routers/PrivateRoute";

const Admin_Screen = () => {
  /////////////////////////////////////////////////////////////////
  const { authSign } = React.useContext(PrivateRoute_Context);
  /////////////////////////////////////////////////////////////////

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Home Screen</Text>

      <Button
        title="Function"
        onPress={() => console.log("Admin_Page Call")}
      />

      {/* <Button title="Logout" onPress={() => removeValue()} /> */}
      <Button title="Logout" onPress={authSign.signOut} />
    </View>
  );
};

export default Admin_Screen;

const styles = StyleSheet.create({});
