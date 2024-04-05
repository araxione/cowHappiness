let temperature = 20;
let humidity = 50;
let co2 = 400;
let airflow = 0;
let heating = 0;
let systemStatus = true;
let temperatureAlertDisplayed = false;
let temperatureAlertElement = null;

// Function to update cow happiness based on environmental conditions
function updateCowHappiness() {
  const idealTemperature = 10;
  const idealHumidity = 50;
  const idealCO2Level = 400;

  // Calculate deviation from ideal ranges for each environmental condition
  const temperatureDeviation = Math.abs(temperature - idealTemperature);
  const humidityDeviation = Math.abs(humidity - idealHumidity);
  const co2Deviation = Math.abs(co2 - idealCO2Level);

  // Define happiness change rates based on deviations
  let temperatureHappinessChange =
    0.5 + (idealTemperature - temperatureDeviation) * 0.05;
  let humidityHappinessChange =
    0.5 + (idealHumidity - humidityDeviation) * 0.001;
  let co2HappinessChange = 0.5 + (idealCO2Level - co2Deviation) * 0.002;

  // Calculate total happiness change rate
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

// Function to remove temperature alert
function removeTemperatureAlert() {
  temperatureAlertElement.remove();

  temperatureAlertDisplayed = false;
  temperatureAlertElement = null;
}

// Function to update environmental conditions based on airflow and system status
function updateEnvironmentalConditions() {
  // Define ideal ranges for environmental conditions
  const idealTemperature = 10; // Ideal temperature in degrees Celsius
  const idealHumidity = 50; // Ideal humidity in percentage
  const idealCO2Level = 400; // Ideal CO2 level in ppm

  const exceedTemp = 22;

  // Calculate temperature change rate based on airflow & heating and system status
  let temperatureChangeRate = 0;
  temperatureChangeRate = 0.2 - 0.01 * airflow + 0.01 * heating;

  // Calculate humidity change rate based on airflow and system status
  let humidityChangeRate = 0;
  humidityChangeRate = 0.2 - 0.01 * airflow;

  // Calculate CO2 level change rate based on airflow and system status
  let co2ChangeRate = 0;
  co2ChangeRate = 0.2 - 0.1 * airflow;

  temperature += temperatureChangeRate;
  temperature = Math.max(Math.min(temperature, 30), 0);

  humidity += humidityChangeRate;
  humidity = Math.max(Math.min(humidity, 100), 0);

  co2 += co2ChangeRate;
  co2 = Math.max(Math.min(co2, 1000), 0);

  // Check if sensor readings exceed predefined thresholds and generate alerts
  if (temperature > exceedTemp && !temperatureAlertDisplayed) {
    displayTemperatureAlert();
  } else if (temperature <= exceedTemp && temperatureAlertDisplayed) {
    removeTemperatureAlert();
  }

  updateUI();
  updateCowHappiness();
}

function updateUI() {
  document.getElementById("temperature").textContent =
    temperature.toFixed(1) + "°C";
  document.getElementById("humidity").textContent = Math.round(humidity) + "%";
  document.getElementById("co2").textContent = Math.round(co2) + "ppm";
}

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
  systemStatus = !systemStatus;
  document.getElementById("status-text").textContent = systemStatus
    ? "ON"
    : "OFF";
  document.getElementById("airflow-slider").disabled = !systemStatus;
  document.getElementById("heating-slider").disabled = !systemStatus;
  if (!systemStatus) {
    airflow = 0;
    heating = 0;
  }
  updateToggleIcon();

  displayNotification(
    `System status changed to ${systemStatus ? "ON" : "OFF"}`
  );
});

updateEnvironmentalConditions();

// Event listener for airflow slider
document
  .getElementById("airflow-slider")
  .addEventListener("input", function () {
    airflow = parseInt(this.value);
    document.getElementById("airflow").textContent = " " + airflow + " L/s"; // Update airflow value display
  });

// Event listener for heating slider
document
  .getElementById("heating-slider")
  .addEventListener("input", function () {
    heating = parseInt(this.value);
    document.getElementById("heating").textContent = " " + heating + " kW";
  });

// Function to simulate time passing
function simulateTime() {
  updateEnvironmentalConditions();

  updateUI();
  setTimeout(simulateTime, 1000);
}
// Initialize simulation
simulateTime();

let currentAlert = null;
// Function to display temperature alert
function displayTemperatureAlert() {
  const alertDiv = document.createElement("div");
  alertDiv.classList.add("alert");
  alertDiv.style.backgroundColor = "#FCEDEA";
  alertDiv.style.border = "1px solid #EB5757";

  const icon = document.createElement("span");
  icon.classList.add("material-symbols-outlined");
  icon.textContent = "error_outline";
  icon.style.color = "#EB5757";
  icon.style.marginRight = "10px";

  const messageDiv = document.createElement("div");
  messageDiv.classList.add("alert-message");
  messageDiv.textContent =
    "Temperature exceeded 22°C! Please increase airflow and/or decrease heating.";

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
  if (currentNotification) {
    currentNotification.remove();
  }

  // Create a new notification
  const notificationDiv = document.createElement("div");
  notificationDiv.classList.add("notification");

  const icon = document.createElement("span");
  icon.classList.add("material-symbols-outlined");
  icon.textContent = "notifications";

  const messageDiv = document.createElement("div");
  messageDiv.textContent = message;

  const closeButton = document.createElement("button");
  closeButton.classList.add("n-close-button");
  closeButton.innerHTML = "&times;";

  notificationDiv.appendChild(icon);
  notificationDiv.appendChild(messageDiv);
  notificationDiv.appendChild(closeButton);

  // Append notification to alerts container
  document.getElementById("alerts-container").appendChild(notificationDiv);

  // Hide notification after 4 seconds
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
