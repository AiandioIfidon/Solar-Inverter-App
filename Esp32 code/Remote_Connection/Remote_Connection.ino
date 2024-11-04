#include "config.h"

#include <WiFiClient.h>
#include <BlynkSimpleEsp32.h>

/*  Inside config.h

    Its important that these Blynk parameters are defined before including BlynkSimpleEsp32 or it will not compile
#define BLYNK_TEMPLATE_ID ""
#define BLYNK_TEMPLATE_NAME ""

    These can be initialized anywhere before void setup()
char auth[] = "";

String ssid_string = "";
char ssid[15]; // Name of wifi network you want to connext to
char pass[] = ""; // Password of wifi network you want to
*/

uint8_t test_pin = 13;
uint8_t battery_percentage = 0;

BlynkTimer timer;

void battery_and_statusUpdater(){
  delay(3000);
  battery_percentage++;
  if(battery_percentage > 100){
    Serial.println("Battery percentage exceeds 100!");
    battery_percentage = 0;
    return;
  }
  Blynk.virtualWrite(V1, battery_percentage);
  Blynk.virtualWrite(V2, "Online");
  Serial.println("Updated Battery percentage and Online Status");
}

void setup()
{
  pinMode(test_pin, OUTPUT);
  Serial.begin(115200);
  Blynk.begin(auth, ssid, pass, "blynk.cloud", 80);
  timer.setInterval(3000L, battery_and_statusUpdater); // Waits 3 seconds before it performs the function battery_and_statusUp
}

BLYNK_WRITE(V0)
{
  if(param.asInt() == 1)
  {
    digitalWrite(test_pin, HIGH);
    Serial.println("Turning on Solar Inverter");
  } else if (param.asInt() == 0 ){
    digitalWrite(test_pin, LOW);
    Serial.println("Turning off Solar Inverter");
  } else {
    Serial.println("V0 is buggy");
  }
}

void loop()
{
  Blynk.run();
  timer.run();
}