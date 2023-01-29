import React, { useState, useEffect } from "react";
import { TextInput, View, Button } from "react-native";

import Paho from "paho-mqtt";
// import init from 'react_native_mqtt';

const Member_Demo_mqtt = () => {
  const [runTime, setRunTime] = useState("");
  // Create a client instance
  const client = new Paho.Client(
    "broker.hivemq.com",
    Number(8000),
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
    // Once a connection has been made, make a subscription and send a message.

    console.log("onConnect");
    client.subscribe("GDR"); //ชื่อ TEST01

    //   client.connect({
    //     userName: 'GTO1',
    //     password: '123456',
    //     onSuccess: onConnect
    // });

    // let message = new Paho.Message("Hello");
    // message.destinationName = "World";
    // client.send(message);
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
    var message = new Paho.Message("1," + runTime);
    message.destinationName = "GDR";

    console.log("message: ", JSON.stringify(message, null, 2));
    console.log("type: ", typeof message);

    client.send(message);
  }
  function function2() {
    var message = new Paho.Message("2," + runTime);
    message.destinationName = "GDR";
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
        value={runTime}
        onChangeText={async (e) => {
          setRunTime(e);
        }}
      />
      <Button title="Run Function 1" onPress={function1} />
      <Button title="Run Function 2" onPress={function2} />
    </View>
  );
};

export default Member_Demo_mqtt;
