import * as React from "react";
import { StyleSheet, Button, View, Text, TextInput } from "react-native";
import axios from "axios";
import { useState } from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";

const SignIn_Screen = ({ navigation }) => {
  const [InputSighIn, setInputSighIn] = React.useState({
    username: "",
    password: "",
  });

  // const {signIn} = React.useContext(AuthContext);
  // .post("http://10.0.2.2:3000/Token", Test)

  const storeData = async (value) => {
    try {
      await AsyncStorage.setItem("@storage_Key", value);
    } catch (e) {
      // saving error
    }
  };

  const handleSubmit = async (e) => {
    //Fake SignIn_Screen
    // e.preventDefault();

    await axios
      .post("http://192.168.137.1:3000/Token", { InputSighIn })
      .then(async (res) => {
        //res.data.token จาก BackEnd
        // console.log(typeof value) //ดู type ของตัวแปรเช่นเป็น object หรือ string
        if (res.data.token != false) {
          await storeData(res.data.token);
          // console.log('ได้รับ Token(SS.js): ', res.data.token)
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <View style={styles.app}>
      <Text style={{ color: "black" }}>SignIn_Screen Form</Text>

      <View style={styles.row}>
        <Text style={{ color: "black" }}>Usrename</Text>
        <TextInput
          style={styles.input}
          onChangeText={async (e) => {
            await setInputSighIn({
              username: e,
              password: InputSighIn.password,
            });
          }}
        />
      </View>

      <View style={styles.row}>
        <Text style={{ color: "black" }}>Password</Text>
        <TextInput
          secureTextEntry={true}
          style={styles.input}
          onChangeText={async (e) => {
            await setInputSighIn({
              username: InputSighIn.username,
              password: e,
            });
          }}
        />
      </View>

      <Text></Text>
      <View style={styles.row}>
        <Button title="Sign IN" onPress={handleSubmit} />
        <Button title="Sign UP" onPress={() => navigation.navigate("SignUp")} />
      </View>
    </View>
  );
};

export default SignIn_Screen;

const styles = StyleSheet.create({
  app: {
    backgroundColor: "#B1D76B",
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
