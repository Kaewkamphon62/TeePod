import * as React from "react";
import { StyleSheet, Button, View, Text, TextInput } from "react-native";
import axios from "axios";

const SignUp_Screen = () => {
  const [InputSighUp, setInputSighUp] = React.useState({
    username: "",
    email: "",
    password1: "",
    password2: "",
  });

  const handleSubmit = async (e) => {
    //Fake SignUp_Screen
    e.preventDefault();
    console.log("");
    console.log(InputSighUp);
  };

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
        <Button title="Comfirm" onPress={handleSubmit} />
      </View>
    </View>
  );
};

export default SignUp_Screen;

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
