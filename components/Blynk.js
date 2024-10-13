import React from "react";
import { Button, Text, View, StyleSheet, Alert } from "react-native";

const Blynk = () => {

    const server_address = 'blynk.cloud'
    const blynk_auth_token = 'Cka-31Akppx-UNnQUQQ5f5Bea6IVf1Kd'
    const blynk_template_id = 'TMPL2qmaW4p6H'
    const pin = 'v0'
    const digital_on = 1
    const digital_off = 0

  const performAction_TurnOn = async () => {
    try {
      const response = await fetch(`http://${server_address}/external/api/update?token=${blynk_auth_token}&${pin}=${digital_on}`);
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
        const response = await fetch(`http://${server_address}/external/api/update?token=${blynk_auth_token}&${pin}=${digital_off}`);
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