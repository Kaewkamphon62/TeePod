import { StyleSheet, View, Pressable, Text } from "react-native";
import React from "react";
import * as Progress from "react-native-progress";
import { PrivateRoute_Context } from "../Routers/PrivateRoute";
import { CountdownCircleTimer } from "react-native-countdown-circle-timer";

const DashBoard_Screen = () => {
  /////////////////////////////////////////////////////////////////
  const { authSign, otherFunction, state } =
    React.useContext(PrivateRoute_Context);
  /////////////////////////////////////////////////////////////////

  React.useEffect(() => {
    (async () => {
      // clearTimer(getDeadTime());
      await otherFunction.getMemberData({ username: state.userName });
    })();
  }, []);

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
              <Text style={{ marginBottom: "2%", flex: 1, textAlign: "right" }}>
                0°C
              </Text>
            </View>
            <Progress.Bar progress={0.3} width={300} height={15} />
          </View>

          <View style={{ marginBottom: "3%" }}>
            <View style={{ flexDirection: "row" }}>
              <Text style={{ marginBottom: "2%", flex: 1, textAlign: "left" }}>
                ความชื้นในดิน
              </Text>
              <Text style={{ marginBottom: "2%", flex: 1, textAlign: "right" }}>
                0°C
              </Text>
            </View>

            <Progress.Bar progress={0.3} width={300} height={15} />
          </View>

          <View style={{ marginBottom: "3%" }}>
            <View style={{ flexDirection: "row" }}>
              <Text style={{ marginBottom: "2%", flex: 1, textAlign: "left" }}>
                ความชื้นในอากาศ
              </Text>
              <Text style={{ marginBottom: "2%", flex: 1, textAlign: "right" }}>
                0°C
              </Text>
            </View>

            <Progress.Bar progress={0.3} width={300} height={15} />
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
                <Text style={styles.fontStyle}>คุณยังไม่ได้ลงทะเบียน KeyIOT</Text>
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
