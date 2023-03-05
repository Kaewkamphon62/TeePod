import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Button,
  ScrollView,
} from "react-native";
import React from "react";
import axios from "axios";
import { PrivateRoute_Context } from "../Routers/PrivateRoute";
import { Image } from "react-native";

const SelectFlowerting = ({ navigation }) => {
  /////////////////////////////////////////////////////////////////
  const { state, otherFunction } = React.useContext(PrivateRoute_Context);
  /////////////////////////////////////////////////////////////////

  const [FloweringPlants, setFloweringPlants] = React.useState([]);
  const [Username, setUsername] = React.useState(null);
  // const [TestImg, setTestImg] = React.useState(null);

  React.useEffect(() => {
    setFloweringPlants([]);
    setUsername(null);

    const username = state.userName;
    const getDB = async () => {
      await axios
        .post("http://192.168.137.1:3000/loadFloweringPlants")
        .then(async (res) => {
          if (res.data.fp != undefined) {
            // console.log("res.data.fp", typeof res.data.fp);
            setFloweringPlants(res.data.fp);
            setUsername(username);

            // setTestImg(res.data.fp[4]);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    };
    getDB();
  }, []);

  // if (TestImg != null) {
  //   // console.log("");
  //   console.log(TestImg.img_file);
  // }

  const FunctionSelectFP = async (a) => {
    // console.log(JSON.stringify(a, null, 2));

    await axios
      .post("http://192.168.137.1:3000/SelectFloweringPlants", {
        UserUsername: Username,
        name_flowring_plants: a.name_flowring_plants,
        sunbathing_time: a.sunbathing_time,
      })
      .then(async (res) => {
        if (res.data.alert != undefined) {
          // alert(res.data.alert);

          await otherFunction.getMemberData({
            username: state.userName,
          });

          await navigation.navigate("Member_Profile");
        }
      });
  };

  return (
    <ScrollView
      contentContainerStyle={{
        // backgroundColor: "#D0F48E",
        backgroundColor: "#ebecf1",
        flexGrow: 1,
        justifyContent: "center",
        flexDirection: "row",
      }}
    >
      <View style={styles.ContainerMain}>
        {FloweringPlants.filter((a, key) => key % 2 == 0).map((data, key) => {
          return (
            <View style={{ alignItems: "center" }} key={key}>
              <Image
                style={styles.images}
                source={{
                  uri: `data:image/png;base64,${data.img_base64}`,
                }}
              />

              <Button
                title={data.name_flowring_plants}
                onPress={() => {
                  FunctionSelectFP(data);
                }}
              />
            </View>
          );
        })}
      </View>

      <View style={styles.ContainerMain}>
        {FloweringPlants.filter((a, key) => key % 2 == 1).map((data, key) => {
          return (
            <View style={{ alignItems: "center" }} key={key}>
              <Image
                style={styles.images}
                source={{
                  uri: `data:image/png;base64,${data.img_base64}`,
                }}
              />

              <Button
                title={data.name_flowring_plants}
                onPress={() => {
                  FunctionSelectFP(data);
                }}
              />
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

  images: {
    marginTop: "20%",
    marginBottom: "1%",
    width: 100,
    height: 100,
    borderStyle: "solid",
    borderColor: "black",
    borderRadius: 5,
    borderWidth: 1,
  },

  ContainerMain: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
