import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { BleManager } from 'react-native-ble-plx';

const BLEservice = () => {
  const [device, setDevice] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const bleManager = new BleManager();

  // Replace these with your actual UUIDs
  const SERVICE_UUID = "YOUR_SERVICE_UUID";
  const CHARACTERISTIC_UUID = "YOUR_CHARACTERISTIC_UUID";

  useEffect(() => {
    // Request location permission (required for BLE scanning on Android)
    const requestPermissions = async () => {
      const granted = await requestLocationPermission();
      return granted;
    };

    requestPermissions();

    // Cleanup on component unmount
    return () => {
      bleManager.destroy();
    };
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

            // Set up notification/monitoring of the characteristic
            await discoveredDevice.monitorCharacteristicForService(
              SERVICE_UUID,
              CHARACTERISTIC_UUID,
              (error, characteristic) => {
                if (error) {
                  console.error('Monitoring error:', error);
                  return;
                }
                // Handle incoming data
                console.log('Received data:', characteristic?.value);
              }
            );
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statusText: {
    fontSize: 18,
    marginBottom: 16,
  },
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