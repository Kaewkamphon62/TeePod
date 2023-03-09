import { Alert, StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";

import { useAsyncStorage } from "@react-native-async-storage/async-storage";
import AsyncStorage from "@react-native-async-storage/async-storage";

import axios from "axios";
// import App from "../App";

export const PrivateRoute_Context = React.createContext(); //const PrivateRoute_Context กำหนด

export const PrivateRoute = ({ children }) => {
  // const [loading, setLoading] = React.useState(true);
  // if (loading == true) {
  //   return <></>;
  // }

  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case "FloweringPlantsDB":
          return {
            ...prevState,
            FloweringPlants: action.fp,
            isLoading: false,
          };
        case "DataIoT":
          return {
            ...prevState,
            tempc: action.tc,
            moisture: action.moist,
            humid: action.hid,
            isLoading: false,
          };

        case "MemberInfo":
          return {
            ...prevState,
            name_fp: action.nfp,
            sunbathing_time: action.st,
            keyIOT: action.kiot,
            isLoading: false,
          };

        case "RESTORE_TOKEN":
          return {
            ...prevState,
            userToken: action.token,
            userRole: action.role,
            userName: action.name,
            isLoading: false,
          };

        case "SIGN_IN":
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
            userRole: action.role,
          };

        case "SIGN_OUT":
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
            userRole: null,
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,

      userToken: null,
      userRole: null,
      userName: null,

      name_fp: null,
      sunbathing_time: null,

      tempc: null,
      moisture: null,
      humid: null,

      FloweringPlants: null,
    }
  );

  React.useEffect(() => {
    const DataFloweringPlants = async () => {
      const FP_Async = await AsyncStorage.getItem("@Flowerings");

      if (FP_Async != null) {
        await AsyncStorage.removeItem("@Flowerings");
      }
    };

    const Token_Sync = async () => {
      let userToken;
      try {
        userToken = await AsyncStorage.getItem("@Token");

        await axios
          .post("http://192.168.137.1:3000/ctoken", { userToken })
          .then(async (res) => {
            if (res.data.role != undefined) {
              dispatch({
                type: "RESTORE_TOKEN",
                token: userToken,
                role: res.data.role,
                name: res.data.name,
              });
            }

            if (res.data.error != undefined) {
              dispatch({
                type: "RESTORE_TOKEN",
              });
            }
          });
      } catch (e) {}
    };
    Token_Sync();
    DataFloweringPlants();
  }, []);

  const otherFunction = React.useMemo(() => ({
    getMemberData: async (e) => {
      // console.log("getMemberData", e.username);
      let username = e.username;

      await axios
        .post("http://192.168.137.1:3000/loadMemberData", { username })
        .then(async (res) => {
          if (res.data.mdata != null) {
            let milliseconds = null;
            if (res.data.mdata.sunbathing_time != null) {
              const ST_Split = res.data.mdata.sunbathing_time.split("h");
              let hours = parseInt(ST_Split[0]) * 3600000;
              let minute = parseInt(ST_Split[1]) * 60000;

              milliseconds = hours + minute;
            }

            dispatch({
              type: "MemberInfo",
              nfp: res.data.mdata.name_flowring_plants,
              kiot: res.data.mdata.keyIOT,
              st: milliseconds - 55000,
            });

            await otherFunction.getDataIOT({ Key: res.data.mdata.keyIOT });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },

    // getloadFloweringPlantsData: async (e) => {
    //   await axios.post;
    // },

    getDataIOT: async (e) => {
      let KeyIOT = e.Key;
      // console.log("KeyIOT: ", KeyIOT);

      if (KeyIOT != null) {
        await axios
          .post("http://192.168.137.1:3000/loadIotData", { KeyIOT })
          .then(async (res) => {
            if (res.data.keyzero != undefined) {
              // console.log("res.data.keyzero", res.data.keyzero);

              dispatch({
                type: "DataIoT",
                tc: res.data.keyzero.tempc,
                moist: res.data.keyzero.moisture,
                hid: res.data.keyzero.humid,
              });
            }
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        dispatch({
          type: "DataIoT",
          tc: null,
          moist: null,
          hid: null,
        });
      }
    },

    getFloweringPlants: async (e) => {
      await axios
        .post("http://192.168.137.1:3000/loadFloweringPlants")
        .then(async (res) => {
          if (res.data.fp != undefined) {
            dispatch({
              type: "FloweringPlantsDB",
              fp: res.data.fp,
            });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
  }));

  const authSign = React.useMemo(
    () => ({
      signIn: async (data) => {
        // console.log("");
        // console.log("PrivateRoute.js: Function authSign.signIn");
        // console.log(data.InputSighIn)
        // let username = data.InputSighIn.username;
        let value = data.InputSighIn;
        // console.log("value", value)

        await axios
          .post("http://192.168.137.1:3000/login", { value })
          .then(async (res) => {
            //res.data.token ว่งมาจากจาก BackEnd (res = response)
            // console.log(typeof value) //ดู type ของตัวแปรเช่นเป็น object หรือ string

            if (res.data.resError != undefined) {
              alert(res.data.resError);
            }

            if (res.data.alert != undefined) {
              console.log("res", res.data.alert);
              alert(res.data.alert);
            }

            if (res.data.token != undefined) {
              // await storeData(res.data.token);
              await AsyncStorage.setItem("@Token", res.data.token);

              if (res.data.role != "Admin") {
                await otherFunction.getMemberData({
                  username: res.data.member_username,
                });

                // await otherFunction.getDataIOT({
                //   Key: res.data.mdata.keyIOT,
                // });
              }

              dispatch({
                type: "RESTORE_TOKEN",
                name: res.data.member_username,
              });

              dispatch({
                type: "SIGN_IN",
                token: res.data.token,
                role: res.data.role,
              });
              // console.log('ได้รับ Token(SS.js): ', res.data.token)
            }
          })
          .catch((error) => {
            console.log("authSign `statusError`", error);
            alert("Network Error");
          });
      },

      signOut: async (data) => {
        console.log("");
        console.log("PrivateRoute.js: Function authSign.signOut");
        try {
          await AsyncStorage.removeItem("@Token");
        } catch (e) {
          console.log(e);
        }
        dispatch({ type: "SIGN_OUT" });
        dispatch({
          type: "DataIoT",
          tc: null,
          moist: null,
          hid: null,
        });
        dispatch({
          type: "MemberInfo",
          nfp: null,
          st: null,
          kiot: null,
        });
        dispatch({
          type: "RESTORE_TOKEN",
          userToken: null,
          userRole: null,
          userName: null,
        });
        dispatch({
          type: "FloweringPlantsDB",
          FloweringPlants: null,
        });
      },
    }),
    []
  );

  return (
    <PrivateRoute_Context.Provider value={{ authSign, otherFunction, state }}>
      {children}
    </PrivateRoute_Context.Provider>
  );
};

const styles = StyleSheet.create({});
