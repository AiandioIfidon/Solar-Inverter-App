import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import { PermissionsAndroid, Platform } from 'react-native';
import { BleManager } from 'react-native-ble-plx'

const SERVICE_UUID = '853f29b2-f5ed-4b69-b4c6-9cd68a9fc2b0'; // BLE service UUID
const SSID_UUID = 'b72b9432-25f9-4c7f-96cb-fcb8efde84fd';     // SSID characteristic UUID
const PASS_UUID = '7c8451c7-7909-47ef-b072-35d24729b8aa';     // Password characteristic UUID

function scanAndConnect() {
  manager.startDeviceScan(null, null, (error, device) => {
    if (error) {
      // Handle error (scanning will be stopped automatically)
      return
    }

    // Check if it is a device you are looking for based on advertisement data
    // or other criteria.
    if (device.name === 'Solar_Inverter_2764') {
      // Stop scanning as it's not necessary if you are scanning for one device.
      manager.stopDeviceScan()
      console.log('Found the Solar Inverter')
      // Proceed with connection.
      device
      .connect()
      .then( device => {
        return device.discoverAllServicsAndCharacteristics()
      })
      .then( device => {
        // A fully functional connection you can use, now you can read, write and monitor values
        console.log('hello there')
      })
      .catch

    }
  })
}






const Bluetooth = () => {

  const requestBluetoothPermission = async () => {
    if (Platform.OS === 'ios') {
      return true
    }
    if (Platform.OS === 'android' && PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION) {
      const apiLevel = parseInt(Platform.Version.toString(), 10)
      
      if (PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN && PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT) {
        const result = await PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
          PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT
        ])
        
        return (
          result['android.permission.BLUETOOTH_CONNECT'] === PermissionsAndroid.RESULTS.GRANTED &&
          result['android.permission.BLUETOOTH_SCAN'] === PermissionsAndroid.RESULTS.GRANTED
        )
      }
    }
  
    this.showErrorToast('Permission have not been granted')
  
    return false
  }







  return(
    <View>
      <Text>Hello there</Text>
    </View>
  );
}

export default Bluetooth;
