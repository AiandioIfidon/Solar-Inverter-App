#include <Preferences.h>
#include <BLEDevice.h>
#include <BLEUtils.h>
#include <BLEServer.h>

#include "config.h"
#include "bleserver.h"
#include "wifi_connect.h"
#include "blynk.h"

/*
Imported variables through config header file. Variables are ;

#define BLYNK_TEMPLATE_ID ""
#define BLYNK_TEMPLATE_NAME ""

char ssid[64];
char pass[64];

//GPIO pin numbers.
const uint8_t Bluetooth_Button = 22; 
const int test_pin = 23;
uint8_t battery_percentage = 0;

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

  if (WiFi.status() == WL_CONNECTED){
  Serial.println("Successfully connected to ");
  Serial.println(g_ssid);
  Serial.println("IP address: ");
  Serial.println(WiFi.localIP());
  }

  Blynk.config(auth, "blynk.cloud", 80);
  Blynk.connect();
  timer.setInterval(3000L, battery_and_statusUpdater);
}


void loop() {
  if (digitalRead(Bluetooth_Button) == HIGH){
    Credentials_Change();
    esp_restart(); // restart needed to save in the flash storage.
  };

  getWiFiCredentials();
  
  Blynk.run();
  timer.run();
  delay(300);
}