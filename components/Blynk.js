import React, { useEffect, useState } from "react";
import { Button, Text, View, StyleSheet, Alert } from "react-native";
import { auth_token } from './token'

const Blynk = () => {

    const server_address = "blynk.cloud"
    const token = auth_token
    const Relay_Switch = 'v0'
    const Battery_Monitor = 'v1'
    const Status_Vpin = 'v2'
    const Power_pin = 'v3'
    const digital_on = 1
    const digital_off = 0
    
    const [Battery_Percentage, setBatteryPercentage] = useState(0)
    const [Inverter_Status, setInverter_Status] = useState('Offline')
    const [Power_Consumption, setPower_Consumption] = useState(0)

  useEffect(() => {
    const getInverter_Status = async () => {
      try{
        const status = await fetch(`https://${server_address}/external/api/get?token=${token}&${Status_Vpin}`)
        if (status.ok){
          const status_text = await status.text()
          setInverter_Status(status_text)
          console.log(Inverter_Status)
        }
      } catch(error){
        console.error("Failed to perform getInverter_Status operation")
      }  
    };

    const interval_id2 = setInterval(getInverter_Status, 5000)
    return () => clearInterval(interval_id2);
  }, []);

  useEffect(() => {
    const getBatteryPercentage = async () => {
      try {
        const response = await fetch(`https://${server_address}/external/api/get?token=${token}&${Battery_Monitor}`)
        if (response.ok){
          const value = await response.text();
          setBatteryPercentage(value)
          console.log(Battery_Percentage)
        } else {
          console.log("Failed to Update Battery percentage")
        }
      } catch (error) {}
    };
    const interval_id = setInterval(getBatteryPercentage, 5000)
    return () => clearInterval(interval_id);
  }, [])

  useEffect(() => {
    const getPowerConsumption = async () => {
      try {
        const response = await fetch(`https://${server_address}/external/api/get?token=${token}&${Power_pin}`)
        if (response.ok){
          const value = await response.text();
          setPower_Consumption(value)
        } else {
          console.log("Failed to Update Power Consumption")
        }
      } catch (error) {}
    };

    const interval_id2 = setInterval(getPowerConsumption, 5000)
    return () => clearInterval(interval_id2)
  }, [])

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
        Alert.alert("Solar Inverter turn off successfully!");
      } else {
        Alert.alert("Error", "Failed to turn off Solar Inverter");
      }
    } catch (error) {}
  };

  return (
    <View style={styles.container}>
      <Text style = {styles.Status} >Device Status: {Inverter_Status} </Text>
      <Button title = "Switch-on" onPress={performAction_TurnOn} />
      <Button title = "Switch-off" onPress={performAction_TurnOff} />
      <Text style = {styles.Battery} >Battery Percentage : {Battery_Percentage}% </Text>
      <Text style = {styles.Power}>Power Consumption : {Power_Consumption}Amps</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
  },
  Battery: {
    fontSize: 25,
    color: 'green'
  },
  Power: {
    fontSize: 25,
    color: 'orange'
  },
  Status: {
    fontSize: 25,
    color: 'purple'
  }
});

export default Blynk;