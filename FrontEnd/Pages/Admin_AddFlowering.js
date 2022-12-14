import * as React from "react";
import {
  StyleSheet,
  Button,
  View,
  Text,
  Pressable,
  TextInput,
  ScrollView,
} from "react-native";
import axios from "axios";

import { PrivateRoute_Context } from "../Routers/PrivateRoute";

const Admin_AddFlowering = () => {
  /////////////////////////////////////////////////////////////////
  const { state } = React.useContext(PrivateRoute_Context);
  /////////////////////////////////////////////////////////////////

  const [NewFlowering, setNewFlowering] = React.useState({
    name_science: "", //ชื่อวิทาศาสตร์
    clan: "", //วงศ์
    type: "", //ประเภท
    plant_stem: "", //ลำต้น
    leaf: "", //ใบ
    flowering: "", //การออกดอก
    fruitage: "", //การออกผล
    growth_rate: "", //การเจริญเติบโต
    soil: "", //ดิน
    sunlight: "", //แสงที่ต้องการ
    sunbathing_time: "", //แสงที่ต้องการ(เวลา)
    desired_water: "", //น้ำที่ต้องการ
    propagation: "", //การขยายพันธุ์
    other: "", //อื่นๆ
  });

  return (
    <ScrollView>
      <View
        style={{
          backgroundColor: "#D0F48E",
          flex: 1,
          // alignItems: "center",
          justifyContent: "center",
        }}
      >
        <View style={{ alignItems: "center" }}>
          <Text>{"\n"}</Text>
          <Text>{"\n"}</Text>
          <Text>{"\n"}</Text>

          <Button
            title="Function"
            onPress={() => console.log("Admin_AddFlowering Call")}
          />
          {/* <Button title="Logout" onPress={() => removeValue()} /> */}
        </View>

        <Text>{"\n"}</Text>

        <View style={{ paddingLeft: "15%" }}>
          <View style={styles.row}>
            <Text style={{ paddingLeft: "3%" }}>ชื่อวิทยาศาสตร์</Text>
            <TextInput
              style={styles.textinput}
              onChangeText={async (e) => {
                await setNewFlowering({
                  ...NewFlowering,
                  name_science: e,
                });
              }}
            />
          </View>

          <View style={styles.row}>
            <Text style={{ paddingLeft: "3%" }}>วงศ์</Text>
            <TextInput
              style={styles.textinput}
              onChangeText={async (e) => {
                await setNewFlowering({
                  ...NewFlowering,
                  clan: e,
                });
              }}
            />
          </View>

          <View style={styles.row}>
            <Text style={{ paddingLeft: "3%" }}>ประเภท</Text>
            <TextInput
              style={styles.textinput}
              onChangeText={async (e) => {
                await setNewFlowering({
                  ...NewFlowering,
                  type: e,
                });
              }}
            />
          </View>

          <View style={styles.row}>
            <Text style={{ paddingLeft: "3%" }}>ลำต้น</Text>
            <TextInput
              style={styles.textinput}
              onChangeText={async (e) => {
                await setNewFlowering({
                  ...NewFlowering,
                  plant_stem: e,
                });
              }}
            />
          </View>

          <View style={styles.row}>
            <Text style={{ paddingLeft: "3%" }}>ใบ</Text>
            <TextInput
              style={styles.textinput}
              onChangeText={async (e) => {
                await setNewFlowering({
                  ...NewFlowering,
                  leaf: e,
                });
              }}
            />
          </View>

          <View style={styles.row}>
            <Text style={{ paddingLeft: "3%" }}>ดอก</Text>
            <TextInput
              style={styles.textinput}
              onChangeText={async (e) => {
                await setNewFlowering({
                  ...NewFlowering,
                  flowering: e,
                });
              }}
            />
          </View>

          <View style={styles.row}>
            <Text style={{ paddingLeft: "3%" }}>ผล</Text>
            <TextInput
              style={styles.textinput}
              onChangeText={async (e) => {
                await setNewFlowering({
                  ...NewFlowering,
                  fruitage: e,
                });
              }}
            />
          </View>

          <View style={styles.row}>
            <Text style={{ paddingLeft: "3%" }}>อัตราการเจริญเติบโต</Text>
            <TextInput
              style={styles.textinput}
              onChangeText={async (e) => {
                await setNewFlowering({
                  ...NewFlowering,
                  growth_rate: e,
                });
              }}
            />
          </View>

          <View style={styles.row}>
            <Text style={{ paddingLeft: "3%" }}>ดิน</Text>
            <TextInput
              style={styles.textinput}
              onChangeText={async (e) => {
                await setNewFlowering({
                  ...NewFlowering,
                  soil: e,
                });
              }}
            />
          </View>

          <View style={styles.row}>
            <Text style={{ paddingLeft: "3%" }}>แสงแดด</Text>
            <TextInput
              style={styles.textinput}
              onChangeText={async (e) => {
                await setNewFlowering({
                  ...NewFlowering,
                  sunlight: e,
                });
              }}
            />
          </View>

          <View style={styles.row}>
            <Text style={{ paddingLeft: "3%" }}>เวลาอาบแดด</Text>
            <TextInput
              style={styles.textinput}
              onChangeText={async (e) => {
                await setNewFlowering({
                  ...NewFlowering,
                  sunbathing_time: e
                });
              }}
            />
          </View>

          <View style={styles.row}>
            <Text style={{ paddingLeft: "3%" }}>น้ำ</Text>
            <TextInput
              style={styles.textinput}
              onChangeText={async (e) => {
                await setNewFlowering({
                  ...NewFlowering,
                  desired_water: e,
                });
              }}
            />
          </View>

          <View style={styles.row}>
            <Text style={{ paddingLeft: "3%" }}>ขยายพันธุ์</Text>
            <TextInput
              style={styles.textinput}
              onChangeText={async (e) => {
                await setNewFlowering({
                  ...NewFlowering,
                  propagation: e,
                });
              }}
            />
          </View>

          <View style={styles.row}>
            <Text style={{ paddingLeft: "3%" }}>การใช้งานและอื่นๆ</Text>
            <TextInput
              style={styles.textinput}
              onChangeText={async (e) => {
                await setNewFlowering({
                  ...NewFlowering,
                  other: e,
                });
              }}
            />
          </View>
        </View>

        <Text>{"\n"}</Text>

        <View style={{ alignItems: "center" }}>
          <Button
            title="Add New Flower"
            onPress={
              async () => {
                await axios
                .post("http://192.168.137.1:3000/NewFlowering", {NewFlowering, Role: state.userRole})
                .then(async (res) => {

                })
              }
            }
          />
        </View>

        <Text>{"\n"}</Text>
        <Text>{"\n"}</Text>
      </View>
    </ScrollView>
  );
};

export default Admin_AddFlowering;

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
    flexDirection: "column",
  },

  textinput: {
    backgroundColor: "white",
    height: 35,
    width: "80%",
    margin: 8,
    borderWidth: 1,
    padding: 10,
  },
});
