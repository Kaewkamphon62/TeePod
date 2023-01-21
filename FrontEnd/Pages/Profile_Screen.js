import { StyleSheet, Text, View, Pressable } from "react-native";
import React from "react";
import { PrivateRoute_Context } from "../Routers/PrivateRoute";

const Profile_Screen = () => {
  /////////////////////////////////////////////////////////////////
  const { authSign, otherFunction, state } =
    React.useContext(PrivateRoute_Context);
  /////////////////////////////////////////////////////////////////
  return (
    <View style={styles.Container}>
      {/* <View style={{ flex: 1, backgroundColor: "red" }} />
      <View style={{ flex: 1, backgroundColor: "darkorange" }} />
      <View style={{ flex: 1, backgroundColor: "green" }} /> */}

      <View
        style={{
          height: "5%",
          justifyContent: "center",
          // alignItems: "center",
          borderWidth: 1,
          flex: 0.75,
        }}
      >
        <View style={{ flexDirection: "row"}}>
          <Text
            style={[
              styles.fontStyle,
              { flex: 1, backgroundColor: "red", textAlign: "center"},
            ]}
          >
            Hello
          </Text>
          <Text
            style={[
              styles.fontStyle,
              { flex: 1, backgroundColor: "green", textAlign: "center" },
            ]}
          >
            Hello
          </Text>
        </View>
      </View>

      <View
        style={{
          justifyContent: "flex-end",
          alignItems: "stretch",
          borderWidth: 1,
          flex: 1,
          // backgroundColor: "red"
        }}
      >
        <View style={styles.FlexContainer}>
          <Text style={styles.fontStyle}>TestText</Text>
        </View>

        <View style={styles.FlexContainer}>
          <Text style={styles.fontStyle}>TestText</Text>
        </View>

        <View
          style={[
            styles.FlexContainer,
            {
              marginBottom: "10%",
            },
          ]}
        >
          <Text style={styles.fontStyle}>TestText</Text>
        </View>

        <View
          style={{
            height: "15%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Pressable
            style={styles.button}
            onPress={async () => await authSign.signOut()}
          >
            <Text style={styles.fontStyle}>ออกจากระบบ</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default Profile_Screen;

const styles = StyleSheet.create({
  Container: {
    flexDirection: "column",
    alignItems: "stretch",
    justifyContent: "center",
    flex: 1,
    padding: 0,
    backgroundColor: "#ebecf1",
  },

  FlexContainer: {
    height: "15%",
    justifyContent: "center",
    alignItems: "center",
    // borderWidth: 1,
    borderTopWidth: 1,
  },

  fontStyle: {
    fontSize: 20,
  },

  button: {
    alignItems: "center",
    justifyContent: "center",
    // paddingVertical: 8,
    // paddingHorizontal: 10,
    height: "80%",
    width: "95%",
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: "#e4e5ea",
  },
});
