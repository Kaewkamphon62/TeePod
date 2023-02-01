import {
  StyleSheet,
  Text,
  View,
  Pressable,
  TextInput,
  KeyboardAvoidingView,
} from "react-native";
import React, { useState } from "react";
import { PrivateRoute_Context } from "../Routers/PrivateRoute";
import { Image } from "react-native";
import axios from "axios";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";

const Profile_Screen = ({ navigation }) => {
  /////////////////////////////////////////////////////////////////
  const { authSign, otherFunction, state } =
    React.useContext(PrivateRoute_Context);
  /////////////////////////////////////////////////////////////////

  const [InputKey, setInputKey] = React.useState({
    Username: null,
    Key: null,
  });

  React.useEffect(() => {
    (async () => {
      // await otherFunction.getMemberData({ username: state.userName }); //โหลดเมื่อเข้าแอพใหม่

      if (InputKey.Key != null) {
        await otherFunction.getDataIOT({ Key: InputKey.Key }); //โหลดเมื่อเข้าแอพใหม่
      } else {
        setInputKey({
          ...InputKey,
          Username: state.userName,
        });
      }
    })();
  }, [InputKey.Key]);

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
        {/* <View
          style={{ flex: 3, justifyContent: "center", alignItems: "center" }}
        >
          <Image
            style={{
              resizeMode: "cover",
              marginTop: "17.5%",
              width: "42.5%",
              height: "72.5%",
              borderStyle: "solid",
              borderColor: "black",
              borderRadius: 100,
              borderWidth: 1,
            }}
            source={require("../Assets/images/avatar.jpg")}
          />
        </View> */}

        <View style={{ flex: 1, justifyContent: "center" }}>
          <Text style={{ textAlign: "center", fontSize: 30 }}>
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
              style={{ flex: 0.5, textAlign: "center", marginHorizontal: "2%" }}
              name="key-link"
              size={35}
              color="black"
            />

            {state.keyIOT != null ? (
              <>
                <Text
                  style={[styles.fontStyle, { flex: 2, textAlign: "center" }]}
                >
                  {state.keyIOT}
                </Text>

                <FontAwesome
                  style={{
                    flex: 0.5,
                    textAlign: "center",
                    marginHorizontal: "2%",
                  }}
                  name="exchange"
                  size={35}
                  color="black"
                  onPress={async () => {
                    await axios
                      .post("http://192.168.137.1:3000/Member_DeleteKey", {
                        InputKey,
                      })
                      .then(async (res) => {
                        if (res.data.complete != undefined) {
                          await otherFunction.getMemberData({
                            username: state.userName,
                          });
                        }

                        if (res.data.resError != undefined) {
                          alert(res.data.resError);
                        }
                      })
                      .catch((error) => {
                        console.log(error);
                      });
                  }}
                />
              </>
            ) : (
              <View
                style={{
                  flexDirection: "row",
                  flex: 2,
                  marginHorizontal: "2%",
                }}
              >
                <View
                  style={{
                    flex: 2,
                    alignItems: "center",
                    marginHorizontal: "2%",
                  }}
                >
                  {/* <KeyboardAvoidingView> */}
                  <TextInput
                    style={[
                      styles.fontStyle,
                      {
                        borderWidth: 1,
                        flex: 1,
                        width: "100%",
                        borderRadius: 10,
                        textAlign: "center",
                      },
                    ]}
                    placeholder={"KeyIOT"}
                    onChangeText={async (e) => {
                      setInputKey({
                        ...InputKey,
                        Key: e,
                      });
                    }}
                  />
                  {/* </KeyboardAvoidingView> */}
                </View>

                <View
                  style={{
                    flex: 1,
                    alignItems: "center",
                  }}
                >
                  <Pressable
                    style={[styles.button, { flex: 2 }]}
                    // style={{backgroundColor: "yellow"}}
                    onPress={async () => {
                      if (InputKey != null) {
                        await axios
                          .post("http://192.168.137.1:3000/Member_InputKey", {
                            InputKey,
                          })
                          .then(async (res) => {
                            if (res.data.complete != undefined) {
                              await otherFunction.getMemberData({
                                username: state.userName,
                              });

                              navigation.navigate("Member_DashBoard");
                            }

                            if (res.data.resError != undefined) {
                              alert(res.data.resError);
                            }
                          })
                          .catch((error) => {
                            console.log(error);
                          });
                      } else {
                        alert("กรุณากรอกข้อมูลให้ถูกต้อง");
                      }
                    }}
                  >
                    <Text style={styles.fontStyle}>Summit</Text>
                  </Pressable>
                </View>
              </View>
            )}
          </View>
          <View style={{ flexDirection: "row", marginVertical: "2%" }}>
            <MaterialCommunityIcons
              style={{ flex: 0.5, textAlign: "center" }}
              name="flower"
              size={35}
              color="black"
            />

            {state.name_fp != null ? (
              <View style={{ flexDirection: "row", flex: 2 }}>
                <Text
                  style={[styles.fontStyle, { flex: 2, textAlign: "center" }]}
                >
                  {state.name_fp}
                </Text>

                <FontAwesome
                  style={{
                    flex: 0.5,
                    textAlign: "center",
                    marginHorizontal: "2%",
                  }}
                  name="exchange"
                  size={35}
                  color="black"
                  onPress={async () =>
                    navigation.navigate("Member_SelectFlowerting")
                  }
                />
              </View>
            ) : (
              <>
                <Pressable
                  style={[
                    styles.fontStyle,
                    {
                      flex: 2,
                      alignItems: "center",
                      marginHorizontal: "2%",
                      height: "100%",
                      width: "95%",
                      borderWidth: 1,
                      borderRadius: 10,
                      backgroundColor: "#e4e5ea",
                    },
                  ]}
                  onPress={async () =>
                    navigation.navigate("Member_SelectFlowerting")
                  }
                >
                  <Text style={styles.fontStyle}>เลือกพืช</Text>
                </Pressable>
              </>
            )}
          </View>
        </View>

        {/* <View style={styles.FlexContainer}>
          <Pressable
            style={styles.button}
            onPress={async () => navigation.navigate("Member_SelectFlowerting")}
          >
            <Text style={styles.fontStyle}>เปลี่ยนพืช</Text>
          </Pressable>
        </View> */}

        <View style={styles.FlexContainer}>
          <Pressable
            style={styles.button}
            onPress={async () => navigation.navigate("Member_Demo_mqtt")}
          >
            <Text style={styles.fontStyle}>Demo Mqtt</Text>
          </Pressable>
        </View>

        <View
          style={[
            styles.FlexContainer,
            {
              marginBottom: "10%",
            },
          ]}
        ></View>

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
