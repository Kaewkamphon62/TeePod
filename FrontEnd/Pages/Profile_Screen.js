import { StyleSheet, Text, View, Pressable } from "react-native";
import React from "react";
import { PrivateRoute_Context } from "../Routers/PrivateRoute";
import { Image } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const Profile_Screen = () => {
  /////////////////////////////////////////////////////////////////
  const { authSign, otherFunction, state } =
    React.useContext(PrivateRoute_Context);
  /////////////////////////////////////////////////////////////////
  return (
    <View style={styles.Container}>
      <View
        style={{
          height: "5%",
          justifyContent: "center",
          borderWidth: 1,
          flex: 0.75,
        }}
      >
        <View
          style={{ flex: 3, justifyContent: "center", alignItems: "center" }}
        >
          <Image
            style={{
              resizeMode: "cover",
              marginTop: "17.5%",
              width: "40%",
              height: "67.5%",
              borderStyle: "solid",
              borderColor: "black",
              borderRadius: 100,
              borderWidth: 1,
            }}
            source={require("../Assets/images/avatar.jpg")}
          />
        </View>

        <View style={{ flex: 1, justifyContent: "center" }}>
          <Text style={{ textAlign: "center", fontSize: 25 }}>
            {state.userName}
          </Text>
        </View>
      </View>

      <View
        style={{
          justifyContent: "flex-end",
          alignItems: "stretch",
          borderWidth: 1,
          flex: 1,
        }}
      >
        <View
          style={{
            height: "15%",
            justifyContent: "center",
            alignItems: "center",
            flex: 1,
          }}
        >
          <View style={{ flexDirection: "row", marginVertical: "2%" }}>
            <MaterialCommunityIcons
              style={{ flex: 1, textAlign: "center" }}
              name="key-link"
              size={35}
              color="black"
            />

            <Text style={[styles.fontStyle, { flex: 2, textAlign: "center" }]}>
              TestText
            </Text>
          </View>
          <View style={{ flexDirection: "row", marginVertical: "2%" }}>
            <MaterialCommunityIcons
              style={{ flex: 1, textAlign: "center" }}
              name="flower"
              size={35}
              color="black"
            />

            <Text style={[styles.fontStyle, { flex: 2, textAlign: "center" }]}>
              TestText
            </Text>
          </View>
        </View>

        <View style={styles.FlexContainer}>
          {/* <Text style={styles.fontStyle}>TestText</Text> */}
        </View>

        <View style={styles.FlexContainer}>
          {/* <Text style={styles.fontStyle}>TestText</Text> */}
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
