#include <Preferences.h>
#include <BLEDevice.h>
#include <BLEUtils.h>
#include <BLEServer.h>


#include "config.h"
#include "bleserver.h"
#include "wifi_connect.h"

/*
Imported variables through header file. Variables are ;

#define BLYNK_TEMPLATE_ID ""
#define BLYNK_TEMPLATE_NAME ""

constexpr char DEVICE_NAME[] = ""; // Bluetooth device name
constexpr char PREF_NAMESPACE[] = ""; // Namespace for preferences library
constexpr size_t MAX_CREDENTIAL_LENGTH = ;  // Maximum characters for BLE characteristics read from the app

const char auth[] = ""; // Blynk authentication token

// UUIDs
constexpr char SERVICE_UUID[] = ""; // UUIDs can be anything you want as far as they match on the mobile application
constexpr char SSID_UUID[] = "";
constexpr char PASSPHRASE_UUID[] = "";
*/



void setup() {
  Serial.begin(115200);
  while (!Serial) {
    delay(10);
  }
  pinMode(test_pin, OUTPUT);
  pinMode(Bluetooth_Button, INPUT);
  getWiFiCredentials();
  wifiConnect(g_ssid, g_password);
}


void loop() {
  if (digitalRead(Bluetooth_Button) == HIGH){
    Credentials_Change();

  };
  if (WiFi.status() == WL_CONNECTED){
    Serial.println("Successfully connected to ");
    Serial.println(g_ssid);
    Serial.println("IP address: ");
    Serial.println(WiFi.localIP());
  }
  
  getWiFiCredentials();

  
  digitalWrite(test_pin, HIGH);
  Serial.println("Relay is set and operation is running normally");
  delay(1000);
  digitalWrite(test_pin, LOW);
  Serial.println("set low now");
  delay(1000);
}