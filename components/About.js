
import { Text, View, SafeAreaView, StyleSheet, TouchableOpacity, Linking, ScrollView } from "react-native";
import React from "react";
import { MaterialIcons, Feather, FontAwesome } from '@expo/vector-icons';

const About = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.card}>
        <View style={styles.headerSection}>
          <MaterialIcons name="info-outline" size={32} color="#6366F1" />
          <Text style={styles.headerTitle}>About this project</Text>
          <Text style={styles.subtitle}>Solar Inverter with remote monitoring and control capabilities</Text>
        </View>

        <View style={styles.infoSection}>
          <Text style={styles.sectionTitle}>Description</Text>
          <Text style={styles.description}>
            This application allows you to connect to control and monitor an Inverter remotely.
          </Text>
          <Text style={styles.description}>
            The device connect to a WiFi network to get internet access to recieve commands and send Inverter status data.
          </Text>
          <Text style={styles.description}>
            The WiFi network credentials can be updated using the 'Settings' tab on the buttom navigation bar. For updating WiFi credentials, close proximity of about 3 meters is needed.
          </Text>
        </View>
        <View style={styles.infoSection}>
            <Text style={styles.sectionTitle}>Contributors</Text>
            <Text style={[styles.description, {fontWeight: 'bold'}]}>Project Students:</Text>
              <Text style={styles.description}>
                {"     Ifidon Okpaise Daniel\n     Ukponmwan Osaruese Edmund\n     Obiasor Sean Ebube"}
              </Text>
              <Text style={[styles.description, {fontWeight: 'bold'}]}>Project Supervisor:</Text>
            <Text style={styles.description}>{"     Dr. Engr. (Mrs) Oduware Okosun"}</Text>
        </View>
        <View style={styles.infoSection}>
          <Text style={styles.sectionTitle}>Features</Text>
          <View style={styles.featureItem}>
            <MaterialIcons name="bluetooth-searching" size={20} color="#6366F1" />
            <Text style={styles.featureText}>Bluetooth Low Energy (BLE) connectivity</Text>
          </View>
          <View style={styles.featureItem}>
            <MaterialIcons name="wifi" size={20} color="#6366F1" />
            <Text style={styles.featureText}>WiFi network configuration</Text>
          </View>
          <View style={styles.featureItem}>
            <MaterialIcons name="security" size={20} color="#6366F1" />
            <Text style={styles.featureText}>Secure credential transmission</Text>
          </View>
        </View>

        <View style={styles.infoSection}>
          <Text style={styles.sectionTitle}>Project Resources</Text>
          
          <TouchableOpacity 
            style={styles.linkButton}
            onPress={() => Linking.openURL('https://github.com/AiandioIfidon/Esp32_Solar_Inverter_Firmware')}
          >
            <FontAwesome name="github" size={24} color="#4F5B93" />
            <Text style={styles.linkText}>GitHub(firmware):</Text>
            <Text style={styles.linkUrl}>github.com</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.linkButton}
            onPress={() => Linking.openURL('https://github.com/AiandioIfidon/Solar-Inverter-App')}
          >
            <FontAwesome name="github" size={24} color="#4F5B93" />
            <Text style={styles.linkText}>GitHub(mobile app):</Text>
            <Text style={styles.linkUrl}>github.com</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.linkButton}
            onPress={() => Linking.openURL('https://youtube.com/shorts/2UlewYKunXE?si=PrxYGDKusTLS_UEp')}
          >
            <FontAwesome name="youtube-play" size={24} color="#4F5B93" />
            <Text style={styles.linkText}>YouTube:</Text>
            <Text style={styles.linkUrl}>youtube.com</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.infoSection}>
          <Text style={styles.sectionTitle}>Connect</Text>
          
          <TouchableOpacity 
            style={styles.linkButton}
            onPress={() => Linking.openURL('https://github.com/AiandioIfidon')}
          >
            <FontAwesome name="github" size={24} color="#4F5B93" />
            <Text style={styles.linkText}>GitHub:</Text>
            <Text style={styles.linkUrl}>github.com/AiandioIfidon</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.linkButton}
            onPress={() => Linking.openURL('https://www.youtube.com/@aiand_ifidon')}
          >
            <FontAwesome name="youtube-play" size={24} color="#4F5B93" />
            <Text style={styles.linkText}>YouTube:</Text>
            <Text style={styles.linkUrl}>youtube.com/@aiand_ifidon</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.linkButton}
            onPress={() => Linking.openURL('mailto:okpaise6@gmail.com')}
          >
            <FontAwesome name="envelope" size={24} color="#4F5B93" />
            <Text style={styles.linkText}>Email:</Text>
            <Text style={styles.linkUrl}>okpaise6@gmail.com</Text>
          </TouchableOpacity>

        </View>

        <View style={styles.footerSection}>
          <Text style={styles.version}>Version 1.0.0</Text>
          <Text style={styles.copyright}>© 2025 All Rights Reserved</Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#EEF2FF',
    padding: 16,
  },
  card: {
    backgroundColor: '#F8FAFF',
    borderRadius: 20,
    padding: 24,
    shadowColor: '#6366F1',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.12,
    shadowRadius: 10,
    elevation: 4,
    marginBottom: 16,
  },
  headerSection: {
    alignItems: 'center',
    paddingBottom: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#DFE3F8',
    marginBottom: 4,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#4F5B93',
    marginTop: 12,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#64748b',
    marginBottom: 8,
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
  description: {
    fontSize: 15,
    lineHeight: 22,
    color: '#64748b',
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  featureText: {
    fontSize: 15,
    color: '#64748b',
    marginLeft: 12,
  },
  linkButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F1F5FF',
    borderRadius: 16,
    padding: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#DFE3F8',
  },
  linkText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#4F5B93',
    marginLeft: 12,
    marginRight: 6,
  },
  linkUrl: {
    fontSize: 15,
    color: '#6366F1',
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
  numberText: {
    color: '#ffffff',
    fontWeight: '600',
  },
  instructionText: {
    fontSize: 15,
    color: '#64748b',
    flex: 1,
  },
  footerSection: {
    alignItems: 'center',
    marginTop: 12,
  },
  version: {
    fontSize: 14,
    color: '#94a3b8',
    marginBottom: 4,
  },
  copyright: {
    fontSize: 14,
    color: '#94a3b8',
  },
});

export default About;