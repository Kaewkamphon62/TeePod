import React, { useState, useEffect } from "react";
import { TextInput, View, Button } from "react-native";

//กรอกเวลาก่อนส่งเป็นแบบ Second

import Paho from "paho-mqtt";
// import init from 'react_native_mqtt';

const Member_Demo_mqtt = () => {
  const [Seconds, setSeconds] = useState("");

  const client = new Paho.Client(
    "test.mosquitto.org",
    Number(8080),
    "clientId_" + parseInt(Math.random() * 100, 10)
  );

  // React.useEffect(() => {
  client.onConnectionLost = onConnectionLost;
  client.onMessageArrived = onMessageArrived;
  // connect the client
  client.connect({ onSuccess: onConnect });
  // }, []);

  // called when the client connects
  function onConnect() {
    console.log("onConnect");
    client.subscribe(key); //ชื่อ TEST01
  }

  // called when the client loses its connection
  function onConnectionLost(responseObject) {
    if (responseObject.errorCode !== 0) {
      console.log("onConnectionLost:" + responseObject.errorMessage);
    }
  }

  // called when a message arrives
  function onMessageArrived(message) {
    console.log("onMessageArrived:" + message.payloadString);
  }

  function function1() {
    var message = new Paho.Message("1," + Seconds);
    message.destinationName = key;

    console.log("message: ", JSON.stringify(message, null, 2));
    console.log("type: ", typeof message);

    client.send(message);
  }
  function function2() {
    var message = new Paho.Message("2," + Seconds);
    message.destinationName = key;
    client.send(message);
  }

  return (
    <View
      style={{
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
      }}
    >
      <TextInput
        placeholder="timeinput"
        value={Seconds}
        onChangeText={async (e) => {
          setSeconds(e); //เวลาที่กำหนด
        }}
      />
      <Button title="Run Function 1" onPress={function1} />
      <Button title="Run Function 2" onPress={function2} />
    </View>
  );
};

export default Member_Demo_mqtt;
