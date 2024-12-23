#ifdef BLYNK_TEMPLATE_ID

#include <WiFi.h>

void wifiConnect(String ssid, String password){
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED)
  {
    if (digitalRead(Bluetooth_Button) == HIGH){
    return;
    };
    delay(3000);
    Serial.println("Connecting to ");
    Serial.println(ssid);
  }

  Serial.println("Successfully connected to ");
  Serial.println(ssid);
  Serial.println("IP address: ");
  Serial.println(WiFi.localIP());
}

#endif