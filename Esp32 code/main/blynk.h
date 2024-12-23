#ifdef BLYNK_TEMPLATE_ID

#include <BlynkSimpleEsp32.h>

BlynkTimer timer;

void battery_and_statusUpdater(){
  delay(2000);
  battery_percentage++;
  if(battery_percentage > 100){
    Serial.println("Battery percentage exceeds 100!");
    battery_percentage = 0;
    return;
  }
  Blynk.virtualWrite(V1, battery_percentage);
  Blynk.virtualWrite(V2, "Online");
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

#endif