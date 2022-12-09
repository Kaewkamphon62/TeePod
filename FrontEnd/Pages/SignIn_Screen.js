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
        <Button
          title="Sign IN"
          onPress={async () => {
            authSign.signIn({ InputSighIn });
          }}
        />
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
