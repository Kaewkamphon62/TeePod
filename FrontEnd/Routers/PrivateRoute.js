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
        case "MemberDB":
          return {
            ...prevState,
            name_fp: action.nfp,
            sunbathing_time: action.st,
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
    }
  );

  React.useEffect(() => {
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
  }, []);

  const otherFunction = React.useMemo(() => ({
    getMemberData: async (e) => {
      // console.log("getMemberData", e.username);
      let username = e.username;

      await axios
        .post("http://192.168.137.1:3000/loadMemberData", { username })
        .then(async (res) => {
          if (res.data.mdata != null) {
            // console.log(res.data.mdata);
            // console.log(
            //   "name_flowring_plants: ",
            //   res.data.mdata.name_flowring_plants
            // );
            // console.log("sunbathing_time: ", res.data.mdata.sunbathing_time);

            dispatch({
              type: "MemberDB",
              nfp: res.data.mdata.name_flowring_plants,
              st: res.data.mdata.sunbathing_time,
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
