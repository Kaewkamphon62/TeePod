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
    <View style={styles.container}>
      <Text style={{ color: "black", textAlign: "center", fontSize: 40, paddingBottom: 50}}>SignUp</Text>

      <Text style={styles.label}>Username</Text>
      <TextInput
        style={styles.input}
        onChangeText={async (e) => {
          await setInputSighUp({
            ...InputSighUp,
            username: e,
          });
        }}
      />

      <Text style={styles.label}>Email Address</Text>
      <TextInput
        style={styles.input}
        onChangeText={async (e) => {
          await setInputSighUp({
            ...InputSighUp,
            email: e,
          });
        }}
      />

      <Text style={styles.label}>Password</Text>
      <TextInput
        secureTextEntry={true}
        style={styles.input}
        onChangeText={async (e) => {
          await setInputSighUp({
            ...InputSighUp,
            password1: e,
          });
        }}
      />

      <Text style={styles.label}>Password Comfirm</Text>
      <TextInput
        secureTextEntry={true}
        style={styles.input}
        onChangeText={async (e) => {
          await setInputSighUp({
            ...InputSighUp,
            password2: e,
          });
        }}
      />

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
        />
      </View>
    </View>
  );
};

export default SignUp_Screen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#D0F48E",
    flex: 1,
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
    borderStyle: "solid",
    borderColor: "#B7B7B7",
    borderRadius: 7,
    borderWidth: 1,
    fontSize: 15,
    height: 50,
    marginHorizontal: 10,
    paddingStart: 10,
    marginBottom: 15,
  },

  label: {
    marginBottom: 7,
    marginStart: 10,
  },
});
