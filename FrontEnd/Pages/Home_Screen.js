import * as React from "react";
import {
  StyleSheet,
  Button,
  View,
  Text,
  TextInput,
  Pressable,
} from "react-native";

import { PrivateRoute_Context } from "../Routers/PrivateRoute";

const Home_Screen = ({ navigation }) => {
  /////////////////////////////////////////////////////////////////
  const { authSign } = React.useContext(PrivateRoute_Context);
  /////////////////////////////////////////////////////////////////

  // const removeValue = async () => {
  //   try {
  //     await AsyncStorage.removeItem("@storage_Key");
  //     // navigation.navigate("SignIn")
  //   } catch (e) {
  //     // remove error
  //   }
  //   console.log("Done.");
  // };

  const [KeyIOT, setKeyIOT] = React.useState("");

  return (
    <View
      style={{
        backgroundColor: "#D0F48E",
        flex: 1,
        // alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Text style={{ textAlign: "center" }}>
        {"\n"} Home Screen {"\n"}
      </Text>

      <View style={styles.row}>
        <Text style={{ color: "black" }}>KeyIOT</Text>
        <TextInput
          style={{
            backgroundColor: "white",
            height: 35,
            width: "50%",
            margin: 8,
            borderWidth: 1,
            padding: 10,
          }}
          onChangeText={async (e) => {
            await setKeyIOT(e);
          }}
        />

        <Button
          title="SubmitKey"
          onPress={() => console.log("ส่งค่า KeyIOT: ", KeyIOT)}
        />
      </View>

      {/* <View style={{ flexDirection: "row" }}>
        <View style={{ flex: 1 }}>
          <Button title="Button 1" />
        </View>
        <View style={{ flex: 1 }}>
          <Button title="Button 2" />
        </View>
      </View> */}

      <View style={{ flexDirection: "row", paddingLeft: "4%" }}>
        <View style={{ flex: 1 }}>
          <Text>สถานะ:</Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text>TextTest</Text>
        </View>
      </View>

      <View style={{ flexDirection: "row", paddingLeft: "4%" }}>
        <View style={{ flex: 1 }}>
          <Text>แบตเตอร์รี่:</Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text>TextTest</Text>
        </View>
      </View>

      <View style={{ flexDirection: "row", paddingLeft: "4%" }}>
        <View style={{ flex: 1 }}>
          <Text>อุณหภูมิ:</Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text>TextTest</Text>
        </View>
      </View>

      <View style={{ flexDirection: "row", paddingLeft: "4%" }}>
        <View style={{ flex: 1 }}>
          <Text>ความชื้นในดิน:</Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text>TextTest</Text>
        </View>
      </View>

      <View style={{ flexDirection: "row", paddingLeft: "4%" }}>
        <View style={{ flex: 1 }}>
          <Text>ความชื้นในอากาศ:</Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text>TextTest</Text>
        </View>
      </View>

      <View style={{ flexDirection: "row", paddingLeft: "4%" }}>
        <View style={{ flex: 1 }}>
          <Text>วันนี้อาบแดดไปแล้ว:</Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text>TextTest</Text>
        </View>
      </View>

      <Text>{"\n"}</Text>
      <Text>{"\n"}</Text>

      <View style={{ flexDirection: "row", paddingLeft: "4%" }}>
        <View
          style={{ flex: 2, alignItems: "center", justifyContent: "center" }}
        >
          <Text>TextTest</Text>
        </View>
        <View style={{ flex: 1, paddingRight: "4%" }}>
          <Button title="เริ่ม/หยุด" />
        </View>
      </View>

      <Text>{"\n"}</Text>

      <View style={{ flexDirection: "row", paddingLeft: "4%" }}>
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <Text>ชื่อพืช:</Text>
        </View>
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <Text>TextTest</Text>
        </View>
        <View style={{ flex: 1, paddingRight: "4%" }}>
          <Button
            title="เลือกพืช"
            onPress={() => navigation.navigate("Member_SelectFlowerting")}
          />
        </View>
      </View>

      <Text>{"\n"}</Text>
      <Text>{"\n"}</Text>

      {/* <Button title="Logout" onPress={() => removeValue()} /> */}
      <Text style={{ textAlign: "center" }}>
        <Pressable style={styles.button} onPress={authSign.signOut}>
          <Text style={{ color: "white" }}>Logout</Text>
        </Pressable>
      </Text>
    </View>
  );
};

export default Home_Screen;

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
