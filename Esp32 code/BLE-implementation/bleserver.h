#ifdef BLYNK_TEMPLATE_ID

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


#endif