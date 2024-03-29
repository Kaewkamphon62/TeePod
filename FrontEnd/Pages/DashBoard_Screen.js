import { StyleSheet, View, Pressable, Text, Button } from "react-native";
import React from "react";
import * as Progress from "react-native-progress";
import { PrivateRoute_Context } from "../Routers/PrivateRoute";
import axios from "axios";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import Paho from "paho-mqtt";
import { ClientFoRMessage } from "paho-mqtt";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { MenuProvider } from "react-native-popup-menu";
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from "react-native-popup-menu";
import DateTimePicker from "@react-native-community/datetimepicker";

import * as Notifications from "expo-notifications"; //การแจ้งเตือน
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

async function schedulePushNotification(e) {
  const second = parseInt(e) / 1000;

  await Notifications.scheduleNotificationAsync({
    content: {
      title: "TeePoT!",
      body: "การทำงานเสร็จสิ้น",
      data: { data: "goes here" },
    },
    trigger: { seconds: second },
  });
}

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
  const [Moisture, setMoisture] = React.useState(0);

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

        if (state.moisture > 100) {
          IF_moisture = "เซนเซอร์ติดตั้งไม่ถูกต้อง";
          setMoisture(0);
        } else if (state.moisture >= 80) {
          IF_moisture = "ดินแห้ง";
          setMoisture(state.moisture);
        } else if (state.moisture >= 30) {
          IF_moisture = "ดินชื้น";
          setMoisture(state.moisture);
        } else if (state.moisture < 30) {
          IF_moisture = "ดินเปียก";
          setMoisture(state.moisture);
        }

        //ความชื้นในอากาศ
        // console.log("state.humid: ", state.humid);
        let IF_humid = "";

        if (state.humid > 80) {
          IF_humid = "เหมาะสำหรับต้นกล้า";
        } else if (state.humid > 60) {
          IF_humid = "เหมาะสำหรับพืชเมืองร้อน";
        } else if (state.humid > 40) {
          IF_humid = "เหมาะสำหรับพืชส่วนใหญ่";
        } else if (state.humid > 20) {
          IF_humid = "ค่าเฉลี่ยสำหรับพืชในร่ม";
        } else if (state.humid <= 20) {
          IF_humid = "แห้งเกินไปสำหรับพืชในร่ม";
        }

        setDetailShow({
          tempc: IF_tempc,
          moisture: IF_moisture,
          humid: IF_humid,
        });
      } else {
        await otherFunction.getMemberData({ username: state.userName }); //โหลดเมื่อเข้าแอพใหม่
      }

      // setCountTime(false);
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

  // console.log(new Date().getMilliseconds())
  //////////////////////////////////////////////////////////////////////////////// Time

  const [StartTime, setStartTime] = React.useState(null);
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

  const Convert_DateNoW_To_Milliseconds = (e) => {
    var hours = new Date(e).getHours() * 3600000;
    var minutes = new Date(e).getMinutes() * 60000;
    var seconds = new Date(e).getSeconds() * 1000;

    let value = hours + minutes + seconds;

    return value;
  };

  React.useEffect(() => {
    (async () => {
      const ProcessClock = await AsyncStorage.getItem("@ProcessClock");
      const ProC_toArray = JSON.parse(ProcessClock);
      // console.log("ProC_toArray", ProC_toArray);

      // console.log("sunbathing_time: ", state.sunbathing_time);
      if (ProcessClock != null) {
        const Current_Milliseconds = Convert_DateNoW_To_Milliseconds(
          Date.now()
        ); //เวลาปัจจุบัน
        const Past_Milliseconds = Convert_DateNoW_To_Milliseconds(
          ProC_toArray.DateNow
        ); //เวลาในอดีต

        setStartTime(ProC_toArray.Milliseconds);
        setProgressClock(Current_Milliseconds - Past_Milliseconds);

        let Value_Time = 0;
        if (Current_Milliseconds - Past_Milliseconds <= 0) {
          Value_Time = 0;
        } else {
          Value_Time =
            ProC_toArray.Milliseconds -
            (Current_Milliseconds - Past_Milliseconds);
        }

        setMilliseconds(Value_Time);
        setShowTime(Convert_Milliseconds(Value_Time));
        // setCountTime(true);
      } else {
        setStartTime(state.sunbathing_time);
        setMilliseconds(state.sunbathing_time);
        setShowTime(Convert_Milliseconds(state.sunbathing_time));
      }
    })();
  }, [state.sunbathing_time]);

  React.useEffect(() => {
    (async () => {
      if (ShowTime == null && Milliseconds != null) {
        setShowTime(Convert_Milliseconds(Milliseconds));
      }

      if (CountTime == true) {
        if (Milliseconds == 0) {
          //การแจ้งเตือน
          //การกำหนดการทำงานให้หยุด
          //หยุดที่ 50 วินาที

          console.log("เวลามิลลิวินาทีถึงค่าที่กำหนดแล้ว คือ: ", Milliseconds);
          await AsyncStorage.removeItem("@ProcessClock");

          // setStatusButton("...กำลังเดินหาร่ม");

          console.log("stop");
          setStatusButton("เริ่มใหม่");
          setCountTime(false);

          // setStopIOT_Start(true); //สั่งให้ IOT นับเวลาการเดินหาร่มโดยการกำหนดแบบ hardcode
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
    })();
  }, [CountTime, Milliseconds]);

  // const [StopIOT_Start, setStopIOT_Start] = React.useState(false);
  // const [StopIOT_Seconds, setStopIOT_Seconds] = React.useState(10000);
  // React.useEffect(() => {
  //   async () => {
  //     if (StopIOT_Start == true) {
  //       if (StopIOT_Seconds == 0) {
  //         setStatusButton("เริ่มใหม่");
  //       } else {
  //         setTimeout(() => {
  //           if (StopIOT_Seconds != false) {
  //             setStopIOT_Seconds(StopIOT_Seconds - 1000);
  //           }
  //         }, 1000);
  //       }
  //     }
  //     console.log("StopIOT_Seconds", StopIOT_Seconds);
  //   };
  // }, [StopIOT_Start, StopIOT_Seconds]);

  const [ShowDTP, setShowDTP] = React.useState(false);
  const EditTime = async (event, selectedDate) => {
    //ตกลง: set
    //ยกเลิก: dismissed
    console.log("event.type", event.type);

    if (event.type == "set") {
      let hours = parseInt(selectedDate.getHours()) * 3600000;
      let minute = parseInt(selectedDate.getMinutes()) * 60000;
      let milliseconds = hours + minute;
      // console.log(event.type);
      // console.log(`มิลลิวินาที: ${hours + minute}`);

      setMilliseconds(milliseconds);
      setStartTime(milliseconds);
      setProgressClock(0);
      setShowTime(Convert_Milliseconds(milliseconds));

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
          setCountTime(false);
          setShowDTP(false);
          await AsyncStorage.removeItem("@ProcessClock");
        });
    } else if (event.type == "dismissed") {
      setShowDTP(false);
    }
  };

  ////////////////////////////////////     MQTT     ///////////////////////////////////////

  const [ConnectedMosquitto, setConnectedMosquitto] = React.useState("OffLine");

  const client = new Paho.Client(
    "test.mosquitto.org",
    Number(8080),
    "clientId_" + parseInt(Math.random() * 100, 10)
  );

  client.onConnectionLost = onConnectionLost;
  client.connect({ onSuccess: onConnect });
  client.onMessageArrived = onMessageArrived;

  function onConnect() {
    console.log("onConnect");
    setConnectedMosquitto("Online");
    client.subscribe(state.keyIOT); //ชื่อ TEST01
    client.subscribe("TESTKEY@@");
  }

  // function onConnectionLost(responseObject) {
  //   if (responseObject.errorCode !== 0) {
  //     console.log("onConnectionLost:" + responseObject.errorMessage);
  //   }
  // }

  function onConnectionLost(responseObject) {
    // console.log('Connection lost: ', responseObject);
    if (responseObject.errorCode !== 0) {
      console.log("Attempting to reconnect in 3 seconds");
      setTimeout(() => {
        client.connect({
          onSuccess: () => {
            console.log("Reconnected");
          },
          onFailure: (e) => {
            console.log("Reconnection failed: ", e);
          },
        });
      }, 3000);
    }
  }

  const [StatusBoard, setStatusBoard] = React.useState(null);
  async function onMessageArrived(message) {
    // console.log("onMessageArrived:" + message.payloadString);

    let Message = message.payloadString;
    if (Message != StatusBoard) {
      console.log("StatusBoard_Message: ", Message);
      await setStatusBoard(message.payloadString);
    }
  }


  const [time, setTime] = React.useState(0);
  React.useEffect(() => {
    const timeout = setTimeout(() => {
      setTime((time) => time + 5);
      // console.log(time);

      otherFunction.getMemberData({ username: state.userName }); //โหลดเมื่อเข้าแอพใหม่
    }, 20000);

    return () => clearTimeout(timeout);
  }, [time]);


  React.useEffect(() => {
    (async () => {
      console.log("OUT_UseEffect", StatusBoard);

      if (StatusBoard != null) {
        let StatusString = String(StatusBoard);
        console.log("IN_UseEffect", StatusString);

        if (StatusString.substring(0, 1) == "1,") {
          console.log("StatusString.substring(0, 1): Ture");
        }

        if (StatusString == "function1") {
          console.log("f1");
          console.log("เริ่มเดินเวลาอาบแดด");

          const ProC_obj = {
            Milliseconds: Milliseconds,
            DateNow: Date.now(),
          };
          AsyncStorage.setItem("@ProcessClock", JSON.stringify(ProC_obj));
          await schedulePushNotification(StartTime);
          setStatusButton("...กำลังดำเนินการ");

          setCountTime(true);
        } else if (StatusString == "function2") {
          console.log("f2");

          StopIOT();
          setStatusButton("...กำลังเดินหาร่ม");
        }
        // else if (StatusString == "stop"){
        //   console.log("stop");
        //   setStatusButton("เริ่มใหม่");
        //   setCountTime(false);
        // }
      }
    })();
  }, [StatusBoard]);

  const StartIOT = () => {
    //เดินหาแดด
    let Seconsd = Milliseconds / 1000;
    try {
      let message = new Paho.Message("1," + Seconsd);

      message.destinationName = state.keyIOT;
      console.log("message: ", JSON.stringify(message, null, 2));
      // console.log("type: ", typeof message);

      client.send(message);
    } catch (error) {
      console.log("error", error);
    }
  };

  const StopIOT = () => {
    //function2
    //เดินหาร่ม
    // let Second = StopIOT_Seconds / 1000; //เดินหาร่ม 10 วิ
    let Second = 1000;
    try {
      const message = new Paho.Message("2," + Second); //ต้องกำหนดเวลาให้มาก มาก

      message.destinationName = state.keyIOT;
      client.send(message);
    } catch (error) {
      console.log("error", error);
    }
  };

  ///-----------------------------------------------------------------------------------///

  /////////////////////////////////////////////////////////////////////////////////////////

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
              onPress={async () => {
                if (CountTime == false) {
                  setShowDTP(true);
                }
              }}
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
                อุณหภูมิในอากาศ
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
                  style={{ width: "100%", height: "100%"}}
                  width={null}
                  height={20}
                  color="orange"
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
                ความแห้งในดิน
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
                  <MenuOptions style={{ width: "3200%" }}>
                    <MenuOption>
                      <Text>{"> 100%: เซนเซอร์ติดตั้งไม่ถูกต้อง"}</Text>
                    </MenuOption>

                    <MenuOption>
                      <Text>80%-100%: ดินแห้ง</Text>
                    </MenuOption>

                    <MenuOption>
                      <Text>30%-80%: ดินชื้น</Text>
                    </MenuOption>

                    <MenuOption>
                      <Text>{"< 30%: ดินเปียก"}</Text>
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
                  color="brown"
                  progress={Moisture / 100}
                />
              ) : (
                <Progress.Bar progress={0} width={300} height={20} />
              )}

              <View style={{ position: "absolute", right: "2.5%" }}>
                {state.moisture != null ? (
                  <Text style={{ textAlign: "right", fontSize: 15 }}>
                    {Moisture}% / 100%
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
                  color=""
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
            alignItems: "center",
          }}
        >
          <Text>สถานะการเชื่อมต่อ: {ConnectedMosquitto}</Text>
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
                  //นับเสร็จ
                  setProgressClock(0);
                  setMilliseconds(StartTime);
                  setShowTime(Convert_Milliseconds(StartTime));
                  setCountTime(false);
                  setStatusButton("เริ่มการทำงาน");
                } else {
                  //เริ่มนับถอยหลัง

                  if (ConnectedMosquitto == "OffLine") {
                    alert("การเชื่อมต่อขาดหายไม่สามารถเริ่มการทำงานได้");
                  } else {
                    // const SB = StatusBoard
                    await StartIOT();
                    // console.log("StatusBoard", StatusBoard);

                    // if (StatusBoard != null) {
                    //   if (StatusBoard.substring(0, 3) == "1,") {
                    //     const ProC_obj = {
                    //       Milliseconds: Milliseconds,
                    //       DateNow: Date.now(),
                    //     };
                    //     AsyncStorage.setItem(
                    //       "@ProcessClock",
                    //       JSON.stringify(ProC_obj)
                    //     );
                    //     await schedulePushNotification(StartTime);
                    //     setStatusButton("...กำลังดำเนินการ");

                    //     setCountTime(true);
                    //   }
                    // }
                  }
                }
              }
              // console.log('Milliseconds: ', Milliseconds/1000)
              // console.log(client);
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
