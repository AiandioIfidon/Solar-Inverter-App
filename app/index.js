import React from 'react';
import { StyleSheet, Animated, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AntDesign from '@expo/vector-icons/AntDesign';
import Feather from '@expo/vector-icons/Feather';
import Blynk2 from '@/components/Blynk2'
import BLEservice from '@/components/BLEservice'
import Wifi_local from '@/components/Wifi_local'
import About from '@/components/About'

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
function Info() {
  return (
    <View>
      <About />
    </View>
  );
}

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer independent={true}>
      <Tab.Navigator 
       screenOptions={{
        tabBarStyle: styles.tabBar,
        tabBarLabelStyle: styles.tabLabel,
      }}>
        <Tab.Screen name="Cloud Control" component={Online} options={() => ({
          tabBarIcon: ({ focused }) => (
            <View style={styles.iconContainer}>
              <AntDesign name="wifi" size={24} color={ focused ? "brown" : "black"} />
            </View>
          )
        })
        } />
        <Tab.Screen name="Settings" component={Settings} options={() => ({
          tabBarIcon: ({ focused }) => (
            <View style={[styles.iconContainer, focused && styles.activeTab]}>
              <Feather name="settings" size={24} color={ focused ? "brown" : "black" } />
            </View>
          )
        })}/>
        <Tab.Screen name="About" component={Info} options={() => ({
          tabBarIcon: ({ focused }) => (
            <View style={[styles.iconContainer, focused && styles.activeTab]}>
             <AntDesign name="infocirlce" size={24} color= { focused ? "brown" : "black" }/>
            </View>
          )
        })}/>
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: '#EEF2FF',
    height: 70,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    borderTopWidth: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 10,
    paddingHorizontal: 10,
    paddingBottom: 8,
    paddingTop: 12,
  },
  tabLabel: {
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 3,
    color: '#444',
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -3,
  },
  activeTab: {
    backgroundColor: '#F0FFFF',
    borderRadius: 22,
    shadowColor: '#6366F1',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
  },
});