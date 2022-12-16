import * as React from "react";
import {
  StyleSheet,
  Button,
  View,
  Text,
  Pressable,
  TextInput,
} from "react-native";

import { PrivateRoute_Context } from "../Routers/PrivateRoute";

const Admin_Screen = ({ navigation }) => {
  /////////////////////////////////////////////////////////////////
  const { authSign } = React.useContext(PrivateRoute_Context);
  /////////////////////////////////////////////////////////////////

  return (
    <View
      style={{
        backgroundColor: "#D0F48E",
        flex: 1,
        // alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Text style={{ textAlign: "center" }}>Admin Screen</Text>

      {/* <View style={styles.row}> */}
        {/* <Button
          title="Function"
          onPress={() => console.log("Admin_Page Call")}
        /> */}
        {/* <Button title="Logout" onPress={() => removeValue()} /> */}
      {/* </View> */}

      {/* <View style={styles.row}> */}
        {/* <Button
          title="ExampleUI_Screen"
          onPress={() => navigation.navigate("ExampleUI_Screen")}
        /> */}
        {/* <Button title="Logout" onPress={() => removeValue()} /> */}
      {/* </View> */}

      <View style={styles.row}>
        <Button
          title="เพิ่มพืช"
          onPress={() => navigation.navigate("Admin_AddFlowering_Screen")}
        />
        {/* <Button title="Logout" onPress={() => removeValue()} /> */}
      </View>

      <Text>{"\n"}</Text>
      <Text>{"\n"}</Text>

      <Text style={{ textAlign: "center" }}>
        <Pressable style={styles.button} onPress={authSign.signOut}>
          <Text style={{ color: "white" }}>Logout</Text>
        </Pressable>
      </Text>
    </View>
  );
};

export default Admin_Screen;

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 2,
    elevation: 3,
    backgroundColor: "#2196f3",

    // paddingVertical: 8,
    // paddingHorizontal: 10,
    height: 40,
    width: 100,
  },

  row: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: "1rem",
  },
});
