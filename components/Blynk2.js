import React, { useEffect, useState } from "react";
import { TouchableOpacity, Dimensions, Text, View, StyleSheet, Alert } from "react-native";
import Icon from 'react-native-vector-icons/Feather';
import { auth_token } from './token'

const { width, height } = Dimensions.get('window');

const Blynk2 = () => {

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
      try {
        const status = await fetch(`https://${server_address}/external/api/get?token=${token}&${Status_Vpin}`)
        if (status.ok) {
          const status_text = await status.text()
          setInverter_Status(status_text)
        }
      } catch (error) {
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
        if (response.ok) {
          const value = await response.text();
          setBatteryPercentage(value)
        } else {
          console.log("Failed to Update Battery percentage")
        }
      } catch (error) { }
    };
    const interval_id = setInterval(getBatteryPercentage, 5000)
    return () => clearInterval(interval_id);
  }, [])

  useEffect(() => {
    const getPowerConsumption = async () => {
      try {
        const response = await fetch(`https://${server_address}/external/api/get?token=${token}&${Power_pin}`)
        if (response.ok) {
          const value = await response.text();
          setPower_Consumption(value)
        } else {
          console.log("Failed to Update Power Consumption")
        }
      } catch (error) { }
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
    } catch (error) { }
  };

  const performAction_TurnOff = async () => {
    try {
      const response = await fetch(`http://${server_address}/external/api/update?token=${token}&${Relay_Switch}=${digital_off}`);
      if (response.ok) {
        Alert.alert("Solar Inverter turn off successfully!");
      } else {
        Alert.alert("Error", "Failed to turn off Solar Inverter");
      }
    } catch (error) { }
  };


  const getStatusColor = (status) => {
    return status?.toLowerCase() === "online" ? "#34d399" : "#f87171";
  };

  const getBatteryColor = (percentage) => {
    if (percentage >= 70) return "#34d399";
    if (percentage >= 30) return "#fbbf24";
    return "#f87171";
  };

  return (
    <View style={styles.container}>
      <View style={styles.grid}>
        <View style={styles.card}>
          <Icon
            name="power"
            size={48}
            color={getStatusColor(Inverter_Status)}
            style={styles.icon}
          />
          <Text style={styles.title}>Inverter Status</Text>
          <View style={[styles.statusDot, { backgroundColor: getStatusColor(Inverter_Status) }]} />
          <Text style={[styles.value, { color: getStatusColor(Inverter_Status) }]}>
            {Inverter_Status || 'Unknown'}
          </Text>
        </View>

        <View style={styles.card}>
          <Icon
            name="zap"
            size={48}
            color="#fbbf24"
            style={styles.icon}
          />
          <Text style={styles.title}>Power Control</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[
                styles.controlButton,
                styles.activeButton,
                { marginRight: 8 }
              ]}
              onPress={() => { performAction_TurnOn(); }}
            >
              <Text style={[
                styles.buttonText,
                styles.activeButtonText
              ]}>ON</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.controlButton,
                styles.activeButton
              ]}
              onPress={() => { performAction_TurnOff(); }}
            >
              <Text style={[
                styles.buttonText,
                styles.activeButtonText
              ]}>OFF</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.card}>
          <Icon
            name="battery"
            size={48}
            color={getBatteryColor(Battery_Percentage)}
            style={styles.icon}
          />
          <Text style={styles.title}>Battery Level</Text>
          <Text style={[styles.value, { color: getBatteryColor(Battery_Percentage) }]}>
            {Battery_Percentage !== undefined ? `${Math.min(100, Math.max(0, Battery_Percentage))}%` : '0%'}
          </Text>
          <View style={styles.batteryBar}>
            <View
              style={[
                styles.batteryFill,
                {
                  width: `${Math.min(100, Math.max(0, Battery_Percentage || 0))}%`,
                  backgroundColor: getBatteryColor(Battery_Percentage)
                }
              ]}
            />
          </View>
        </View>

        {/* Power Consumption */}
        <View style={styles.card}>
          <Icon
            name="activity"
            size={48}
            color="#60a5fa"
            style={styles.icon}
          />
          <Text style={styles.title}>Power Consumption</Text>
          <Text style={styles.value}>
            <Text style={[styles.value, { color: '#60a5fa' }]}>
              {Power_Consumption !== undefined ? Power_Consumption : '0'}
            </Text>
            <Text style={styles.unit}> Amps</Text>
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#EEF2FF', // Light blue/indigo background
    paddingTop: 16,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  card: {
    width: (width - 48) / 2,
    height: (height - 200) / 2,
    backgroundColor: '#F8FAFF', // Very light blue tint
    margin: 6,
    borderRadius: 20,
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#6366F1',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 4,
    borderWidth: 0,
  },
  icon: {
    marginBottom: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: '#4F5B93', // Blueish-gray for text
    textAlign: 'center',
  },
  value: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  unit: {
    fontSize: 16,
    fontWeight: 'normal',
    color: '#4F5B93', // Matching title color
  },
  statusDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginBottom: 8,
  },
  batteryBar: {
    width: '80%',
    height: 6,
    backgroundColor: '#DFE3F8', // Light blue background
    borderRadius: 12,
    marginTop: 12,
    overflow: 'hidden',
  },
  batteryFill: {
    height: '100%',
    borderRadius: 12,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
    width: '100%',
  },
  controlButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 16,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E0E7FF', // Light indigo
    borderWidth: 0,
    shadowColor: '#6366F1',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    maxWidth: 80,
    marginHorizontal: 4,
  },
  activeButton: {
    backgroundColor: '#6366F1', // Indigo for active state (matching tab bar)
  },
  buttonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#4F5B93', // Blueish-gray
  },
  activeButtonText: {
    color: '#ffffff',
  },
});

export default Blynk2;