import { StyleSheet, Text, View, Button } from "react-native";
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
    <View
      style={{
        backgroundColor: "#D0F48E",
        flex: 1,
        // justifyContent: "space-evenly",
        justifyContent: "center",
      }}
    >
      <View style={styles.row}>
        {Floweringlants.map((data, key) => {
          return (
            <View
              key={key}
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text style={{ marginBottom: 20 }}>Picture</Text>
              <Button title={data.name_science} />
            </View>
          );
        })}
      </View>
    </View>
  );
};

export default SelectFlowerting;

const styles = StyleSheet.create({
  row: {
    flex: 1,
    flexDirection: "row",
    paddingLeft: "4%",
    // marginHorizontal: 10,
  },
});
