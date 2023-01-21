import * as React from "react";
import {
  StyleSheet,
  Button,
  View,
  Text,
  TextInput,
  Pressable,
} from "react-native";
import { PrivateRoute_Context } from "../Routers/PrivateRoute";
import axios from "axios";

const DashBoard_Screen = ({ navigation }) => {
  /////////////////////////////////////////////////////////////////
  const { authSign, otherFunction, state } =
    React.useContext(PrivateRoute_Context);
  /////////////////////////////////////////////////////////////////

  const [InputKey, setInputKey] = React.useState(null);
  const [Key, setKey] = React.useState({
    tempc: null,
    humid: null,
    moisture: null,
  });

  const [Milliseconds, setMilliseconds] = React.useState(null);
  const [ShowTime, setShowTime] = React.useState(null);
  const [CountTime, setCountTime] = React.useState(false);

  React.useEffect(() => {
    (async () => {
      // clearTimer(getDeadTime());
      await otherFunction.getMemberData({ username: state.userName });
    })();
  }, []);

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
      if (Milliseconds == 59000) {
        console.log("เวลามิลลิวินาทีถึงค่าที่กำหนดแล้ว คือ: ", Milliseconds);
      } else {
        setTimeout(() => {
          setMilliseconds(Milliseconds - 1000);
          setShowTime(Convert_Milliseconds(Milliseconds - 1000));
        }, 1000);
      }
    }
  }, [CountTime, Milliseconds]);

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

  // const Convert_Milliseconds = () => {
  //   if (state.sunbathing_time != null) {
  //   //   var hours = Math.floor((mls % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  //   //   var minutes = Math.floor((mls % (1000 * 60 * 60)) / (1000 * 60));
  //   //   var seconds = Math.floor((mls % (1000 * 60)) / 1000);

  //   //   if (hours < 10) {
  //   //     hours = String("0" + hours);
  //   //   }
  //   //   if (minutes < 10) {
  //   //     minutes = String("0" + minutes);
  //   //   }
  //   //   if (seconds < 10) {
  //   //     seconds = String("0" + seconds);
  //   //   }
  //   //   return hours + ":" + minutes + ":" + seconds;
  //   }
  // };

  return (
    <View
      style={{
        backgroundColor: "#D0F48E",
        flex: 1,
        // alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* <Text style={{ textAlign: "center" }}>
        {"\n"} Home Screen {"\n"}
      </Text> */}

      <View style={styles.row}>
        <Text style={{ color: "black" }}>InputKey</Text>
        <TextInput
          style={{
            backgroundColor: "white",
            height: 35,
            width: "50%",
            margin: 8,
            borderWidth: 1,
            padding: 10,
          }}
          onChangeText={async (e) => {
            await setInputKey(e);
          }}
        />

        <Button
          title="SubmitKey"
          onPress={async () => {
            if (InputKey != null) {
              await axios
                .post("http://192.168.137.1:3000/getDB_IOT", { InputKey })
                .then(async (res) => {
                  if (res.data.Key != undefined) {
                    await setKey({
                      tempc: res.data.Key.tempc,
                      humid: res.data.Key.humid,
                      moisture: res.data.Key.moisture,
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
              alert("กรุณากรอกข้อมูลให้ถูกต้อง");
            }
          }}
        />
      </View>

      {/* <View style={{ flexDirection: "row" }}>
        <View style={{ flex: 1 }}>
          <Button title="Button 1" />
        </View>
        <View style={{ flex: 1 }}>
          <Button title="Button 2" />
        </View>
      </View> */}

      <View style={{ flexDirection: "row", paddingLeft: "4%" }}>
        <View style={{ flex: 1 }}>
          <Text>สถานะ:</Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text>TextTest</Text>
        </View>
      </View>

      <View style={{ flexDirection: "row", paddingLeft: "4%" }}>
        <View style={{ flex: 1 }}>
          <Text>แบตเตอร์รี่:</Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text>TextTest</Text>
        </View>
      </View>

      <View style={{ flexDirection: "row", paddingLeft: "4%" }}>
        <View style={{ flex: 1 }}>
          <Text>อุณหภูมิ:</Text>
        </View>
        <View style={{ flex: 1 }}>
          {Key.tempc != undefined ? (
            <>
              <Text>{Key.tempc}</Text>
            </>
          ) : (
            <>
              <Text></Text>
            </>
          )}
        </View>
      </View>

      <View style={{ flexDirection: "row", paddingLeft: "4%" }}>
        <View style={{ flex: 1 }}>
          <Text>ความชื้นในดิน:</Text>
        </View>
        <View style={{ flex: 1 }}>
          {Key.humid != undefined ? (
            <>
              <Text>{Key.humid}</Text>
            </>
          ) : null}
        </View>
      </View>

      <View style={{ flexDirection: "row", paddingLeft: "4%" }}>
        <View style={{ flex: 1 }}>
          <Text>ความชื้นในอากาศ:</Text>
        </View>
        <View style={{ flex: 1 }}>
          {Key.moisture != null ? (
            <>
              <Text>{Key.moisture}</Text>
            </>
          ) : null}
        </View>
      </View>

      <View style={{ flexDirection: "row", paddingLeft: "4%" }}>
        <View style={{ flex: 1 }}>
          <Text>วันนี้อาบแดดไปแล้ว:</Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text>TextTest</Text>
        </View>
      </View>

      <Text>{"\n"}</Text>
      <Text>{"\n"}</Text>

      <View style={{ flexDirection: "row", paddingLeft: "4%" }}>
        <View
          style={{ flex: 2, alignItems: "center", justifyContent: "center" }}
        >
          {/* {state.sunbathing_time != null ? (
            <>
              <Text>{state.sunbathing_time}</Text>
            </>
          ) : null} */}

          {Milliseconds != null ? (
            <View>
              <Text style={{ fontSize: 30 }}>{ShowTime}</Text>
              {/* <Text style={{ fontSize: 30 }}>{Milliseconds}</Text> */}
            </View>
          ) : null}
        </View>
        <View style={{ flex: 1, paddingRight: "4%", justifyContent: "center" }}>
          <Button
            title="เริ่ม/หยุด"
            onPress={async () => {
              if (CountTime == true) {
                setCountTime(false);
              } else {
                setCountTime(true);
              }

              // setCounter(60);
            }}
          />
        </View>
      </View>

      <Text>{"\n"}</Text>

      <View style={{ flexDirection: "row", paddingLeft: "4%" }}>
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <Text>ชื่อพืช:</Text>
        </View>
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          {state.name_fp != null ? (
            <>
              <Text>{state.name_fp}</Text>
            </>
          ) : null}
        </View>
        <View style={{ flex: 1, paddingRight: "4%" }}>
          <Button
            title="เปลี่ยนพืช"
            onPress={() => navigation.navigate("Member_SelectFlowerting")}
          />
        </View>
      </View>

      <Text>{"\n"}</Text>
      <Text>{"\n"}</Text>

      {/* <Button title="Logout" onPress={() => removeValue()} /> */}

      {/* <Text style={{ textAlign: "center" }}>
        <Pressable
          style={styles.button}
          onPress={async () => await authSign.signOut()}
        >
          <Text style={{ color: "white" }}>Logout</Text>
        </Pressable>
      </Text> */}
    </View>
  );
};

export default DashBoard_Screen;

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 2,
    elevation: 3,
    backgroundColor: "#2196f3",

    // paddingVertical: 8,
    // paddingHorizontal: 10,
    height: 40,
    width: 100,
  },

  row: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: "1rem",
  },
});
