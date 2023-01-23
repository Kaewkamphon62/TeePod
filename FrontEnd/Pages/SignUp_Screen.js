import * as React from "react";
import { StyleSheet, Pressable, View, Text, TextInput } from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import Fontisto from "react-native-vector-icons/Fontisto";
import { PrivateRoute_Context } from "../Routers/PrivateRoute";
import axios from "axios";

const SignUp_Screen = ({ navigation }) => {
  /////////////////////////////////////////////////////////////////
  // const { authSign } = React.useContext(PrivateRoute_Context);
  /////////////////////////////////////////////////////////////////
  const [InputSighUp, setInputSighUp] = React.useState({
    username: null,
    email: null,
    password1: null,
    password2: null,
  });

  return (
    <View
      style={{
        justifyContent: "center",
        flex: 1,
      }}
    >
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          flex: 0.75,
        }}
      >
        <Text
          style={{
            fontSize: 40,
          }}
        >
          Sign Up
        </Text>
      </View>

      <View
        style={{
          justifyContent: "center",
          flex: 1,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: "5%",
          }}
        >
          <AntDesign
            style={{
              marginHorizontal: "5%",
              position: "absolute",
              textAlign: "center",
            }}
            name="user"
            size={35}
            color="black"
          />
          <View style={{ flex: 1, marginHorizontal: "5%" }}>
            <TextInput
              style={[styles.input, { paddingStart: 65 }]}
              placeholder={"Username"}
              onChangeText={async (e) => {
                setInputSighUp({
                  ...InputSighUp,
                  username: e,
                });
              }}
            />
          </View>
        </View>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: "5%",
          }}
        >
          <Fontisto
            style={{
              marginHorizontal: "5%",
              position: "absolute",
              textAlign: "center",
            }}
            name="email"
            size={35}
            color="black"
          />
          <View style={{ flex: 1, marginHorizontal: "5%" }}>
            <TextInput
              style={[styles.input, { paddingStart: 65 }]}
              placeholder={"Email"}
              onChangeText={async (e) => {
                setInputSighUp({
                  ...InputSighUp,
                  email: e,
                });
              }}
            />
          </View>
        </View>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: "5%",
          }}
        >
          <AntDesign
            style={{
              marginHorizontal: "5%",
              position: "absolute",
              textAlign: "center",
            }}
            name="lock1"
            size={35}
            color="black"
          />
          <View style={{ flex: 1, marginHorizontal: "5%" }}>
            <TextInput
              style={[styles.input, { paddingStart: 65 }]}
              placeholder={"Password"}
              onChangeText={async (e) => {
                setInputSighUp({
                  ...InputSighUp,
                  password1: e,
                });
              }}
            />
          </View>
        </View>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: "5%",
          }}
        >
          <AntDesign
            style={{
              marginHorizontal: "5%",
              position: "absolute",
              textAlign: "center",
            }}
            name="lock1"
            size={35}
            color="black"
          />
          <View style={{ flex: 1, marginHorizontal: "5%" }}>
            <TextInput
              style={[styles.input, { paddingStart: 65 }]}
              placeholder={"Password Comfirm"}
              onChangeText={async (e) => {
                setInputSighUp({
                  ...InputSighUp,
                  password2: e,
                });
              }}
            />
          </View>
        </View>

        <View
          style={{
            // alignItems: "center",
            marginHorizontal: "5%",
          }}
        >
          <Pressable
            style={styles.button}
            onPress={async () => {
              if (
                InputSighUp.email != null &&
                InputSighUp.username != null &&
                InputSighUp.password1 != null &&
                InputSighUp.password2 != null
              ) {
                if (InputSighUp.password1 != InputSighUp.password2) {
                  alert("รหัสผ่านไม่ตรงกัน");
                } else {
                  await axios
                    .post("http://192.168.137.1:3000/register", { InputSighUp })
                    .then(async (res) => {
                      //res.data.token ว่งมาจากจาก BackEnd (res = response)
                      // console.log(typeof value) //ดู type ของตัวแปรเช่นเป็น object หรือ string
                      if (res.data.alert) {
                        alert(res.data.alert);
                        navigation.navigate("SignIn");
                      }
                    })
                    .catch((error) => {
                      console.log(error);
                    });
                }
              } else {
                alert("กรุณากรอกข้อมูลให้ครบถ้วน");
              }
            }}
          >
            <Text style={styles.fontStyle}>สมัครสมาชิก</Text>
          </Pressable>
        </View>
      </View>

      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          flex: 0.25,
        }}
      >
        {/* <Text>Hello</Text> */}
      </View>
    </View>
  );
};

export default SignUp_Screen;

const styles = StyleSheet.create({
  fontStyle: {
    textAlign: "center",
  },

  button: {
    justifyContent: "center",
    height: "40%",
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
