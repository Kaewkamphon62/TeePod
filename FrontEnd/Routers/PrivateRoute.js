import { StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";

import { useAsyncStorage } from "@react-native-async-storage/async-storage";
import AsyncStorage from "@react-native-async-storage/async-storage";

// import App from "../App";

export const PrivateRoute_Context = React.createContext(); //const PrivateRoute_Context กำหนด

export const PrivateRoute = ({ children }) => {
  const [loading, setLoading] = React.useState(true);
  const [token, setToken] = React.useState(null);

  useEffect(() => {
    const Token_Sync = async () => {
      try {
        const getToken = await AsyncStorage.getItem("@storage_Key");
        if (getToken != undefined) {
          setToken(getToken);
        } else {
          setToken(null);
        }
        console.log("PrivateRoute.js: ", getToken);
        //
        setLoading(false);
      } catch (e) {
        console.log(e);
      }
    };
    Token_Sync();
  }, []);

  // if (loading == true) {
  //   return <></>;
  // }

  return (
    <PrivateRoute_Context.Provider value={{ token }}>
      {children}
    </PrivateRoute_Context.Provider>
  );
};

const styles = StyleSheet.create({});
