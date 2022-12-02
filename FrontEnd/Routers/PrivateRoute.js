import { StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";

import { useAsyncStorage } from "@react-native-async-storage/async-storage";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AuthContext = React.createContext(); //const AuthContext กำหนด

export const PrivateRoute = ({ children }) => {
  const [loading, setLoading] = React.useState(true);
  const [token, setToken] = React.useState(null);

  useEffect(() => {
    (async () => {
      const getToken = await AsyncStorage.getItem("@storage_Key");
      if (getToken != undefined) {
        setToken(getToken);
      }
      console.log("if: ", getToken);
      setLoading(false);
    })();
  });

  if (loading == true) {
    return <></>;
  }

  return (
    <AuthContext.Provider value={{ token }}>{children}</AuthContext.Provider>
  );
};

const styles = StyleSheet.create({});
