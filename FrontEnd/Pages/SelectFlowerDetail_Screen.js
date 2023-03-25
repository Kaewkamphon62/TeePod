import {
  StyleSheet,
  Text,
  View,
  Pressable,
  ScrollView,
  Image,
} from "react-native";
import React, { useEffect } from "react";
import { PrivateRoute_Context } from "../Routers/PrivateRoute";
import axios from "axios";

const SelectFlowerDetail_Screen = ({
  route,
  navigation: { goBack, navigate },
}) => {
  /////////////////////////////////////////////////////////////////
  const { state, otherFunction } = React.useContext(PrivateRoute_Context);
  /////////////////////////////////////////////////////////////////

  const { FlowringPlants } = route.params; //รับค่าชื่อตัวแปรจากหน้าที่ส่งเข้ามา
  // console.log(JSON.stringify(FlowringPlants, null, 2));

  const FunctionSelectFP = async (a) => {
    // console.log(JSON.stringify(a, null, 2));

    await axios
      .post("http://192.168.137.1:3000/SelectFloweringPlants", {
        UserUsername: state.userName,
        name_flowring_plants: FlowringPlants.name_flowring_plants,
        sunbathing_time: FlowringPlants.sunbathing_time,
      })
      .then(async (res) => {
        if (res.data.alert != undefined) {
          // alert(res.data.alert);
          
          await otherFunction.getMemberData({
            username: state.userName,
          });
          await navigate("Member_Profile");
        }
      });
  };

  return (
    <ScrollView
      contentContainerStyle={{
        // backgroundColor: "#D0F48E",
        flexGrow: 1,
        // justifyContent: "center",
      }}
    >
      <View
        style={{
          // backgroundColor: "green",
          alignItems: "center",
        }}
      >
        <Image
          style={styles.images}
          source={{
            uri: `data:image/png;base64,${FlowringPlants.img_base64}`,
          }}
        />

        <View
          style={{
            marginTop: "5%",
            marginHorizontal: "5%",
            alignItems: "center",
            flexDirection: "row",
          }}
        >
          <Text style={{ flex: 1, fontSize: 16, fontWeight: "600" }}>
            ประเภท:{" "}
          </Text>
          <Text style={{ flex: 2, fontSize: 16 }}>{FlowringPlants.type}</Text>
        </View>

        <View
          style={{
            marginTop: "5%",
            marginHorizontal: "5%",
            alignItems: "center",
            flexDirection: "row",
          }}
        >
          <Text style={{ flex: 1, fontSize: 16, fontWeight: "600" }}>
            ลำต้น:{" "}
          </Text>
          <Text style={{ flex: 2, fontSize: 16 }}>
            {FlowringPlants.plant_stem}
          </Text>
        </View>

        <View
          style={{
            marginTop: "5%",
            marginHorizontal: "5%",
            alignItems: "center",
            flexDirection: "row",
          }}
        >
          <Text style={{ flex: 1, fontSize: 16, fontWeight: "600" }}>ใบ: </Text>
          <Text style={{ flex: 2, fontSize: 16 }}>{FlowringPlants.leaf}</Text>
        </View>

        <View
          style={{
            marginTop: "5%",
            marginHorizontal: "5%",
            alignItems: "center",
            flexDirection: "row",
          }}
        >
          <Text style={{ flex: 1, fontSize: 16, fontWeight: "600" }}>
            ดอก:{" "}
          </Text>
          <Text style={{ flex: 2, fontSize: 16 }}>
            {FlowringPlants.flowering}
          </Text>
        </View>

        {FlowringPlants.fruitage != "" ? (
          <View
            style={{
              marginTop: "5%",
              marginHorizontal: "5%",
              alignItems: "center",
              flexDirection: "row",
            }}
          >
            <Text style={{ flex: 1, fontSize: 16, fontWeight: "600" }}>
              ผล:{" "}
            </Text>
            <Text style={{ flex: 2, fontSize: 16 }}>
              {FlowringPlants.fruitage}
            </Text>
          </View>
        ) : null}

        <View
          style={{
            marginTop: "5%",
            marginHorizontal: "5%",
            alignItems: "center",
            flexDirection: "row",
          }}
        >
          <Text style={{ flex: 1, fontSize: 16, fontWeight: "600" }}>
            เติบโต:{" "}
          </Text>
          <Text style={{ flex: 2, fontSize: 16 }}>
            {FlowringPlants.growth_rate}
          </Text>
        </View>

        <View
          style={{
            marginTop: "5%",
            marginHorizontal: "5%",
            alignItems: "center",
            flexDirection: "row",
          }}
        >
          <Text style={{ flex: 1, fontSize: 16, fontWeight: "600" }}>
            ดิน:{" "}
          </Text>
          <Text style={{ flex: 2, fontSize: 16 }}>{FlowringPlants.soil}</Text>
        </View>

        <View
          style={{
            marginTop: "5%",
            marginHorizontal: "5%",
            alignItems: "center",
            flexDirection: "row",
          }}
        >
          <Text style={{ flex: 1, fontSize: 16, fontWeight: "600" }}>
            แสงแดด:{" "}
          </Text>
          <Text style={{ flex: 2, fontSize: 16 }}>
            {FlowringPlants.sunlight}
          </Text>
        </View>

        <View
          style={{
            marginTop: "5%",
            marginHorizontal: "5%",
            alignItems: "center",
            flexDirection: "row",
          }}
        >
          <Text style={{ flex: 1, fontSize: 16, fontWeight: "600" }}>
            น้ำ:{" "}
          </Text>
          <Text style={{ flex: 2, fontSize: 16 }}>
            {FlowringPlants.desired_water}
          </Text>
        </View>

        <View
          style={{
            marginTop: "5%",
            marginHorizontal: "5%",
            alignItems: "center",
            flexDirection: "row",
          }}
        >
          <Text style={{ flex: 1, fontSize: 16, fontWeight: "600" }}>
            ขยายพันธุ์:{" "}
          </Text>
          <Text style={{ flex: 2, fontSize: 16 }}>
            {FlowringPlants.propagation}
          </Text>
        </View>

        <View
          style={{
            marginTop: "5%",
            marginHorizontal: "5%",
            alignItems: "center",
            flexDirection: "row",
          }}
        >
          <Text style={{ flex: 1, fontSize: 16, fontWeight: "600" }}>
            อื่นๆ:{" "}
          </Text>
          <Text style={{ flex: 2, fontSize: 16 }}>{FlowringPlants.other}</Text>
        </View>

        <View
          style={{
            marginTop: "5%",
            marginHorizontal: "5%",
            alignItems: "center",
            flexDirection: "row",
          }}
        >
          <Text style={{ flex: 1, fontSize: 16, fontWeight: "600" }}>
            เกร็ดน่ารู้:{" "}
          </Text>
          <Text style={{ flex: 2, fontSize: 16 }}>{FlowringPlants.tip}</Text>
        </View>
      </View>

      <View
        style={{
          marginTop: "5%",
          marginBottom: "5%",
          flexDirection: "row",
        }}
      >
        <Pressable
          style={[
            styles.buttonSelect,
            {
              backgroundColor: "#6495ED",
            },
          ]}
          onPress={async () => {
            FunctionSelectFP();
          }}
        >
          <Text style={styles.fontStyle}>เลือก</Text>
        </Pressable>

        <Pressable
          style={[
            styles.buttonSelect,
            {
              backgroundColor: "red",
            },
          ]}
          onPress={async () => {
            goBack();
          }}
        >
          <Text style={styles.fontStyle}>ยกเลิก</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
};

export default SelectFlowerDetail_Screen;

const styles = StyleSheet.create({
  images: {
    marginTop: "10%",
    width: 250,
    height: 250,
    borderStyle: "solid",
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 7,
  },

  buttonSelect: {
    justifyContent: "center",
    height: "30%",
    // width: "100%",
    borderWidth: 1,
    // borderRadius: 10,
    backgroundColor: "Aqua",
    flex: 1,
  },

  fontStyle: {
    textAlign: "center",
    fontSize: 20,
  },
});
