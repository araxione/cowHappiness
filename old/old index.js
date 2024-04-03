//Function to create the initial bar chart
// function createBarChart() {
//   const svgWidth = 500;
//   const svgHeight = 300;

//   const svg = d3
//     .select(".cow-happiness-chart")
//     .append("svg")
//     .attr("width", svgWidth)
//     .attr("height", svgHeight);

//   const margin = { top: 20, right: 20, bottom: 30, left: 40 };
//   width = svgWidth - margin.left - margin.right;
//   height = svgHeight - margin.top - margin.bottom;

//   x = d3
//     .scaleBand()
//     .range([0, width])
//     .padding(0.1)
//     .domain(data.map((_, i) => `Cow ${i + 1}`));

//   y = d3.scaleLinear().range([height, 0]).domain([0, 100]);

//   const g = svg
//     .append("g")
//     .attr("transform", `translate(${margin.left},${margin.top})`);

//   g.append("g")
//     .attr("class", "axis axis-x")
//     .attr("transform", `translate(0, ${height})`)
//     .call(d3.axisBottom(x));

//   g.append("g").attr("class", "axis axis-y").call(d3.axisLeft(y).ticks(10));

//   const colorScale = d3
//     .scaleLinear()
//     .domain([0, 100])
//     .range(["#EB5757", "#F7C752", "#6B7E2A"]);

//   g.selectAll(".bar")
//     .data(data)
//     .enter()
//     .append("rect")
//     .attr("class", "bar")
//     .attr("x", (_, i) => x(`Cow ${i + 1}`))
//     .attr("y", (d) => y(d))
//     .attr("width", x.bandwidth())
//     .attr("height", (d) => height - y(d))
//     .attr("fill", (d) => colorScale(d));

// Update average happiness index
// updateAverageHappiness(data);
// }

// // Function to update the bar chart with new data based on cow happiness
// function updateBarChartWithHappiness(happiness) {
//   const averageHappinessPerCow = happiness / 10;
//   const data = Array.from({ length: 10 }, () => averageHappinessPerCow);
//   createBarChart(data);
// }

// // Update bar chart with initial cow happiness
// updateBarChartWithHappiness(
//   parseFloat(document.getElementById("cow-happiness").textContent)
// );
// Declare variables for scales and dimensions outside of the functions
/*let x, y, width, height;

// Function to create the initial bar chart
function createBarChart(data) {
  const svgWidth = 500;
  const svgHeight = 300;

  const svg = d3
    .select("#cow-happiness-chart")
    .append("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight);

  const margin = { top: 20, right: 20, bottom: 30, left: 40 };
  width = svgWidth - margin.left - margin.right;
  height = svgHeight - margin.top - margin.bottom;

  x = d3
    .scaleBand()
    .range([0, width])
    .padding(0.1)
    .domain(data.map((_, i) => `Cow ${i + 1}`));

  y = d3.scaleLinear().range([height, 0]).domain([0, 100]);

  const g = svg
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

  g.append("g")
    .attr("class", "axis axis-x")
    .attr("transform", `translate(0, ${height})`)
    .call(d3.axisBottom(x));

  g.append("g").attr("class", "axis axis-y").call(d3.axisLeft(y).ticks(10));

  const colorScale = d3
    .scaleLinear()
    .domain([0, 100])
    .range(["#EB5757", "#F7C752", "#6B7E2A"]);

  g.selectAll(".bar")
    .data(data)
    .enter()
    .append("rect")
    .attr("class", "bar")
    .attr("x", (_, i) => x(`Cow ${i + 1}`))
    .attr("y", (d) => y(d))
    .attr("width", x.bandwidth())
    .attr("height", (d) => height - y(d))
    .attr("fill", (d) => colorScale(d));

  // Update average happiness index
  updateAverageHappiness(currentCowHappiness);
}

// Function to calculate the average of cow happiness index
// function calculateAverage(data) {
//   const sum = data.reduce((acc, curr) => acc + curr, 0);
//   return Math.round(sum / data.length); // Round to the nearest integer
// }

// Function to update the average cow happiness index displayed on the dashboard
function updateAverageHappiness(currentCowHappiness) {
  const average = currentCowHappiness;
  // const averageElement = document.querySelector(".number p");
  // averageElement.textContent = average; // Display average as an integer

  // Update circle color based on happiness index range
  const circle = document.querySelector(".barn-circle");
  if (average < 50) {
    circle.style.stroke = "#EB5757";
  } else if (average >= 50 && average < 80) {
    circle.style.stroke = "#F7C752";
  } else {
    circle.style.stroke = "#6B7E2A";
  }
}

// Function to update the bar chart with new data
function updateBarChart(data) {
  // Update bars with new data and color based on happiness index range
  d3.select("#cow-happiness-chart")
    .selectAll(".bar")
    .data(data)
    .attr("y", (d) => y(d))
    .attr("height", (d) => height - y(d))
    .attr("fill", (d) => {
      if (d < 50) {
        return "#EB5757";
      } else if (d >= 50 && d < 80) {
        return "#F7C752";
      } else {
        return "#6B7E2A";
      }
    });

  // Update average happiness index
  updateAverageHappiness(currentCowHappiness);
}

// Function to generate mock data for cow happiness index based on the desired average
function generateMockData(averageHappiness) {
  const numberOfCows = 10;
  const happinessPerCow = averageHappiness;
  const data = Array.from({ length: numberOfCows }, () => happinessPerCow);
  // Adjust the last cow's happiness to ensure the sum is equal to the desired average
  const remainder = averageHappiness - happinessPerCow * numberOfCows;
  data[numberOfCows - 1] += remainder;
  return data;
}

// Function to continuously update the data (simulate real-time behavior)
// function updateDataPeriodically() {
//   setInterval(() => {
//     const newData = generateMockData(currentCowHappiness); // Example average happiness level
//     updateBarChart(newData);
//   }, 5000); // Update every 5 seconds
// }

// Call functions to initialize and continuously update data
createBarChart(generateMockData(currentCowHappiness));
// updateDataPeriodically();

/* Call function to create historical chart
createHistoricalChart("today"); // Pass "today" as initial filter

// Function to create historical chart
function createHistoricalChart(filter) {
  const svgWidth = 500;
  const svgHeight = 300;

  const svg = d3
    .select("#historical-chart")
    .append("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight);

  const margin = { top: 20, right: 20, bottom: 30, left: 40 };
  const width = svgWidth - margin.left - margin.right;
  const height = svgHeight - margin.top - margin.bottom;

  const g = svg
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

  // Define scales and axes
  const x = d3.scaleBand().range([0, width]);
  const y = d3.scaleLinear().range([height, 0]);

  const xAxis = d3.axisBottom(x);
  const yAxis = d3.axisLeft(y).ticks(5);

  // Append axes
  g.append("g")
    .attr("class", "axis axis-x")
    .attr("transform", `translate(0, ${height})`)
    .call(xAxis);
  g.append("g").attr("class", "axis axis-y").call(yAxis);

  // Define line generator
  const line = d3
    .line()
    .x((_, i) => x(i))
    .y((d) => y(d));

  // Function to generate mock data for historical cow happiness index
  function generateMockHistoricalData(filter) {
    const data = [];
    let numDataPoints;

    // Generate mock data based on the selected filter
    if (filter === "today") {
      numDataPoints = 6; // Number of data points for "today"
    } else if (filter === "month") {
      numDataPoints = 12; // Number of data points for "month"
    } else if (filter === "year") {
      numDataPoints = 5; // Number of data points for "year"
    }

    // Generate mock data
    for (let i = 0; i < numDataPoints; i++) {
      const happinessIndex = Math.floor(Math.random() * 100);
      data.push(happinessIndex);
    }

    return data;
  }

  // Update chart based on filter
  function updateChart(filter) {
    const data = generateMockHistoricalData(filter);

    let xAxisLabel;
    let dataPoints;

    if (filter === "today") {
      xAxisLabel = "Time";
      dataPoints = ["12am", "4am", "8am", "12pm", "4pm", "8pm"]; // Time intervals
    } else if (filter === "month") {
      xAxisLabel = "Month";
      dataPoints = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];
    } else if (filter === "year") {
      xAxisLabel = "Year";
      dataPoints = ["2020", "2021", "2022", "2023", "2024"];
    }

    // Update x scale domain
    x.domain(dataPoints).padding(0.1);

    // Update x axis
    g.select(".axis-x").call(xAxis);

    // Update y scale domain
    y.domain([0, d3.max(data)]);

    // Update y axis
    g.select(".axis-y").call(yAxis);

    // Update chart title
    g.selectAll(".chart-title").remove();
    g.append("text")
      .attr("class", "chart-title")
      .attr("x", width / 2)
      .attr("y", -margin.top / 2)
      .attr("text-anchor", "middle")
      .text(`Historical Trend of Cow Happiness Index (${filter})`);

    // Update data and redraw line
    g.selectAll(".line").remove();
    g.append("path")
      .datum(data)
      .attr("class", "line")
      .attr("d", line)
      .attr("fill", "none") // No fill
      .attr("stroke", "black") // Line color
      .attr("stroke-width", 2); // Line width
  }

  // Initial update with "today" filter
  updateChart(filter);

  // Handle filter change
  d3.select("#filter-select").on("change", function () {
    const filter = d3.select(this).property("value");
    updateChart(filter);
  });
}*/
/*
function createBarChart() {
  const svgWidth = 500; // Width of the SVG element
  const svgHeight = 300; // Height of the SVG element

  // Select the SVG element
  d3.select("#cow-happiness-chart").selectAll("*").remove();

  const svg = d3
    .select("#cow-happiness-chart")
    .append("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight);

  // Set up scales for x and y axes
  const xScale = d3
    .scaleBand()
    .domain(d3.range(1, 11).map((i) => `Cow${i}`))
    .range([0, svgWidth])
    .padding(0.1);

  const yScale = d3.scaleLinear().domain([0, 100]).range([svgHeight, 0]);

  // Create x axis
  const xAxis = d3.axisBottom(xScale);

  // Create y axis
  const yAxis = d3.axisLeft(yScale);

  // Append x axis to SVG
  svg
    .append("g")
    .attr("class", "x-axis")
    .attr("transform", `translate(0, ${svgHeight})`)
    .call(xAxis)
    .append("text") // Append x-axis label
    .attr("x", svgWidth / 2)
    .attr("y", 40)
    .attr("text-anchor", "middle")
    .text("Cow Number");

  // Append y axis to SVG
  svg
    .append("g")
    .attr("class", "y-axis")
    .call(yAxis)
    .append("text") // Append y-axis label
    .attr("transform", "rotate(-90)")
    .attr("y", -40)
    .attr("x", -svgHeight / 2)
    .attr("dy", "1em")
    .attr("text-anchor", "middle")
    .text("Happiness Index (%)");
}
// Call the createBarChart function when the DOM is fully loaded
document.addEventListener("DOMContentLoaded", function () {
  createBarChart();
});*/

// Define variables to store environmental conditions and their ideal ranges
let temperature = 20; // Default temperature
let humidity = 50; // Default humidity
let co2 = 400; // Default CO2 level
let airflow = 0; // Default airflow
let systemStatus = false; // Default system status
let cowHappinessData = [];

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
  // Update cow happiness data array
  cowHappinessData.push(currentCowHappiness);
  if (cowHappinessData.length > 10) {
    cowHappinessData.shift(); // Keep only the latest 10 values
  }

  // createBarChart();

  // Update the bar chart
  updateBarChart();
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
    updateEnvironmentalConditions();
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

/* old
// Function to generate a random number for power consumption
function generateRandomPowerConsumption() {
  return Math.floor(Math.random() * 100); // Generate a random number between 0 and 100
}

// Function to update the parameters (temperature, humidity, CO2) based on airflow and power consumption
function updateParameters(airflow, powerConsumption) {
  // Generate random values for temperature, humidity, and CO2
  const temperature = Math.floor(Math.random() * 30) + 10; // Random temperature between 10°C and 40°C
  const humidity = Math.floor(Math.random() * 50) + 30; // Random humidity between 30% and 80%
  const co2 = Math.floor(Math.random() * 200) + 300; // Random CO2 between 300ppm and 500ppm

  // Update the values in the .parameters div
  document.getElementById("temperature").textContent = temperature + "°C";
  document.getElementById("humidity").textContent = humidity + "%";
  document.getElementById("co2").textContent = co2 + "ppm";
}
// Function to update metrics display
function updateMetrics() {
  // Update status display
  document.getElementById("status-text").textContent = systemStatus
    ? "ON"
    : "OFF";
  document.getElementById("toggle-icon").textContent = systemStatus
    ? "toggle_on"
    : "toggle_off";

  // Update slider and its appearance based on system status
  const airflowSlider = document.getElementById("airflow-slider");
  airflowSlider.disabled = !systemStatus; // Disable slider if system is off

  // Toggle class to change slider thumb color
  if (systemStatus) {
    airflowSlider.classList.add("active");
  } else {
    airflowSlider.classList.remove("active");
  }

  // Reset airflow to 0 when the system status is off
  if (!systemStatus) {
    airflow = 0;
    document.getElementById("airflow").textContent = airflow + " L/s";
    updateParameters(airflow, powerConsumption); // Update parameters when airflow changes
  }
}

// Adjust airflow when slider value changes
function adjustAirflow(value) {
  airflow = value;
  document.getElementById("airflow").textContent = airflow + " L/s";
  updateParameters(airflow, powerConsumption); // Update parameters when airflow changes
}

// Function to adjust power consumption when the value changes
function adjustPowerConsumption() {
  powerConsumption = generateRandomPowerConsumption();
  document.getElementById("power").textContent = powerConsumption + " kW";
  updateParameters(airflow, powerConsumption); // Update parameters when power consumption changes
}

// Toggle system status
function toggleSystem() {
  systemStatus = !systemStatus;
  updateMetrics();
}

// Event listener for toggle icon
document.getElementById("toggle-icon").addEventListener("click", toggleSystem);

// Event listener for airflow slider
document
  .getElementById("airflow-slider")
  .addEventListener("input", function () {
    adjustAirflow(this.value);
  });

// Event listener for power consumption control (you can place this wherever you want the event to be triggered)
document
  .getElementById("controls")
  .addEventListener("input", adjustPowerConsumption);

// Initial update of metrics and parameters
updateMetrics();
adjustAirflow(0); // Initialize with airflow value
adjustPowerConsumption(); // Initialize with power consumption value
*/
