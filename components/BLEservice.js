import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet,TextInput, Platform, PermissionsAndroid } from 'react-native';
import {bleManager} from '@/utils/BLE_instance'

const BLEservice = () => {
  const [device, setDevice] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [inputText, changeInputText] = useState('');

  // Replace these with your actual UUIDs
  const SERVICE_UUID = "853f29b2-f5ed-4b69-b4c6-9cd68a9fc2b0";
  const SSID_CHARACTERISTIC_UUID = "b72b9432-25f9-4c7f-96cb-fcb8efde84fd";

  useEffect(() => {
    // Request location permission (required for BLE scanning on Android)
    const requestPermissions = async () => {
      const granted = await requestLocationPermission();
      return granted;
    };

    requestPermissions();
  }, []);

  const connectToDevice = async () => {
    try {
      // Start scanning for devices
      setIsScanning(true);
      console.log('Scanning for BLE devices...');

      bleManager.startDeviceScan(null, null, async (error, scannedDevice) => {
        if (error) {
          console.error('Scan error:', error);
          setIsScanning(false);
          return;
        }

        // Check if this is the device you want to connect to
        if (scannedDevice && scannedDevice.serviceUUIDs?.includes(SERVICE_UUID)) {
          // Stop scanning once we find the device
          console.log("Found Solar Inverter");
          bleManager.stopDeviceScan();
          setIsScanning(false);

          try {
            // Connect to the device
            const connectedDevice = await scannedDevice.connect();
            console.log('Connected to device');

            // Discover all services and characteristics
            const discoveredDevice = await connectedDevice.discoverAllServicesAndCharacteristics();
            console.log('Discovered services and characteristics');

            setDevice(discoveredDevice);
            setIsConnected(true);

          } catch (connectionError) {
            console.error('Connection error:', connectionError);
            setIsConnected(false);
          }
        }
      });
    } catch (error) {
      console.error('BLE error:', error);
      setIsConnected(false);
    }
  };

  const disconnectDevice = async () => {
    if (device) {
      try {
        await device.cancelConnection();
        setIsConnected(false);
        setDevice(null);
      } catch (error) {
        console.error('Disconnection error:', error);
      }
    }
  };

  const write_ssid = async () => {
    try {
      await device.writeCharacteristicWithoutResponseForService(
        SERVICE_UUID,
        SSID_CHARACTERISTIC_UUID,
        btoa(inputText),
        null
      )
      console.log("Successful write to characteristic")
    } catch (error) {
      console.error("Failed to write to characteristic", error)
    }
  };

  return (
    <View style={styles.container}>
      {isConnected ? (
        <View>
          <Text style={styles.statusText}>Connected to device</Text>
          <Button title="Disconnect" onPress={disconnectDevice} />
        </View>
      ) : (
        <View>
          {isScanning ? (
            <Text style={styles.statusText}>Scanning for devices...</Text>
          ) : (
            <Button title="Connect to device" onPress={connectToDevice} />
          )}
        </View>
      )}

      <TextInput
        style={styles.input}
        placeholder="Type something"
        value={inputText
        }
        onChangeText={text => changeInputText(text)}
      />
      <Button title="Submit" onPress={write_ssid} />
      <Text>Your Input: {inputText}</Text>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  statusText: {
    fontSize: 18,
    marginBottom: 16,
  },
  input: {
    fontSize : 25
  }
});

// Helper function for requesting location permission
const requestLocationPermission = async () => {
  try {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    }
    return true;
  } catch (err) {
    console.error('Permission error:', err);
    return false;
  }
};

export default BLEservice;