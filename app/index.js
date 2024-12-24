import React from 'react';
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Blynk2 from '@/components/Blynk2'
import BLEservice from '@/components/BLEservice'
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
      <Blynk2 />
    </View>
  );
}

function Settings() {
  return (
    <View>
      <BLEservice />
    </View>
  );
}

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer independent={true}>
      <Tab.Navigator>
        <Tab.Screen name="Cloud Control" component={Online} />
        <Tab.Screen name="Settings" component={Settings} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}