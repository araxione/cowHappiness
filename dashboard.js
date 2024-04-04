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
let barnCowHappiness = 90; // Set initial cow happiness for the barn
let milkingParlorCowHappiness = 80; // Set initial cow happiness for the milking parlor
let feedingAreaCowHappiness = 95;

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
    Math.round(barnCowHappiness);
  document.getElementById("milking-cow-happiness").textContent = Math.round(
    milkingParlorCowHappiness
  );
  document.getElementById("feeding-cow-happiness").textContent = Math.round(
    feedingAreaCowHappiness
  );

  // Change circle color based on cow happiness
  const barnCircle = document.querySelector(".barn-circle");
  const milkingCircle = document.querySelector(".milking-circle");
  const feedingCircle = document.querySelector(".feeding-circle");

  const barnDashArray = 2 * Math.PI * (barnCowHappiness / 100) * 36;
  const milkingDashArray = 2 * Math.PI * (milkingParlorCowHappiness / 100) * 36;
  const feedingDashArray = 2 * Math.PI * (feedingAreaCowHappiness / 100) * 36;

  barnCircle.style.strokeDasharray = `${barnDashArray} ${barnDashArray}`;
  milkingCircle.style.strokeDasharray = `${milkingDashArray} ${milkingDashArray}`;
  feedingCircle.style.strokeDasharray = `${feedingDashArray} ${feedingDashArray}`;

  barnCircle.style.stroke = getColor(barnCowHappiness);
  milkingCircle.style.stroke = getColor(milkingParlorCowHappiness);
  feedingCircle.style.stroke = getColor(feedingAreaCowHappiness);
}

function updateUI() {
  // Implement UI update if needed
  updateEnvironmentalConditions();
  updateCowHappiness();
}

function getColor(cowHappiness) {
  if (cowHappiness >= 80) {
    return "#6B7E2A"; // Green color for high happiness
  } else if (cowHappiness >= 50) {
    return "#F7C752"; // Orange color for moderate happiness
  } else {
    return "#e74c3c"; // Red color for low happiness
  }
}

function decreaseEnvironmentalConditionsAndCowHappiness() {
  // Decrease temperature, humidity, and CO2 values for the Barn
  barnTemperature -= 0.1;
  barnHumidity -= 0.5;
  barnCO2 -= 0.5;

  // Decrease temperature, humidity, and CO2 values for the Milking Parlor
  milkingParlorTemperature -= 0.1;
  milkingParlorHumidity -= 0.5;
  milkingParlorCO2 -= 0.5;

  // Decrease temperature, humidity, and CO2 values for the Feeding Area
  feedingAreaTemperature -= 0.1;
  feedingAreaHumidity -= 0.5;
  feedingAreaCO2 -= 0.5;

  // Decrease cow happiness by 1
  barnCowHappiness -= 1;
  milkingParlorCowHappiness -= 1;
  feedingAreaCowHappiness -= 1;

  barnCowHappiness = Math.max(barnCowHappiness, 0);
  milkingParlorCowHappiness = Math.max(milkingParlorCowHappiness, 0);
  feedingAreaCowHappiness = Math.max(feedingAreaCowHappiness, 0);
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
