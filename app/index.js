import React from 'react';
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Bluetooth from '@/components/Bluetooth'
import Blynk from '@/components/Blynk'
import Wifi_local from '@/components/Wifi_local'

function Local() {
  return (
    <View>
      <Wifi_local />
    </View>
  );
}


function Online() {
  return (
    <View>
      <Blynk />
    </View>
  );
}

function Settings() {
  return (
    <View>
      <Bluetooth />
    </View>
  );
}

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer independent={true}>
      <Tab.Navigator>
        <Tab.Screen name="Settings" component={Settings} />
        <Tab.Screen name="Home" component={Local} />
        <Tab.Screen name="Online" component={Online} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}