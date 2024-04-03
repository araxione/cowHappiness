// Define variables to store environmental conditions and their ideal ranges
let temperature = 20; // Default temperature
let humidity = 50; // Default humidity
let co2 = 400; // Default CO2 level
let airflow = 0; // Default airflow
let systemStatus = false; // Default system status

// Function to update cow happiness based on environmental conditions
function updateCowHappiness() {
  // Define ideal ranges for environmental conditions
  const idealTemperature = 10; // Ideal temperature in degrees Celsius
  const idealHumidity = 50; // Ideal humidity in percentage
  const idealCO2Level = 400; // Ideal CO2 level in ppm

  // Calculate deviation from ideal ranges for each environmental condition
  const temperatureDeviation = Math.abs(temperature - idealTemperature);
  const humidityDeviation = Math.abs(humidity - idealHumidity);
  const co2Deviation = Math.abs(co2 - idealCO2Level);

  // Define happiness change rates based on deviations
  let temperatureHappinessChange =
    0.5 + (idealTemperature - temperatureDeviation) * 0.05;
  // let temperatureHappinessChange = 0.5 - temperatureDeviation * 0.1;
  let humidityHappinessChange =
    0.5 + (idealHumidity - humidityDeviation) * 0.001;
  let co2HappinessChange = 0.5 + (idealCO2Level - co2Deviation) * 0.002;

  // Calculate total happiness change rate
  // let totalHappinessChangeRate = temperatureHappinessChange;
  let totalHappinessChangeRate =
    temperatureHappinessChange + humidityHappinessChange + co2HappinessChange;

  // Ensure total happiness change rate is within bounds
  totalHappinessChangeRate = Math.max(
    Math.min(totalHappinessChangeRate, 1),
    -1
  );

  // Update cow happiness index
  let currentCowHappiness = parseFloat(
    document.getElementById("cow-happiness").textContent
  );
  currentCowHappiness -= totalHappinessChangeRate;

  // Ensure cow happiness stays within 0% and 100%
  currentCowHappiness = Math.max(Math.min(currentCowHappiness, 100), 0);

  // Round cow happiness to the nearest integer
  currentCowHappiness = Math.round(currentCowHappiness);

  // Update cow happiness element
  document.getElementById("cow-happiness").textContent = currentCowHappiness;
}

// Function to update environmental conditions based on airflow and system status
function updateEnvironmentalConditions() {
  // Define ideal ranges for environmental conditions
  const idealTemperature = 10; // Ideal temperature in degrees Celsius
  const idealHumidity = 50; // Ideal humidity in percentage
  const idealCO2Level = 400; // Ideal CO2 level in ppm

  // Calculate temperature change rate based on airflow and system status
  let temperatureChangeRate = 0;
  // if (systemStatus) {
  temperatureChangeRate = 0.2 - 0.01 * airflow;
  // }

  // Calculate humidity change rate based on airflow and system status
  let humidityChangeRate = 0;
  // if (systemStatus) {
  humidityChangeRate = 0.2 - 0.01 * airflow;
  // }

  // Calculate CO2 level change rate based on airflow and system status
  let co2ChangeRate = 0;
  // if (systemStatus) {
  co2ChangeRate = 0.2 - 0.1 * airflow;
  // }

  // Update temperature based on change rate (if system is on)
  temperature += temperatureChangeRate;
  temperature = Math.max(Math.min(temperature, 30), 0); // Limit temperature between 0°C and 30°C

  // Update humidity based on change rate (if system is on)
  humidity += humidityChangeRate;
  humidity = Math.max(Math.min(humidity, 100), 0); // Limit humidity between 0% and 100%

  // Update CO2 level based on change rate (if system is on)
  co2 += co2ChangeRate;
  co2 = Math.max(Math.min(co2, 1000), 0); // Limit CO2 level between 0 ppm and 1000 ppm

  updateUI();

  // Update cow happiness based on environmental conditions
  updateCowHappiness();
}

function updateUI() {
  // Update environmental condition elements in HTML
  document.getElementById("temperature").textContent =
    temperature.toFixed(1) + "°C";
  document.getElementById("humidity").textContent = Math.round(humidity) + "%";
  document.getElementById("co2").textContent = Math.round(co2) + "ppm";
}

// Event listener for toggle switch
document.getElementById("toggle-icon").addEventListener("click", function () {
  // Toggle system status between ON and OFF
  systemStatus = !systemStatus;
  // Update status text based on system status
  document.getElementById("status-text").textContent = systemStatus
    ? "ON"
    : "OFF";
  // Update airflow slider disabled attribute based on system status
  document.getElementById("airflow-slider").disabled = !systemStatus;
  if (!systemStatus) {
    // If the system is turned OFF, reset airflow to 0
    airflow = 0;
  }
});
// Update environmental conditions with airflow 0
updateEnvironmentalConditions();

// Event listener for airflow slider
document
  .getElementById("airflow-slider")
  .addEventListener("input", function () {
    // Update airflow value
    airflow = parseInt(this.value);
    // Display the current airflow value on the screen
    document.getElementById("airflow").textContent = airflow + " L/s"; // Update airflow value display
    // Update environmental conditions with the new airflow value
    // updateEnvironmentalConditions();
  });

// Function to simulate time passing
function simulateTime() {
  // Update environmental conditions
  updateEnvironmentalConditions();

  // Update UI to reflect changes
  updateUI();

  // Repeat simulation for every second
  setTimeout(simulateTime, 1000);
}
// Initialize simulation
simulateTime();
