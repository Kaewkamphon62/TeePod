import * as React from "react";
import { StyleSheet, Button, View, Text, TextInput } from "react-native";
import { PrivateRoute_Context } from "../Routers/PrivateRoute";

const SignIn_Screen = ({ navigation }) => {
  /////////////////////////////////////////////////////////////////
  const { authSign } = React.useContext(PrivateRoute_Context);
  /////////////////////////////////////////////////////////////////

  const [InputSighIn, setInputSighIn] = React.useState({
    username: null,
    password: null,
  });

  return (
    <View style={styles.container}>
      <Text style={{ color: "black", textAlign: "center" }}>SignIn</Text>

      <Text style={styles.label}>Username</Text>
      <TextInput
        style={styles.input}
        onChangeText={async (e) => {
          await setInputSighIn({
            username: e,
            password: InputSighIn.password,
          });
        }}
      />

      <Text style={styles.label}>Password</Text>
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

      <Text>{"\n"}</Text>
      <View style={styles.row}>
        <Button
          title="Sign IN"
          onPress={async () => {
            if (InputSighIn.username == null || InputSighIn.password == null) {
              alert("กรุณากรอกข้อมูลให้ครบถ้วน");
            } else {
              authSign.signIn({ InputSighIn });
            }
          }}
        />
        <Button title="Sign UP" onPress={() => navigation.navigate("SignUp")} />
      </View>
    </View>
  );
};

export default SignIn_Screen;

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
