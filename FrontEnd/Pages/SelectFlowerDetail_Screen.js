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
            alignItems: "center",
            flexDirection: "row",
          }}
        ></View>
      </View>

      <View
        style={{
          // backgroundColor: "red",
          alignItems: "center",
          flexDirection: "row",
          // justifyContent: "flex-end",
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
