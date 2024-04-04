// Variable Declarations
let barnTemperature = 20;
let barnHumidity = 50;
let barnCO2 = 400;
let milkingParlorTemperature = 20;
let milkingParlorHumidity = 50;
let milkingParlorCO2 = 400;
let feedingAreaTemperature = 20;
let feedingAreaHumidity = 50;
let feedingAreaCO2 = 400;
let cowHappiness = 50;

// Function Definitions
function updateEnvironmentalConditions() {
  // Implement environmental condition updates if needed
  document.getElementById("barn-temperature").textContent =
    barnTemperature.toFixed(1) + "°C";
  document.getElementById("barn-humidity").textContent =
    Math.round(barnHumidity) + "%";
  document.getElementById("barn-co2").textContent = Math.round(barnCO2) + "ppm";

  document.getElementById("milking-temperature").textContent =
    milkingParlorTemperature.toFixed(1) + "°C";
  document.getElementById("milking-humidity").textContent =
    Math.round(milkingParlorHumidity) + "%";
  document.getElementById("milking-co2").textContent =
    Math.round(milkingParlorCO2) + "ppm";

  document.getElementById("feeding-temperature").textContent =
    feedingAreaTemperature.toFixed(1) + "°C";
  document.getElementById("feeding-humidity").textContent =
    Math.round(feedingAreaHumidity) + "%";
  document.getElementById("feeding-co2").textContent =
    Math.round(feedingAreaCO2) + "ppm";
}

function updateCowHappiness() {
  // Implement cow happiness update if needed
  document.getElementById("barn-cow-happiness").textContent =
    Math.round(cowHappiness);
  document.getElementById("milking-cow-happiness").textContent =
    Math.round(cowHappiness);
  document.getElementById("feeding-cow-happiness").textContent =
    Math.round(cowHappiness);
}

function updateUI() {
  // Implement UI update if needed
  updateEnvironmentalConditions();
  updateCowHappiness();
}

function decreaseEnvironmentalConditionsAndCowHappiness() {
  // Decrease temperature, humidity, and CO2 values for the Barn
  barnTemperature -= 0.5;
  barnHumidity -= 0.5;
  barnCO2 -= 0.5;

  // Decrease temperature, humidity, and CO2 values for the Milking Parlor
  milkingParlorTemperature -= 0.5;
  milkingParlorHumidity -= 0.5;
  milkingParlorCO2 -= 0.5;

  // Decrease temperature, humidity, and CO2 values for the Feeding Area
  feedingAreaTemperature -= 0.5;
  feedingAreaHumidity -= 0.5;
  feedingAreaCO2 -= 0.5;

  // Decrease cow happiness by 1
  cowHappiness -= 1;
  cowHappiness = Math.max(cowHappiness, 0);
}

function simulateTime() {
  // Decrease environmental conditions and cow happiness
  decreaseEnvironmentalConditionsAndCowHappiness();

  // Update UI to reflect changes
  updateUI();

  // Repeat simulation for every second
  setTimeout(simulateTime, 1000);
}

// Initialize simulation
simulateTime();
