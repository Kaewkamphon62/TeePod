import * as React from "react";
import { StyleSheet, Button, View, Text, TextInput } from "react-native";
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
    <View style={styles.app}>
      <Text style={{ color: "black" }}>SignUp_Screen Form</Text>

      <View style={styles.row}>
        <Text style={{ color: "black" }}>Usrename</Text>
        <TextInput
          style={styles.input}
          onChangeText={async (e) => {
            await setInputSighUp({
              username: e,
              email: InputSighUp.email,
              password1: InputSighUp.password1,
              password2: InputSighUp.password2,
            });
          }}
        />
      </View>

      <View style={styles.row}>
        <Text style={{ color: "black" }}>Email</Text>
        <TextInput
          style={styles.input}
          onChangeText={async (e) => {
            await setInputSighUp({
              username: InputSighUp.username,
              email: e,
              password1: InputSighUp.password1,
              password2: InputSighUp.password2,
            });
          }}
        />
      </View>

      <View style={styles.row}>
        <Text style={{ color: "black" }}>Password1</Text>
        <TextInput
          secureTextEntry={true}
          style={styles.input}
          onChangeText={async (e) => {
            await setInputSighUp({
              username: InputSighUp.username,
              email: InputSighUp.email,
              password1: e,
              password2: InputSighUp.password2,
            });
          }}
        />
      </View>

      <View style={styles.row}>
        <Text style={{ color: "black" }}>Password2</Text>
        <TextInput
          secureTextEntry={true}
          style={styles.input}
          onChangeText={async (e) => {
            await setInputSighUp({
              username: InputSighUp.username,
              email: InputSighUp.email,
              password1: InputSighUp.password1,
              password2: e,
            });
          }}
        />
      </View>

      <Text></Text>
      <View style={styles.row}>
        <Button
          title="Comfirm"
          onPress={async () => {
            if (
              InputSighUp.email != null &&
              InputSighUp.username != null &&
              InputSighUp.password1 != null &&
              InputSighUp.password2 != null
            ) {
              if (InputSighUp.password1 != InputSighUp.password2) {
                alert("รหัสผ่านไม่ตรงกัน");
              }else{
                await axios
                .post("http://192.168.137.1:3000/register", {InputSighUp})
                .then(async (res) => {
                  //res.data.token ว่งมาจากจาก BackEnd (res = response)
                  // console.log(typeof value) //ดู type ของตัวแปรเช่นเป็น object หรือ string
                  if (res.data.alert) {
                    alert(res.data.alert);
                    navigation.navigate("SignIn")
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
        />
      </View>
    </View>
  );
};

export default SignUp_Screen;

const styles = StyleSheet.create({
  app: {
    backgroundColor: "#D0F48E",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  row: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: "1rem",
  },

  input: {
    backgroundColor: "white",
    height: 35,
    width: "65%",
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});
