import { StyleSheet, Text, View, Button } from "react-native";
import React from "react";

const SelectFlowerDetail_Screen = ({ route, navigation: { goBack } }) => {

  const { FlowringPlants } = route.params; //รับค่าชื่อตัวแปรจากหน้าที่ส่งเข้ามา
  // console.log(JSON.stringify(FlowringPlants, null, 2));

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >

      
      <Button onPress={() => goBack()} title="Go back from ProfileScreen" />
    </View>
  );
};

export default SelectFlowerDetail_Screen;

const styles = StyleSheet.create({});
