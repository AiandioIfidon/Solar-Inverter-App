import React from "react";
import { Button, Text, View, StyleSheet, Alert, SafeAreaView } from "react-native";

const Wifi_local = () => {

  const performAction_TurnOn = async () => {
    try {
      const response = await fetch('http://192.168.0.120/3/on');
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
      const response = await fetch('http://192.168.0.120/3/off');
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
    <SafeAreaView>
    <View style={styles.container}>
      <Text>Wifi Control for your device.</Text>
      <Button title = "Switch-on" onPress={performAction_TurnOn} />
      <Button title = "Switch-off" onPress={performAction_TurnOff} />
      </View>
    </SafeAreaView>
  );
  

  /*return (
    <SafeAreaView>
      <WebView
        originWhitelist={['*']}
        source={{ html: '<h1>Hello world</h1>' }}
      />
    </SafeAreaView>
  )
  */
}

const styles = StyleSheet.create({
  container: {
  },
  button: {
    color: 'green'
  }
});

export default Wifi_local;
