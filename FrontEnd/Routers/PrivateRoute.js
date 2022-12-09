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
        case "RESTORE_TOKEN":
          return { ...prevState, userToken: action.token, isLoading: false };
        case "SIGN_IN":
          return { ...prevState, isSignout: false, userToken: action.token };
        case "SIGN_OUT":
          return { ...prevState, isSignout: true, userToken: null };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
    }
  );

  React.useEffect(() => {
    const Token_Sync = async () => {
      let userToken;
      try {
        userToken = await AsyncStorage.getItem("@Token");
        console.log("userToken", userToken);
      } catch (e) {}
      dispatch({ type: "RESTORE_TOKEN", token: userToken });
    };

    Token_Sync();
  }, []);

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

            if (res.data.resError != undefined){
              alert(res.data.resError)
            }

            if (res.data.alert != undefined) {
              console.log("res", res.data.alert);
              alert(res.data.alert);
            }

            if (res.data.token != undefined) {
              // await storeData(res.data.token);
              await AsyncStorage.setItem("@Token", res.data.token);
              dispatch({ type: "SIGN_IN", token: res.data.token });
              // console.log('ได้รับ Token(SS.js): ', res.data.token)
            }
          })
          .catch((error) => {
            console.log("authSign `statusError`", error);
            alert('Network Error')
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

      signUp: async (data) => {
        console.log("");
        console.log("PrivateRoute.js: Function authSign.signUp");
        let email = data.InputSighUp.email;
        let username = data.InputSighUp.username;
        let password1 = data.InputSighUp.password1;
        let password2 = data.InputSighUp.password2;
        // dispatch({ type: "SIGN_IN", token: "dummy-auth-token" });

        console.log(email, username, password1, password2);
        if (
          email != null &&
          username != null &&
          password1 != null &&
          password2 != null
        ) {
          if (password1 != password2) {
            alert("รหัสผ่านไม่ตรงกัน");
          } else {
            await axios
              .post("http://192.168.137.1:3000/register", {
                email,
                username,
                password1,
              })
              .then(async (res) => {
                //res.data.token ว่งมาจากจาก BackEnd (res = response)
                // console.log(typeof value) //ดู type ของตัวแปรเช่นเป็น object หรือ string
                if (res.data.alert) {
                  alert(res.data.alert);
                }
              })
              .catch((error) => {
                console.log(error);
              });
          }
        } else {
          alert("กรุณากรอกข้อมูลให้ครบถ้วน");
        }
      },
    }),
    []
  );

  return (
    <PrivateRoute_Context.Provider value={{ authSign, state }}>
      {children}
    </PrivateRoute_Context.Provider>
  );
};

const styles = StyleSheet.create({});
