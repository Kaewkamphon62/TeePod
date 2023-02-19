import { StyleSheet, View, Pressable, Text, Button } from "react-native";
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
import DateTimePicker from "@react-native-community/datetimepicker";

const DashBoard_Screen = () => {
  /////////////////////////////////////////////////////////////////
  const { otherFunction, state } = React.useContext(PrivateRoute_Context);
  /////////////////////////////////////////////////////////////////

  //status Button
  const [StatusButton, setStatusButton] = React.useState("เริ่มการทำงาน");

  /////////////////////////////////////////////////////////////////

  const [DetailShow, setDetailShow] = React.useState({
    tempc: null,
    humid: null,
    moisture: null,
  });
  const [StartTime, setStartTime] = React.useState(null);

  React.useEffect(() => {
    (async () => {
      // console.log("state.tempc: ", state.tempc);

      if (state.tempc != null) {
        // console.log("state.keyIOT != null");

        //อุณหภูมิ
        let IF_tempc = "";
        if (state.tempc >= 40) {
          IF_tempc = "อุณหภูมิสูงเกิน";
        } else if (state.tempc >= 15) {
          IF_tempc = "อุณหภูมิเหมาะสม";
        } else if (state.tempc < 15) {
          IF_tempc = "อุณหภูมิต่ำเกินไป";
        }

        //ความชื้นในดิน
        let IF_moisture = "";
        if (state.moisture > 800) {
          IF_moisture = "เซนเซอร์ติดตั้งไม่ถูกต้อง";
        } else if (state.moisture >= 800) {
          IF_moisture = "ดินแห้ง";
        } else if (state.moisture >= 300) {
          IF_moisture = "ดินชื้น";
        } else if (state.moisture < 300) {
          IF_moisture = "ดินเปียก";
        }

        //ความชื้นในอากาศ
        // console.log("state.humid: ", state.humid);
        let IF_humid = "";

        if (state.humid > 80) {
          IF_humid = "เหมาะสำหรับต้นกล้า";
        } else if (state.humid > 60) {
          IF_humid = "เหมาะสมสำหรับพืชเมืองร้อน";
        } else if (state.humid > 40) {
          IF_humid = "เหมาะสมสำหรับพืชส่วนใหญ่ที่จะเติบโต";
        } else if (state.humid > 20) {
          IF_humid = "ค่าเฉลี่ยสำหรับพืชในร่มส่วนใหญ่";
        } else if (state.humid <= 20) {
          IF_humid = "แห้งเกินไปสำหรับพืชในร่มส่วนใหญ่";
        }

        setDetailShow({
          tempc: IF_tempc,
          moisture: IF_moisture,
          humid: IF_humid,
        });
        setStartTime(state.sunbathing_time);
      }
      // clearTimer(getDeadTime());
      // if (state.keyIOT != null) {
      // ดึงข้อมูล KeyIOT ของ User นั้นๆ
      // console.log("state.keyIOT != null")

      // setDataIoT({
      //   tempc: state.tempc, //อุณหภูมิภายนอก
      //   moisture: state.moisture, //ดิน
      //   humid: state.humid, //อากาศ
      // });

      // //อุณหภูมิ
      // let IF_tempc = "";
      // if (state.tempc) {
      // }

      // //ความชื้นในดิน
      // let IF_moisture = "";
      // if (state.moisture) {
      // }
      // if (state.moisture > 800) {
      //   IF_moisture = "เซนเซอร์อยู่ในอากาศ";
      // } else if (state.moisture >= 800) {
      //   IF_moisture = "ดินแห้ง";
      // } else if (state.moisture >= 300) {
      //   IF_moisture = "ดินชื้น";
      // } else if (state.moisture < 300) {
      //   IF_moisture = "ดินเปียก";
      // }

      // //ความชื้นในอากาศ
      // let IF_humid = "";
      // if (state.humid) {
      // }

      // setDetailShow({
      //   tempc: IF_tempc,
      //   moisture: IF_moisture,
      //   humid: IF_humid,
      // });
      // }
      else {
        await otherFunction.getMemberData({ username: state.userName }); //โหลดเมื่อเข้าแอพใหม่
      }
      setCountTime(false);
    })();
  }, [state.keyIOT, state.tempc]);

  // otherFunction.getDataIOT({ Key: state.keyIOT });

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
      if (Milliseconds == 0) {
        //การแจ้งเตือน
        //การกำหนดการทำงานให้หยุด
        //หยุดที่ 50 วินาที

        console.log("เวลามิลลิวินาทีถึงค่าที่กำหนดแล้ว คือ: ", Milliseconds);
        setStatusButton("เริ่มใหม่");
        setCountTime(false);
      } else {
        setTimeout(() => {
          if (CountTime != false) {
            setProgressClock(ProgressClock + 1000);
            setMilliseconds(Milliseconds - 1000);
            setShowTime(Convert_Milliseconds(Milliseconds - 1000));
          }
        }, 1000);
      }
    }
  }, [CountTime, Milliseconds]);

  const [ShowDTP, setShowDTP] = React.useState(false);
  const EditTime = async (event, selectedDate) => {
    //ตกลง: set
    //ยกเลิก: dismissed
    if (event.type == "set") {
      const hours = parseInt(selectedDate.getHours()) * 3600000;
      const minute = parseInt(selectedDate.getMinutes()) * 60000;
      let milliseconds = hours + minute;
      // console.log(event.type);
      // console.log(`มิลลิวินาที: ${hours + minute}`);

      setMilliseconds(milliseconds);
      setShowTime(Convert_Milliseconds(milliseconds));
      setStartTime(milliseconds);
      setProgressClock(0);

      // console.log(
      //   selectedDate.getHours().toString() +
      //     "h" +
      //     selectedDate.getMinutes().toString() +
      //     "m"
      // );

      await axios
        .post("http://192.168.137.1:3000/Member_New_SunbathingTime", {
          Username: state.userName,
          SunbathingTime:
            selectedDate.getHours().toString() +
            "h" +
            selectedDate.getMinutes().toString() +
            "m",
        })
        .then(async (res) => {
          if (res.data.resError != undefined) {
            alert(res.data.resError);
          }

          // if (res.data.complete != undefined) {
          //   alert(res.data.complete);
          // }
        });
    } else {
      // setMilliseconds(milliseconds);
      setShowTime(Convert_Milliseconds(StartTime));
      // setProgressClock(0);
    }
    setCountTime(false);
    setShowDTP(false);
  };

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
        {/* <Button onPress={showTimepicker} title="Show time picker!" /> */}

        <Text style={{ marginBottom: "1%", fontSize: 20 }}>อาบแดด</Text>

        {StartTime != null ? (
          <Progress.Circle
            borderWidth={3}
            // unfilledColor={"black"}
            progress={ProgressClock / StartTime}
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
              onPress={async () => setShowDTP(true)}
            />

            {ShowDTP == true && CountTime == false ? (
              <DateTimePicker
                mode="time"
                value={new Date()}
                onChange={EditTime}
              />
            ) : null}
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
                <Text>{DetailShow.tempc}</Text>
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
                      <Text>{"> 40°C: อุณหภูมิสูงเกินไป"}</Text>
                    </MenuOption>

                    <MenuOption>
                      <Text>{"> 15°C: อุณหภูมิที่เหมาะสม"}</Text>
                    </MenuOption>

                    <MenuOption>
                      <Text>{"0-15°C: อุณหภูมิต่ำเกินไป"}</Text>
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
              {state.tempc != null ? (
                <Progress.Bar
                  style={{ width: "100%", height: "100%" }}
                  width={null}
                  height={20}
                  progress={state.tempc * 0.01}
                />
              ) : (
                <Progress.Bar progress={0} width={300} height={20} />
              )}

              <View style={{ position: "absolute", right: "2.5%" }}>
                {state.tempc != null ? (
                  <Text style={{ textAlign: "right", fontSize: 15 }}>
                    {state.tempc} °C
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
                      <Text>{"> 1000: เซนเซอร์ติดตั้งไม่ถูกต้อง"}</Text>
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
              {state.moisture != null ? (
                <Progress.Bar
                  style={{ width: "100%", height: "100%" }}
                  width={null}
                  height={20}
                  progress={state.moisture / 1024}
                />
              ) : (
                <Progress.Bar progress={0} width={300} height={20} />
              )}

              <View style={{ position: "absolute", right: "2.5%" }}>
                {state.moisture != null ? (
                  <Text style={{ textAlign: "right", fontSize: 15 }}>
                    {state.moisture} / 1024 Analog
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
                <Text>{DetailShow.humid}</Text>
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
                    <MenuOption>
                      <Text>
                        {"> 80% :ระดับความชื้นที่่เหมาะสำหรับต้นกล้า"}
                      </Text>
                    </MenuOption>
                    <MenuOption>
                      <Text>
                        {
                          "> 60% :ระดับความชื้นที่่เหมาะสมสำหรับเรือนกระจก เหมาะที่สุดสำหรับพืชเมืองร้อน"
                        }
                      </Text>
                    </MenuOption>
                    <MenuOption>
                      <Text>
                        {
                          "> 40% :ระดับความชื้นที่สมบูรณ์แบบสำหรับพืชส่วนใหญ่ที่จะเติบโต"
                        }
                      </Text>
                    </MenuOption>
                    <MenuOption>
                      <Text>
                        {"> 20% :ระดับความชื้นเฉลี่ยสำหรับพืชในร่มส่วนใหญ่"}
                      </Text>
                    </MenuOption>
                    <MenuOption>
                      <Text>
                        {"0-20% :อากาศจะแห้งเกินไปสำหรับพืชในร่มส่วนใหญ่"}
                      </Text>
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
              {state.humid != null ? (
                <Progress.Bar
                  style={{ width: "100%", height: "100%" }}
                  width={null}
                  height={20}
                  progress={state.humid / 100}
                />
              ) : (
                <Progress.Bar progress={0} width={300} height={20} />
              )}

              <View style={{ position: "absolute", right: "2.5%" }}>
                {state.humid != null ? (
                  <Text style={{ textAlign: "right", fontSize: 15 }}>
                    {state.humid} / 100 % RH
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
                if (StatusButton == "เริ่มใหม่") {
                  setProgressClock(0);
                  setShowTime(Convert_Milliseconds(StartTime));
                  setProgressClock(0);
                  setCountTime(false);
                  setStatusButton("เริ่มการทำงาน");
                } else {
                  setCountTime(true);
                  setStatusButton("...กำลังดำเนินการ");
                }
              }
            }}
          >
            {state.keyIOT != null ? (
              <>
                <Text style={styles.fontStyle}>{StatusButton}</Text>
              </>
            ) : (
              <>
                <Text style={styles.fontStyle}>คุณยังใส่รหัส KeyIOT</Text>
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
