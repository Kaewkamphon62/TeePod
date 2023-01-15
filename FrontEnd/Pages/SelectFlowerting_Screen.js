import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Button,
  ScrollView,
} from "react-native";
import React, { useEffect } from "react";
import axios from "axios";
import { PrivateRoute_Context } from "../Routers/PrivateRoute";
import { Image } from "react-native";

const SelectFlowerting = ({ navigation }) => {
  /////////////////////////////////////////////////////////////////
  const { state, otherFunction } = React.useContext(PrivateRoute_Context);
  /////////////////////////////////////////////////////////////////

  const [Floweringlants, setFloweringlants] = React.useState([]);
  const [Username, setUsername] = React.useState(null);

  React.useEffect(() => {
    setFloweringlants([]);
    setUsername(null);

    const username = state.userName;
    const getDB = async () => {
      await axios
        .post("http://192.168.137.1:3000/loadFloweringlants")
        .then(async (res) => {
          if (res.data.fp != undefined) {
            // console.log("res.data.fp", typeof res.data.fp);
            setFloweringlants(res.data.fp);
            setUsername(username);
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
            <View style={{ alignItems: "center" }} key={key}>
              {/* <Text value="Hello" style={styles.marginItems}>
                Picture
              </Text> */}

              <Image
                // style={styles.marginItems}
                style={styles.images}
                source={{
                  uri: data.url_image,
                }}
              />

              <Button
                title={data.name_flowring_plants}
                onPress={async () => {
                  await axios
                    .post("http://192.168.137.1:3000/SelectFloweringlants", {
                      UserUsername: Username,
                      name_flowring_plants: data.name_flowring_plants,
                      sunbathing_time: data.sunbathing_time,
                    })
                    .then(async (res) => {
                      if (res.data.alert != undefined) {
                        // alert(res.data.alert);
                        await otherFunction.getMemberData({
                          username: state.userName,
                        });

                        await navigation.navigate("Member_Home");
                      }
                    });
                }}
              />
            </View>
          );
        })}
      </View>

      <View style={styles.ContainerMain}>
        {Floweringlants.filter((a, key) => key % 2 == 1).map((data, key) => {
          return (
            <View style={{ alignItems: "center" }} key={key}>
              {/* <Text style={styles.marginItems}>Picture</Text> */}

              <Image
                // style={styles.marginItems}
                style={styles.images}
                source={{
                  uri: data.url_image,
                }}
              />

              <Button
                title={data.name_flowring_plants}
                onPress={async () => {
                  await axios
                    .post("http://192.168.137.1:3000/SelectFloweringlants", {
                      UserUsername: Username,
                      name_flowring_plants: data.name_flowring_plants,
                      sunbathing_time: data.sunbathing_time,
                    })
                    .then(async (res) => {
                      if (res.data.alert != undefined) {
                        // alert(res.data.alert);

                        await otherFunction.getMemberData({
                          username: state.userName,
                        });

                        await navigation.navigate("Member_Home");
                      }
                    });
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
