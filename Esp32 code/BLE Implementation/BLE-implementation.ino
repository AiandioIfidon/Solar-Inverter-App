#include <Preferences.h>
#include <BLEDevice.h>
#include <BLEUtils.h>
#include <BLEServer.h>
#include <pgmspace.h>

#include "config.h"
#include "bleserver.h"
#include "flash_storage.h"

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

const uint8_t Bluetooth_Button = 2;

void setup() {
  Serial.begin(115200);
  pinMode(4, OUTPUT);
  pinMode(Bluetooth_Button, INPUT);
    while (!Serial) {
      delay(10);
    }
}


void loop() {
  if (digitalRead(Bluetooth_Button) == HIGH){
    Credentials_Change();
  };
  
  getWiFiCredentials();
  String ss = String(g_ssid);
  Serial.println("SSID : ");
  Serial.print(ss);
  String pp = String(g_passphrase);
  Serial.println("Passphrase : \n");
  Serial.print(pp);

  digitalWrite(4, LOW);
  delay(3000);
  Serial.println("Waiting");
  digitalWrite(4, HIGH);
  delay(3000);
}