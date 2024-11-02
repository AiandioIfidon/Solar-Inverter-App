import React, { useEffect } from "react";
import { Button, Text, View, StyleSheet, Alert } from "react-native";
import {SERVER_ADDRESS, BLYNK_AUTH_TOKEN, BLYNK_TEMPLATE_ID} from '@env'

const Blynk = () => {

    const server_address = SERVER_ADDRESS
    const token = BLYNK_AUTH_TOKEN
    const blynk_template_id = BLYNK_TEMPLATE_ID
    const Relay_Switch = 'v0'
    const Battery_Monitor = 'v1'
    const digital_on = 1
    const digital_off = 0

    let Battery_Percentage = 0;

  useEffect(() => {
    const getBatteryPercentage = async () => {
      try {
        const response = await fetch(`https://${server_address}/external/api/get?token=${token}&${Battery_Monitor}`)
        if (response.ok){
          Battery_Percentage = response
          console.log(Battery_Percentage)
        } else {
          console.log("Failed to Update Battery percentage")
        }
      } catch (error) {}
    };

    const interval_id = setInterval(getBatteryPercentage, 5000)
    return () => clearInterval(interval_id);
  }, []);

  const performAction_TurnOn = async () => {
    try {
      const response = await fetch(`https://${server_address}/external/api/update?token=${token}&${Relay_Switch}=${digital_on}`);
      if (response.ok) {
        Alert.alert("Solar Inverter turn on successfully!");
      } else {
        Alert.alert("Error", "Failed to turn on the Solar Inverter");
      }
    } catch (error) {}
  };

  const performAction_TurnOff = async () => {
    try {
        const response = await fetch(`http://${server_address}/external/api/update?token=${token}&${Relay_Switch}=${digital_off}`);
      if (response.ok) {
        const result = await response.json(); // Assuming the response is in JSON format
        Alert.alert("Solar Inverter turn off successfully!");
        console.log(result);
      } else {
        Alert.alert("Error", "Failed to turn off Solar Inverter");
      }
    } catch (error) {
    }
  };

  return (
    <View style={styles.container}>
      <Text>Battery Percentage : {Battery_Percentage}</Text>
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