import React, { useState, useEffect } from 'react';
<<<<<<< HEAD
import { View, Text, Button,ScrollView, StyleSheet, TextInput, Platform, PermissionsAndroid, TouchableOpacity, ActivityIndicator } from 'react-native';
import {bleManager} from '@/utils/BLE_instance'
=======
import { View, Text, Button, StyleSheet, TextInput, Platform, PermissionsAndroid, TouchableOpacity, ActivityIndicator } from 'react-native';
import { bleManager } from '@/utils/BLE_instance'
>>>>>>> bluetooth
import { MaterialIcons, Feather } from '@expo/vector-icons';

const BLEservice = () => {
  const [device, setDevice] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [SSID, changeSSID] = useState('');
  const [PASSPHRASE, changePASSPHRASE] = useState('');

  // UUIDs of the service and characteristics
  const SERVICE_UUID = "853f29b2-f5ed-4b69-b4c6-9cd68a9fc2b0";
  const SSID_CHARACTERISTIC_UUID = "b72b9432-25f9-4c7f-96cb-fcb8efde84fd";
  const PASSPHRASE_CHARACTERISTIC_UUID = "7c8451c7-7909-47ef-b072-35d24729b8aa"

  useEffect(() => {
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
          console.log("Found : " + scannedDevice.name);
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
        btoa(SSID),
        null
      )
      console.log("Successful write to SSID characteristic\nWritten value: " + SSID)
    } catch (error) {
      console.error("Failed to write to characteristic", error)
    }
  };

  const write_passphrase = async () => {
    try {
      await device.writeCharacteristicWithoutResponseForService(
        SERVICE_UUID,
        PASSPHRASE_CHARACTERISTIC_UUID,
        btoa(PASSPHRASE),
        null
      )
      console.log("Successful write to Passphrase characteristic\nWritten value: " + PASSPHRASE)
    } catch (error) {
      console.error("Failed to write to characteristic", error)
    }
  }

  const write_both = async () => {
    try {
      write_ssid();
      write_passphrase();
      setTimeout(() => {
        disconnectDevice();
      }, 1000);
    } catch (error) {
      console.error("Error writing passphrase and ssid")
    }
  }

  return (
    <ScrollView>
      <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.statusSection}>
          {isConnected ? (
            <>
              <View style={styles.statusIndicator}>
                <MaterialIcons name="wifi" size={24} color="#22c55e" />
                <View style={[styles.statusDot, styles.statusConnected]} />
              </View>
              <Text style={styles.statusTitle}>Connected</Text>
              <TouchableOpacity
                style={styles.disconnectButton}
                onPress={disconnectDevice}
              >
                <MaterialIcons name="wifi-off" size={20} color="#ef4444" />
                <Text style={styles.disconnectText}>Disconnect</Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
              <View style={styles.statusIndicator}>
                <MaterialIcons name="wifi" size={24} color="#94a3b8" />
                <View style={[styles.statusDot, styles.statusDisconnected]} />
              </View>
              <Text style={styles.statusTitle}>Not Connected </Text>
              <Text style={styles.note}>Bluetooth and Location must be enabled</Text>
              {isScanning ? (
                <View style={styles.scanningContainer}>
                  <ActivityIndicator color="#2563eb" />
                  <Text style={styles.scanningText}>Scanning for devices...</Text>
                </View>
              ) : (
                <TouchableOpacity
                  style={styles.connectButton}
                  onPress={connectToDevice}
                >
                  <Text style={styles.connectButtonText}>Connect Device</Text>
                </TouchableOpacity>
              )}
            </>
          )}
        </View>

        <View style={styles.configSection}>
          <Text style={styles.configTitle}>Network Configuration</Text>

          <View style={styles.inputContainer}>
            <Feather name="user" size={20} color="#64748b" />
            <TextInput
              style={styles.input}
              placeholder="Network SSID"
              placeholderTextColor="#94a3b8"
              value={SSID}
              onChangeText={text => changeSSID(text)}
            />
          </View>

          <View style={styles.inputContainer}>
            <Feather name="lock" size={20} color="#64748b" />
            <TextInput
              style={styles.input}
              placeholder="Network Password"
              placeholderTextColor="#94a3b8"
              value={PASSPHRASE}
              onChangeText={text => changePASSPHRASE(text)}
              secureTextEntry
            />
          </View>

          <TouchableOpacity
            style={styles.submitButton}
            onPress={write_both}
          >
            <Text style={styles.submitButtonText}>Update Network Settings</Text>
            <MaterialIcons name="arrow-right" size={20} color="#ffffff" />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.infoSection}>
        <Text style={styles.sectionTitle}>How to Use</Text>
        <View style={styles.instructionItem}>
          <View style={styles.instructionNumber}>
            <Text style={styles.numberText}>1</Text>
          </View>
          <Text style={styles.instructionText}>Enable Bluetooth and Location(or allow nearby devices) on your device</Text>
        </View>
        <View style={styles.instructionItem}>
          <View style={styles.instructionNumber}>
            <Text style={styles.numberText}>2</Text>
          </View>
          <Text style={styles.instructionText}>Connect to your BLE device using the Connect button</Text>
        </View>
        <View style={styles.instructionItem}>
          <View style={styles.instructionNumber}>
            <Text style={styles.numberText}>3</Text>
          </View>
          <Text style={styles.instructionText}>Enter WiFi network name and password</Text>
        </View>
        <View style={styles.instructionItem}>
          <View style={styles.instructionNumber}>
            <Text style={styles.numberText}>4</Text>
          </View>
          <Text style={styles.instructionText}>Click "Update Network Settings" to send credentials and wait for device to restart</Text>
        </View>
        <View style={styles.instructionItem}>
          <View style={styles.instructionNumber}>
            <Text style={styles.numberText}>?</Text>
          </View>
          <Text style={styles.instructionText}>If device keeps trying to connect to the WiFi network without success, try updating the Network setting again but with the mobile phone closer(about 3 meters) to the device</Text>
        </View>
      </View>
    </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#EEF2FF', // Light indigo background matching Blynk2
    padding: 16,
  },
  infoSection: {
    marginTop: 20,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#DFE3F8',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#4F5B93',
    marginBottom: 12,
  },
  numberText: {
    color: '#ffffff',
    fontWeight: '600',
  },
  instructionText: {
    fontSize: 15,
    color: '#64748b',
    flex: 1,
  },
  instructionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },
  instructionNumber: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#6366F1',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  card: {
    backgroundColor: '#F8FAFF', // Very light blue tint
    borderRadius: 20,
    padding: 24,
    shadowColor: '#6366F1', // Indigo shadow
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.12,
    shadowRadius: 10,
    elevation: 4,
    marginBottom: 16,
  },
  note: {
<<<<<<< HEAD
    fontStyle: 'italic',
    color: '#64748b',
    marginBottom: 12,
    fontSize: 14,
=======
    fontStyle: 'italic'
>>>>>>> bluetooth
  },
  statusSection: {
    alignItems: 'center',
    paddingBottom: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#DFE3F8', // Light blue border
    marginBottom: 4,
  },
  statusIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginLeft: 8,
  },
  statusConnected: {
    backgroundColor: '#22c55e',
  },
  statusDisconnected: {
    backgroundColor: '#94a3b8',
  },
  statusTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#4F5B93', // Blueish-gray for text, matching Blynk2
    marginBottom: 16,
  },
  disconnectButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#feeaea', // Lighter red
    borderRadius: 16, // Increased radius
    shadowColor: '#ef4444',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  disconnectText: {
    color: '#ef4444',
    fontWeight: '500',
    marginLeft: 8,
  },
  connectButton: {
    backgroundColor: '#6366F1', // Changed to indigo to match theme
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 16, // Increased radius
    shadowColor: '#6366F1',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  connectButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  scanningContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  scanningText: {
    color: '#4F5B93', // Matching blue-gray
    marginLeft: 8,
    fontSize: 14,
  },
  configSection: {
    marginTop: 24,
  },
  configTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#4F5B93', // Matching blue-gray
    marginBottom: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F1F5FF', // Light blue input background
    borderRadius: 16, // Increased radius
    paddingHorizontal: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#DFE3F8', // Light blue border
  },
  input: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 12,
    fontSize: 16,
    color: '#4F5B93', // Matching blue-gray
  },
  submitButton: {
    backgroundColor: '#6366F1', // Changed to indigo to match theme
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 16, // Increased radius
    marginTop: 16,
    shadowColor: '#6366F1',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
  },
  submitButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
    marginRight: 8,
  },
});


// Helper function for requesting location permission
const requestLocationPermission = async () => {
  if (Platform.OS !== 'android') return false;

  const permission =
    Platform.Version >= 31
      ? PERMISSIONS.ANDROID.BLUETOOTH_SCAN
      : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION;

  const result = await request(permission);
  return result === RESULTS.GRANTED;
};

export default BLEservice;