import React from "react";
import { Button, Text, View, StyleSheet, Alert } from "react-native";
import {SERVER_ADDRESS, BLYNK_AUTH_TOKEN, BLYNK_TEMPLATE_ID} from '@env'

const Blynk = () => {

    const server_address = SERVER_ADDRESS
    const blynk_auth_token = BLYNK_AUTH_TOKEN
    const blynk_template_id = BLYNK_TEMPLATE_ID
    const Relay_Switch = 'v0'
    const digital_on = 1
    const digital_off = 0

  const performAction_TurnOn = async () => {
    try {
      const response = await fetch(`http://${server_address}/external/api/update?token=${blynk_auth_token}&${Relay_Switch}=${digital_on}`);
      if (response.ok) {
        const result = await response.json(); // Assuming the response is in JSON format
        Alert.alert("Success", "Action performed successfully!");
        console.log(result);
      } else {
        Alert.alert("Error", "Failed to perform action");
      }
    } catch (error) {}
  };

  const performAction_TurnOff = async () => {
    try {
        const response = await fetch(`http://${server_address}/external/api/update?token=${blynk_auth_token}&${Relay_Switch}=${digital_off}`);
      if (response.ok) {
        const result = await response.json(); // Assuming the response is in JSON format
        Alert.alert("Success", "Action performed successfully!");
        console.log(result);
      } else {
        Alert.alert("Error", "Failed to perform action");
      }
    } catch (error) {}
  };

  return (
    <View style={styles.container}>
      <Text>Cloud control for your device</Text>
      <Button title = "Switch-on" onPress={performAction_TurnOn} />
      <Button title = "Switch-off" onPress={performAction_TurnOff} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
  }
});

export default Blynk;