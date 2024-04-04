// Define variables to store environmental conditions and their ideal ranges
let temperature = 20; // Default temperature
let humidity = 50; // Default humidity
let co2 = 400; // Default CO2 level
let airflow = 0; // Default airflow
let systemStatus = false; // Default system status
let temperatureAlertDisplayed = false;
// Reference to the temperature alert element
let temperatureAlertElement = null;

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

  // Get reference to the circle element
  const circle = document.querySelector(".barn-circle");
  const barnDashArray = 2 * Math.PI * (currentCowHappiness / 100) * 36;
  circle.style.strokeDasharray = `${barnDashArray} ${barnDashArray}`;

  // Change circle color based on cow happiness value
  if (currentCowHappiness >= 80) {
    circle.style.stroke = "#6B7E2A";
  } else if (currentCowHappiness >= 50) {
    circle.style.stroke = "#F7C752";
  } else {
    circle.style.stroke = "#EB5757";
  }
}

// Function to update environmental conditions based on airflow and system status
function updateEnvironmentalConditions() {
  // Define ideal ranges for environmental conditions
  const idealTemperature = 10; // Ideal temperature in degrees Celsius
  const idealHumidity = 50; // Ideal humidity in percentage
  const idealCO2Level = 400; // Ideal CO2 level in ppm

  const exceedTemp = 21;

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

  // Check if sensor readings exceed predefined thresholds and generate alerts
  if (temperature > exceedTemp && !temperatureAlertDisplayed) {
    // Display alert only if it's not already displayed
    displayTemperatureAlert();
  } else if (temperature <= exceedTemp && temperatureAlertDisplayed) {
    // Remove the alert only if it's currently displayed
    removeTemperatureAlert();
  }

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

// Get references to the elements representing system status and toggle icon
const statusText = document.getElementById("status-text");
const toggleIcon = document.getElementById("toggle-icon");

// Function to update toggle icon based on system status
function updateToggleIcon() {
  const status = statusText.textContent.trim().toUpperCase();
  if (status === "ON") {
    toggleIcon.innerHTML =
      '<span class="material-symbols-outlined" id="toggle_on">toggle_on</span>';
  } else {
    toggleIcon.innerHTML =
      '<span class="material-symbols-outlined" id="toggle_off">toggle_off</span>';
  }
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
  // Call the function initially to set the correct icon
  updateToggleIcon();

  displayNotification(
    `System status changed to ${systemStatus ? "ON" : "OFF"}`
  );
});
// Update environmental conditions with airflow 0
updateEnvironmentalConditions();

// Function to calculate power consumption based on airflow
function calculatePowerConsumption(airflow) {
  const basePowerConsumption = 0;
  const airflowMultiplier = 2;

  // Calculate power consumption based on airflow
  let powerConsumption = basePowerConsumption + airflow * airflowMultiplier;

  return powerConsumption;
}

// Event listener for airflow slider
document
  .getElementById("airflow-slider")
  .addEventListener("input", function () {
    const powerElement = document.getElementById("power");
    // Update airflow value
    airflow = parseInt(this.value);
    // Display the current airflow value on the screen
    document.getElementById("airflow").textContent = " " + airflow + " L/s"; // Update airflow value display
    // Update environmental conditions with the new airflow value
    // Calculate power consumption based on current airflow
    const currentPowerConsumption = calculatePowerConsumption(airflow);

    // Update power consumption element
    powerElement.textContent = currentPowerConsumption + " kW";
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

let currentAlert = null;
// Function to display temperature alert
function displayTemperatureAlert() {
  // Create the alert element
  const alertDiv = document.createElement("div");
  alertDiv.classList.add("alert");
  alertDiv.style.backgroundColor = "#FCEDEA";
  alertDiv.style.border = "1px solid #EB5757";

  // Create icon element
  const icon = document.createElement("span");
  icon.classList.add("material-symbols-outlined");
  icon.textContent = "error_outline";
  icon.style.color = "#EB5757";
  icon.style.marginRight = "10px";

  // Create message element
  const messageDiv = document.createElement("div");
  messageDiv.classList.add("alert-message");
  messageDiv.textContent =
    "Temperature exceeded predefined thresholds! Please move the airflow slider.";

  // Create close button
  const closeButton = document.createElement("button");
  closeButton.classList.add("close-button");
  closeButton.innerHTML = "&times;";

  // Append elements to the alert container
  alertDiv.appendChild(icon);
  alertDiv.appendChild(messageDiv);
  alertDiv.appendChild(closeButton);

  // Append the alert to the alerts container
  document.getElementById("alerts-container").appendChild(alertDiv);
  currentAlert = alertDiv;

  closeButton.addEventListener("click", () => {
    alertDiv.remove();
    currentAlert = null;
  });

  // Set a timeout to remove the alert after 4 seconds
  setTimeout(() => {
    alertDiv.remove();
    temperatureAlertDisplayed = false;
  }, 4000);

  // Update the flags
  temperatureAlertDisplayed = true;
  temperatureAlertElement = alertDiv;
}

// Global variable to store the reference to the current notification
let currentNotification = null;

// Function to display notifications
function displayNotification(message, status) {
  // Remove the current notification if it exists
  if (currentNotification) {
    currentNotification.remove();
  }

  // Create a new notification
  const notificationDiv = document.createElement("div");
  notificationDiv.classList.add("notification");

  // Create icon element
  const icon = document.createElement("span");
  icon.classList.add("material-symbols-outlined");
  icon.textContent = "notifications";

  // Create message element
  const messageDiv = document.createElement("div");
  messageDiv.textContent = message;

  // Create close button
  const closeButton = document.createElement("button");
  closeButton.classList.add("n-close-button");
  closeButton.innerHTML = "&times;";

  // Append elements to notification container
  notificationDiv.appendChild(icon);
  notificationDiv.appendChild(messageDiv);
  notificationDiv.appendChild(closeButton);

  // Append notification to alerts container
  document.getElementById("alerts-container").appendChild(notificationDiv);

  // Hide notification after 5 seconds
  setTimeout(() => {
    notificationDiv.remove();
  }, 4000);

  // Set the current notification to the new notification
  currentNotification = notificationDiv;

  // Close button event listener
  closeButton.addEventListener("click", () => {
    notificationDiv.remove();
    currentNotification = null; // Reset the current notification reference
  });
}
