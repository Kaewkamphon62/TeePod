import { StyleSheet, Text, View, Button, ScrollView } from "react-native";
import React, { useEffect } from "react";
import axios from "axios";

const SelectFlowerting = () => {
  const [Floweringlants, setFloweringlants] = React.useState([]);

  React.useEffect(() => {
    setFloweringlants([]);
    const getDB = async () => {
      await axios
        .post("http://192.168.137.1:3000/loadFloweringlants")
        .then(async (res) => {
          if (res.data.fp != undefined) {
            // console.log("res.data.fp", typeof res.data.fp);
            setFloweringlants(res.data.fp);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    };
    getDB();
  }, []);

  return (
    <ScrollView
      contentContainerStyle={{
        backgroundColor: "#D0F48E",
        flexGrow: 1,
        justifyContent: "center",
        flexDirection: "row",
      }}
    >
      <View style={styles.ContainerMain}>
        {Floweringlants.filter((a, key) => key % 2 == 0).map((data, key) => {
          return (
            <View key={key}>
              <Text style={styles.marginItems}>Picture</Text>
              <Button title={data.name_flowring_plants} />
            </View>
          );
        })}
      </View>

      <View style={styles.ContainerMain}>
        {Floweringlants.filter((a, key) => key % 2 == 1).map((data, key) => {
          return (
            <View key={key}>
              <Text style={styles.marginItems}>Picture</Text>
              <Button title={data.name_flowring_plants} />
            </View>
          );
        })}
      </View>
    </ScrollView>
  );
};

export default SelectFlowerting;

const styles = StyleSheet.create({
  marginItems: {
    marginVertical: "20%",
  },

  ContainerMain: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
