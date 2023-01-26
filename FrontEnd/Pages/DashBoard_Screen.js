import { StyleSheet, View, Pressable, Text } from "react-native";
import React from "react";
import * as Progress from "react-native-progress";
import { PrivateRoute_Context } from "../Routers/PrivateRoute";
import { CountdownCircleTimer } from "react-native-countdown-circle-timer";
import axios from "axios";
import Ionicons from "react-native-vector-icons/Ionicons";

import { MenuProvider } from "react-native-popup-menu";
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from "react-native-popup-menu";

const DashBoard_Screen = () => {
  /////////////////////////////////////////////////////////////////
  const { authSign, otherFunction, state } =
    React.useContext(PrivateRoute_Context);
  /////////////////////////////////////////////////////////////////

  const [KeyIOT, setKeyIOT] = React.useState(null);
  const [DataIoT, setDataIoT] = React.useState({
    tempc: null,
    humid: null, //อากาศ
    moisture: null, //ดิน
  });

  // console.log(DataIoT)
  //กำไร/ทุนx100

  React.useEffect(() => {
    (async () => {
      // clearTimer(getDeadTime());

      if (KeyIOT != null) {
        // ดึงข้อมูล KeyIOT ของ User นั้นๆ
        await axios
          .post("http://192.168.137.1:3000/getDB_IOT", { KeyIOT })
          .then(async (res) => {
            if (res.data.db != undefined) {
              setDataIoT({
                tempc: res.data.db.tempc,
                humid: res.data.db.humid,
                moisture: res.data.db.moisture,
              });
            }

            if (res.data.resError != undefined) {
              alert(res.data.resError);
            }
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        setKeyIOT(state.keyIOT);
      }
    })();
  }, [KeyIOT]);

  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          flex: 1,
          // backgroundColor: "red",
          alignItems: "center",
          justifyContent: "center",
          marginTop: "15%",
        }}
      >
        <Text style={{ marginBottom: "1%", fontSize: 20 }}>อาบแดด</Text>
        <Progress.Circle
          borderWidth={3}
          // unfilledColor={"black"}
          progress={0.5}
          size={200}
          thickness={10}
          showsText={true}
          unfilledColor={"black"}
        />

        {/* <Progress.CircleSnail color={"blue"} /> */}

        <Text style={{ marginTop: "7.5%", fontSize: 20 }}>
          เวลาที่เหลือ: 8:00:00
        </Text>
      </View>

      <View
        style={{
          flex: 1,
          marginHorizontal: "5%",
          // backgroundColor: "yellow",
        }}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            marginHorizontal: "5%",
            // marginTop: "10%"
            // backgroundColor: "gray"
          }}
        >
          <View style={{ marginBottom: "3%" }}>
            <View style={{ flexDirection: "row" }}>
              <Text style={{ marginBottom: "2%", flex: 1, textAlign: "left" }}>
                อุณหภูมิ
              </Text>
              {/* {DataIoT.tempc != null ? (
                <Text
                  style={{ marginBottom: "2%", flex: 1, textAlign: "right" }}
                >
                  {DataIoT.tempc} °C
                </Text>
              ) : null} */}
              <Text>TestText</Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                // backgroundColor: "gray",
              }}
            >
              {DataIoT.tempc != null ? (
                <Progress.Bar
                  progress={DataIoT.tempc / 100}
                  width={300}
                  height={20}
                />
              ) : (
                <Progress.Bar progress={0} width={300} height={20} />
              )}

              <View style={{ position: "absolute", right: "2.5%" }}>
                {DataIoT.tempc != null ? (
                  <Text style={{ textAlign: "right", fontSize: 15 }}>
                    {DataIoT.tempc} / 100°C
                  </Text>
                ) : null}

                {/* <Menu>
                  <MenuTrigger>
                    <Ionicons
                      style={{ textAlign: "right", fontSize: 12 }}
                      name="alert-circle-outline"
                      size={50}
                      color="black"
                    />
                  </MenuTrigger>
                  <MenuOptions>
                    <MenuOption style={{padding: 20}}>
                      <Text>MAX 100°C</Text>
                    </MenuOption>
                  </MenuOptions>
                </Menu> */}
              </View>
            </View>
          </View>

          <View style={{ marginBottom: "3%" }}>
            <View style={{ flexDirection: "row" }}>
              <Text style={{ marginBottom: "2%", flex: 1, textAlign: "left" }}>
                ความดันในดิน
              </Text>

              {/* {DataIoT.moisture != null ? (
                <Text
                  style={{ marginBottom: "2%", flex: 1, textAlign: "right" }}
                >
                  Analog {DataIoT.moisture}
                </Text>
              ) : null} */}
              <Text>TestText</Text>
            </View>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                // backgroundColor: "gray",
              }}
            >
              {DataIoT.moisture != null ? (
                <Progress.Bar
                  progress={DataIoT.moisture / 1024}
                  width={300}
                  height={20}
                />
              ) : (
                <Progress.Bar progress={0} width={300} height={20} />
              )}

              <View style={{ position: "absolute", right: "2.5%" }}>
                {DataIoT.moisture != null ? (
                  <Text style={{ textAlign: "right", fontSize: 15 }}>
                    {DataIoT.moisture} / 1024 Analog
                  </Text>
                ) : null}
              </View>
            </View>
          </View>

          <View style={{ marginBottom: "3%" }}>
            <View style={{ flexDirection: "row" }}>
              <Text style={{ marginBottom: "2%", flex: 1, textAlign: "left" }}>
                ความชื้นในอากาศ
              </Text>

              {/* {DataIoT.humid != null ? (
                <Text
                  style={{ marginBottom: "2%", flex: 1, textAlign: "right" }}
                >
                  {DataIoT.humid}% RH
                </Text>
              ) : null} */}
              <Text>TestText</Text>
            </View>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                // backgroundColor: "gray",
              }}
            >
              {DataIoT.humid != null ? (
                <Progress.Bar
                  progress={DataIoT.humid / 100}
                  width={300}
                  height={20}
                />
              ) : (
                <Progress.Bar progress={0} width={300} height={20} />
              )}

              <View style={{ position: "absolute", right: "2.5%" }}>
                {DataIoT.humid != null ? (
                  <Text style={{ textAlign: "right", fontSize: 15 }}>
                    {DataIoT.humid} / 100 % RH
                  </Text>
                ) : null}
              </View>
            </View>
          </View>
        </View>

        <View
          style={{
            flexDirection: "row",
            marginVertical: "5%",
            marginHorizontal: "10%",
            height: "12.5%",
            // backgroundColor: "gray",
          }}
        >
          <Pressable
            style={[
              styles.button,
              {
                flex: 1,
              },
            ]}
            onPress={async () => console.log("เริ่มการทำงาน")}
          >
            {state.keyIOT != null ? (
              <>
                <Text style={styles.fontStyle}>เริ่มการทำงาน</Text>
              </>
            ) : (
              <>
                <Text style={styles.fontStyle}>
                  คุณยังไม่ได้ลงทะเบียน KeyIOT
                </Text>
              </>
            )}

            {/* พอเริ่มการทำงานแล้วจะเปลี่ยนชื่อปุ่มเป็น
                -กำลังทำงาน สีเขียน
                -กำลังเตรียมการเริ่มต้น สีเหลือง
                -เกิดข้อผิดพลาด สีแดง
                */}
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default DashBoard_Screen;

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    justifyContent: "center",
    // paddingVertical: 8,
    // paddingHorizontal: 10,
    height: "100%",
    // width: "80%",
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: "#e4e5ea",
  },
});
