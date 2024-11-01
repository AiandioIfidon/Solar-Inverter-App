#include <Preferences.h>
#include <BLEDevice.h>
#include <BLEUtils.h>
#include <BLEServer.h>
#include <WiFiClient.h>
#include <string>
#include <pgmspace.h>
#include "config.h"

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

Preferences preferences;

 void storeWiFiCredentials() {
    if (!preferences.begin(PREF_NAMESPACE, false)) {
        Serial.println(F("Failed to open preferences"));
        return;
    }
    preferences.putString("ssid", g_ssid);
    preferences.putString("password", g_passphrase);
    preferences.end();
    Serial.println("Successfully stored credentials");
    return;
}






 void getWiFiCredentials() {
    if (!preferences.begin(PREF_NAMESPACE, true)) {
        Serial.println(F("Failed to open preferences"));
        return;
    }
    
    String ssidString = preferences.getString("ssid", "");
    String passPhraseString = preferences.getString("password", "");
    
    if (ssidString.length() >= MAX_CREDENTIAL_LENGTH || 
        passPhraseString.length() >= MAX_CREDENTIAL_LENGTH) {
        Serial.println(F("Stored credentials too long"));
        preferences.end();
        return;
    }
    
    strncpy(g_ssid, ssidString.c_str(), MAX_CREDENTIAL_LENGTH - 1);
    strncpy(g_passphrase, passPhraseString.c_str(), MAX_CREDENTIAL_LENGTH - 1);
    g_ssid[MAX_CREDENTIAL_LENGTH - 1] = '\0';
    g_passphrase[MAX_CREDENTIAL_LENGTH - 1] = '\0';
    Serial.println("Successfully found wifi credentials");
    preferences.end();
    return;
}






class WiFiCredentialCallback: public BLECharacteristicCallbacks {
private:
    char* storage;
    const char* name;
    const size_t maxLength;

public:
    WiFiCredentialCallback(char* storage, const char* name, size_t maxLen) 
        : storage(storage), name(name), maxLength(maxLen) {}

    void onWrite(BLECharacteristic *pCharacteristic) override {
        String value = pCharacteristic->getValue();
        if (value.length() >= maxLength) {
            Serial.println(F("Error: Received value too long"));
            return;
        }
        
        strncpy(storage, value.c_str(), maxLength - 1);
        storage[maxLength - 1] = '\0';  // Ensure null termination
        
        Serial.print(name);
        Serial.print(F(" received: "));
        Serial.println(storage);
    }
};





void setupBLEServer() {
    BLEDevice::init(DEVICE_NAME);
    BLEServer *pServer = BLEDevice::createServer();
    if (!pServer) {
        Serial.println(F("Failed to create BLE server"));
        return;
    }

    BLEService *pService = pServer->createService(SERVICE_UUID);
    if (!pService) {
        Serial.println(F("Failed to create BLE service"));
        return;
    }

    BLECharacteristic *ssidChar = pService->createCharacteristic(
        SSID_UUID,
        BLECharacteristic::PROPERTY_READ | BLECharacteristic::PROPERTY_WRITE
    );
    BLECharacteristic *passChar = pService->createCharacteristic(
        PASSPHRASE_UUID,
        BLECharacteristic::PROPERTY_READ | BLECharacteristic::PROPERTY_WRITE
    );

    if (!ssidChar || !passChar) {
        Serial.println(F("Failed to create characteristics"));
        return;
    }

    ssidChar->setCallbacks(new WiFiCredentialCallback(g_ssid, "SSID", MAX_CREDENTIAL_LENGTH));
    passChar->setCallbacks(new WiFiCredentialCallback(g_passphrase, "PassPhrase", MAX_CREDENTIAL_LENGTH));

    pService->start();

    BLEAdvertising *pAdvertising = BLEDevice::getAdvertising();
    pAdvertising->addServiceUUID(SERVICE_UUID);
    pAdvertising->setScanResponse(true);
    pAdvertising->setMinPreferred(0x06);  // iPhone connection help
    pAdvertising->setMinPreferred(0x12);
    BLEDevice::startAdvertising();

    Serial.println(F("BLE server started successfully"));
    return;
}





void Credentials_Change() {
  setupBLEServer();
  g_passphrase[MAX_CREDENTIAL_LENGTH] = {0};
  g_ssid[MAX_CREDENTIAL_LENGTH] = {0};
  storeWiFiCredentials();
  while(g_ssid[0] == '\0' && g_passphrase[0] == '\0'){
    storeWiFiCredentials();
    getWiFiCredentials();
    Serial.println("\nStill waiting for changes");
    delay(3000);
  }
  Serial.println("Successfully changed wifi credentials");
}





void setuphandling(){
  // Open preferences in read-only mode
    preferences.begin(PREF_NAMESPACE, true);
    bool hasCredentials = preferences.isKey("ssid");
    preferences.end();

    if (!hasCredentials) {
      Serial.println(F("No stored credentials, starting BLE..."));
      Credentials_Change();
    } else {
        getWiFiCredentials();
        if (g_ssid[0] == '\0' && g_passphrase[0] == '\0'){
          Credentials_Change();
        }
      }
}


void setup() {
    Serial.begin(115200);
    pinMode(4, OUTPUT);
    pinMode(2, INPUT);
    while (!Serial) {
      delay(10);
    }
    
}

void loop() {
  if (digitalRead(2) == HIGH){
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
  delay(2000);
  Serial.println("Waiting");
  digitalWrite(4, HIGH);
  delay(6000);
}