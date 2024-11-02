#ifdef BLYNK_TEMPLATE_ID

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


#endif