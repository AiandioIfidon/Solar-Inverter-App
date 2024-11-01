#ifndef BLYNK_TEMPLATE_ID

#define BLYNK_TEMPLATE_ID "TMPL2qmaW4p6H"
#define BLYNK_TEMPLATE_NAME "Led blink test"

// Constants
constexpr char DEVICE_NAME[] = "Solar_Inverter";
constexpr char PREF_NAMESPACE[] = "wifi_creds";
constexpr size_t MAX_CREDENTIAL_LENGTH = 65;  // Increased for safety

// UUIDs
constexpr char SERVICE_UUID[] = "853f29b2-f5ed-4b69-b4c6-9cd68a9fc2b0";
constexpr char SSID_UUID[] = "b72b9432-25f9-4c7f-96cb-fcb8efde84fd";
constexpr char PASSPHRASE_UUID[] = "7c8451c7-7909-47ef-b072-35d24729b8aa";


const PROGMEM char auth[] = "Cka-31Akppx-UNnQUQQ5f5Bea6IVf1Kd";

// Global variables with safer size
char g_ssid[MAX_CREDENTIAL_LENGTH] = {0}; 
char g_passphrase[MAX_CREDENTIAL_LENGTH] = {0};

#endif