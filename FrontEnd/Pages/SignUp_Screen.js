import * as React from "react";
import { StyleSheet, Button, View, Text, TextInput } from "react-native";
import { PrivateRoute_Context } from "../Routers/PrivateRoute";

const SignUp_Screen = () => {
  /////////////////////////////////////////////////////////////////
  const { authSign } = React.useContext(PrivateRoute_Context);
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
            authSign.signUp({ InputSighUp });
          }}
        />
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
