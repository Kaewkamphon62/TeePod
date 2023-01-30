import { StyleSheet, View, Pressable, Text } from "react-native";
import React from "react";
import * as Progress from "react-native-progress";
import { PrivateRoute_Context } from "../Routers/PrivateRoute";
import axios from "axios";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
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
  const { otherFunction, state } = React.useContext(PrivateRoute_Context);
  /////////////////////////////////////////////////////////////////

  const [KeyIOT, setKeyIOT] = React.useState(null);
  const [DataIoT, setDataIoT] = React.useState({
    tempc: null,
    moisture: null, //ดิน
    humid: null, //อากาศ
  });

  const [DetailShow, setDetailShow] = React.useState({
    tempc: null,
    humid: null,
    moisture: null,
  });

  React.useEffect(() => {
    (async () => {
      // clearTimer(getDeadTime());

      if (KeyIOT != null) {
        // ดึงข้อมูล KeyIOT ของ User นั้นๆ
        await axios
          .post("http://192.168.137.1:3000/loadIotData", { KeyIOT })
          .then(async (res) => {
            if (res.data.keyzero != undefined) {
              setDataIoT({
                tempc: res.data.keyzero.tempc,
                moisture: res.data.keyzero.moisture,
                humid: res.data.keyzero.humid,
              });

              //อุณหภูมิ
              let IF_tempc = "";
              if (res.data.keyzero.tempc) {
              }

              //ความชื้นในดิน
              let IF_moisture = "";
              if (res.data.keyzero.moisture) {
              }
              if (res.data.keyzero.moisture > 800) {
                IF_moisture = "เซนเซอร์อยู่ในอากาศ";
              } else if (res.data.keyzero.moisture >= 800) {
                IF_moisture = "ดินแห้ง";
              } else if (res.data.keyzero.moisture >= 300) {
                IF_moisture = "ดินชื้น";
              } else if (res.data.keyzero.moisture < 300) {
                IF_moisture = "ดินเปียก";
              }

              //ความชื้นในอากาศ
              let IF_humid = "";
              if (res.data.keyzero.humid) {
              }

              setDetailShow({
                tempc: IF_tempc,
                moisture: IF_moisture,
                humid: IF_humid,
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
        await otherFunction.getMemberData({ username: state.userName }); //โหลดเมื่อเข้าแอพใหม่
      }
    })();
  }, [KeyIOT, state.name_fp]);

  // React.useEffect(() => {
  //   (async () => {
  //     // await otherFunction.getDataIOT({ Key: state.KeyIOT });
  //     await otherFunction.getDataIOT({ Key: state.KeyIOT });
  //   })();
  // }, []);

  // otherFunction.getDataIOT({ Key: state.keyIOT })
  // console.log(state)
  //////////////////////////////////////////////////////////////////////////////// Time

  const [Milliseconds, setMilliseconds] = React.useState(null);
  const [ShowTime, setShowTime] = React.useState(null);
  const [CountTime, setCountTime] = React.useState(false);
  const [ProgressClock, setProgressClock] = React.useState(0);

  const Convert_Milliseconds = (e) => {
    var hours = Math.floor((e % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((e % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((e % (1000 * 60)) / 1000);

    if (hours < 10) {
      hours = String("0" + hours);
    }
    if (minutes < 10) {
      minutes = String("0" + minutes);
    }
    if (seconds < 10) {
      seconds = String("0" + seconds);
    }
    return hours + ":" + minutes + ":" + seconds;
  };

  React.useEffect(() => {
    // console.log("sunbathing_time: ", state.sunbathing_time);
    setMilliseconds(state.sunbathing_time);
    setShowTime(Convert_Milliseconds(state.sunbathing_time));
  }, [state.sunbathing_time]);

  React.useEffect(() => {
    if (ShowTime == null && Milliseconds != null) {
      setShowTime(Convert_Milliseconds(Milliseconds));
    }

    if (CountTime == true) {
      if (Milliseconds == 50000) {
        //หยุดที่ 50 วินาที
        console.log("เวลามิลลิวินาทีถึงค่าที่กำหนดแล้ว คือ: ", Milliseconds);
      } else {
        setTimeout(() => {
          setProgressClock(ProgressClock + 1000);

          setMilliseconds(Milliseconds - 1000);
          setShowTime(Convert_Milliseconds(Milliseconds - 1000));
        }, 1000);
      }
    }
  }, [CountTime, Milliseconds]);

  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          marginTop: "15%",
        }}
      >
        <Text style={{ marginBottom: "1%", fontSize: 20 }}>อาบแดด</Text>

        {state.sunbathing_time != null ? (
          <Progress.Circle
            borderWidth={3}
            // unfilledColor={"black"}
            progress={ProgressClock / state.sunbathing_time}
            size={200}
            thickness={10}
            showsText={true}
            unfilledColor={"black"}
          />
        ) : (
          <Progress.Circle
            borderWidth={3}
            // unfilledColor={"black"}
            progress={0}
            size={200}
            thickness={10}
            showsText={true}
            unfilledColor={"black"}
          />
        )}

        <View
          style={{
            flexDirection: "row",
            marginTop: "7.5%",
            alignItems: "center",
          }}
        >
          <View
            style={{ flex: 1.2, alignItems: "flex-end", marginRight: "2%" }}
          >
            <Text style={{ fontSize: 20 }}>อาบแดด:</Text>
          </View>
          <View style={{ flex: 0.75, alignItems: "center" }}>
            <Text style={{ fontSize: 22 }}>{ShowTime}</Text>
          </View>
          <View style={{ flex: 1, alignItems: "flex-start", marginLeft: "2%" }}>
            <MaterialCommunityIcons
              style={{ textAlign: "center" }}
              name="clock-edit-outline"
              size={30}
              color="black"
              onPress={async () => console.log("แก้ไขเวลา")}
            />
          </View>
        </View>
      </View>

      <View
        style={{
          flex: 1,
          marginHorizontal: "5%",
          // backgroundColor: "red",
        }}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            marginHorizontal: "5%",
            // backgroundColor: "blue",
          }}
        >
          <View
            style={{
              marginBottom: "3%",
              flex: 1,
              // backgroundColor: "gray",
              justifyContent: "center",
              height: "100%",
              width: "100%",
            }}
          >
            <View style={{ flexDirection: "row" }}>
              <Text style={{ marginBottom: "2%", flex: 1, textAlign: "left" }}>
                อุณหภูมิภายนอก
              </Text>
              <View style={{ marginRight: "2%" }}>
                <Text>TestText</Text>
              </View>

              <View style={{ marginTop: "1.5%" }}>
                <Menu>
                  <MenuTrigger>
                    <Ionicons
                      style={{ textAlign: "right", fontSize: 12 }}
                      name="alert-circle-outline"
                      color="black"
                    />
                  </MenuTrigger>
                  <MenuOptions style={{ width: "200%" }}>
                    <MenuOption>
                      <Text>{"TestText"}</Text>
                    </MenuOption>
                  </MenuOptions>
                </Menu>
              </View>
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
                  style={{ width: "100%", height: "100%" }}
                  width={null}
                  height={20}
                  progress={DataIoT.tempc * 0.01}
                />
              ) : (
                <Progress.Bar progress={0} width={300} height={20} />
              )}

              <View style={{ position: "absolute", right: "2.5%" }}>
                {DataIoT.tempc != null ? (
                  <Text style={{ textAlign: "right", fontSize: 15 }}>
                    {DataIoT.tempc} °C
                  </Text>
                ) : null}
              </View>
            </View>
          </View>

          <View
            style={{
              marginBottom: "3%",
              flex: 1,
              // backgroundColor: "gray",
              justifyContent: "center",
              height: "100%",
              width: "100%",
            }}
          >
            <View style={{ flexDirection: "row" }}>
              <Text style={{ marginBottom: "2%", flex: 1, textAlign: "left" }}>
                ความชื้นในดิน
              </Text>
              <View style={{ marginRight: "2%" }}>
                <Text>{DetailShow.moisture}</Text>
              </View>

              <View style={{ marginTop: "1.5%" }}>
                <Menu>
                  <MenuTrigger>
                    <Ionicons
                      style={{ textAlign: "right", fontSize: 12 }}
                      name="alert-circle-outline"
                      color="black"
                    />
                  </MenuTrigger>
                  <MenuOptions style={{ width: "200%" }}>
                    <MenuOption>
                      <Text>{"> 1000: เซนเซอร์อยู่ในอากาศ"}</Text>
                    </MenuOption>

                    <MenuOption>
                      <Text>800-1000: ดินแห้ง</Text>
                    </MenuOption>

                    <MenuOption>
                      <Text>300-800: ดินชื้น</Text>
                    </MenuOption>

                    <MenuOption>
                      <Text>{"< 300: ดินเปียก"}</Text>
                    </MenuOption>
                  </MenuOptions>
                </Menu>
              </View>
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
                  style={{ width: "100%", height: "100%" }}
                  width={null}
                  height={20}
                  progress={DataIoT.moisture / 1024}
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

          <View
            style={{
              marginBottom: "3%",
              flex: 1,
              // backgroundColor: "green",
              justifyContent: "center",
              height: "100%",
              width: "100%",
            }}
          >
            <View style={{ flexDirection: "row" }}>
              <Text style={{ marginBottom: "2%", flex: 1, textAlign: "left" }}>
                ความชื้นในอากาศ
              </Text>

              <View style={{ marginRight: "2%" }}>
                <Text>TestText</Text>
              </View>

              <View style={{ marginTop: "1.5%" }}>
                <Menu>
                  <MenuTrigger>
                    <Ionicons
                      style={{ textAlign: "right", fontSize: 12 }}
                      name="alert-circle-outline"
                      color="black"
                    />
                  </MenuTrigger>
                  <MenuOptions>
                    <MenuOption style={{ padding: 20 }}>
                      <Text>Menu TestText</Text>
                    </MenuOption>
                  </MenuOptions>
                </Menu>
              </View>
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
                  style={{ width: "100%", height: "100%" }}
                  width={null}
                  height={20}
                  progress={DataIoT.humid / 100}
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
            onPress={async () => {
              if (CountTime == true) {
                setCountTime(false);
              } else {
                setCountTime(true);
              }
            }}
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
    height: "100%",
    borderWidth: 1,
    borderRadius: 10,
    // backgroundColor: "#e4e5ea",
  },
});
