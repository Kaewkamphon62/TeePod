import * as React from "react";
import { StyleSheet, View, Text, TextInput, Pressable } from "react-native";
import { PrivateRoute_Context } from "../Routers/PrivateRoute";
import AntDesign from "react-native-vector-icons/AntDesign";

const SignIn_Screen = ({ navigation }) => {
  /////////////////////////////////////////////////////////////////
  const { authSign, otherFunction } = React.useContext(PrivateRoute_Context);
  /////////////////////////////////////////////////////////////////

  const [InputSighIn, setInputSighIn] = React.useState({
    username: null,
    password: null,
  });

  return (
    <View
      style={{
        // backgroundColor: "#D0F48E",
        justifyContent: "center",
        flex: 1,
      }}
    >
      <Text style={{ textAlign: "center", fontSize: 40, paddingBottom: 100 }}>
        Sign In
      </Text>

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <AntDesign
          style={{
            flex: 1,
            marginHorizontal: "5%",
            paddingStart: 10,
            position: "absolute",
          }}
          name="user"
          size={35}
          color="black"
        />
        <View style={{ flex: 8, marginHorizontal: "5%" }}>
          <TextInput
            style={[styles.input, { paddingStart: 60 }]}
            placeholder={"Username"}
            onChangeText={async (e) => {
              setInputSighIn({
                username: e,
                password: InputSighIn.password,
              });
            }}
          />
        </View>
      </View>

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginVertical: "5%",
        }}
      >
        <AntDesign
          style={{
            flex: 1,
            marginHorizontal: "5%",
            paddingStart: 10,
            position: "absolute",
          }}
          name="lock"
          size={35}
          color="black"
        />
        <View style={{ flex: 8, marginHorizontal: "5%" }}>
          <TextInput
            style={[styles.input, { paddingStart: 60 }]}
            placeholder={"Password"}
            onChangeText={async (e) => {
              setInputSighIn({
                username: InputSighIn.username,
                password: e,
              });
            }}
          />
        </View>
      </View>

      {/* <Text style={styles.fontStyle}>TestText</Text> */}

      <View
        style={{
          alignItems: "center",
          marginHorizontal: "5%",
        }}
      >
        <Pressable
          style={styles.button}
          onPress={async () => {
            if (InputSighIn.username == null || InputSighIn.password == null) {
              alert("กรุณากรอกข้อมูลให้ครบถ้วน");
            } else {
              await authSign.signIn({ InputSighIn });
            }
          }}
        >
          <Text style={styles.fontStyle}>เข้าสู่ระบบ</Text>
        </Pressable>
      </View>

      <View style={{ flexDirection: "row", justifyContent: "center" }}>
        <Text style={styles.fontStyle}>Don't have an account? </Text>

        <Pressable onPress={async () => await navigation.navigate("SignUp")}>
          <Text style={[styles.fontStyle, { color: "#6495ED" }]}>Sign UP</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default SignIn_Screen;

const styles = StyleSheet.create({
  fontStyle: {
    textAlign: "center",
  },

  button: {
    justifyContent: "center",
    height: "25%",
    width: "100%",
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: "#e4e5ea",
  },

  input: {
    // backgroundColor: "white",
    borderColor: "black",
    borderStyle: "solid",
    borderRadius: 10,
    borderWidth: 1,
    fontSize: 15,
    height: 50,
    paddingStart: 15,
  },
});
