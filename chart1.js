document.addEventListener("DOMContentLoaded", function () {
  var ctxTemperature = document
    .getElementById("historical-temperature-chart")
    .getContext("2d");
  var ctxHumidity = document
    .getElementById("historical-humidity-chart")
    .getContext("2d");
  var ctxCO2 = document.getElementById("historical-co2-chart").getContext("2d");

  var dataToday = [10, 12, 15, 18, 20, 22]; // Fake data for today
  var dataMonth = [12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23]; // Fake data for month
  var dataYear = [15, 16, 17, 18, 19]; // Fake data for year

  var selectedData = dataToday;
  var selectedLabels = ["12am", "4am", "8am", "12pm", "4pm", "8pm"];

  var temperatureChart = new Chart(ctxTemperature, {
    type: "line",
    data: {
      labels: selectedLabels,
      datasets: [
        {
          label: "Temperature (°C)",
          data: selectedData,
          backgroundColor: "rgba(255, 99, 132, 0.2)",
          borderColor: "rgba(255, 99, 132, 1)",
          borderWidth: 1,
        },
      ],
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true,
          suggestedMax: 25, // Set y-axis max to 25
        },
      },
    },
  });

  var humidityChart = new Chart(ctxHumidity, {
    type: "line",
    data: {
      labels: selectedLabels,
      datasets: [
        {
          label: "Humidity (%)",
          data: selectedData, // Change this to the appropriate data
          backgroundColor: "rgba(54, 162, 235, 0.2)",
          borderColor: "rgba(54, 162, 235, 1)",
          borderWidth: 1,
        },
      ],
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true,
          suggestedMax: 100, // Set y-axis max to 100 for humidity
        },
      },
    },
  });

  var co2Chart = new Chart(ctxCO2, {
    type: "line",
    data: {
      labels: selectedLabels,
      datasets: [
        {
          label: "CO2 (ppm)",
          data: selectedData, // Change this to the appropriate data
          backgroundColor: "rgba(75, 192, 192, 0.2)",
          borderColor: "rgba(75, 192, 192, 1)",
          borderWidth: 1,
        },
      ],
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true,
          suggestedMax: 500, // Set y-axis max to 500 for CO2
        },
      },
    },
  });

  function updateChartData(selectedOption, chart) {
    switch (selectedOption) {
      case "today":
        selectedData = dataToday;
        selectedLabels = ["12am", "4am", "8am", "12pm", "4pm", "8pm"];
        break;
      case "month":
        selectedData = dataMonth;
        selectedLabels = Array.from({ length: 12 }, (_, i) => {
          return new Date(2000, i, 1).toLocaleString("en", { month: "short" });
        });
        break;
      case "year":
        selectedData = dataYear;
        selectedLabels = ["2020", "2021", "2022", "2023", "2024"];
        break;
    }

    chart.data.labels = selectedLabels;
    chart.data.datasets[0].data = selectedData;
    chart.update();
  }

  document
    .getElementById("filter-select-temperature")
    .addEventListener("change", function (event) {
      var selectedOption = event.target.value;
      updateChartData(selectedOption, temperatureChart);
    });

  document
    .getElementById("filter-select-humidity")
    .addEventListener("change", function (event) {
      var selectedOption = event.target.value;
      updateChartData(selectedOption, humidityChart);
    });

  document
    .getElementById("filter-select-co2")
    .addEventListener("change", function (event) {
      var selectedOption = event.target.value;
      updateChartData(selectedOption, co2Chart);
    });

  // document
  //   .getElementById("filter-select-environmental")
  //   .addEventListener("change", function (event) {
  //     var selectedOption = event.target.value;
  //     updateChartData(selectedOption, temperatureChart);
  //     updateChartData(selectedOption, humidityChart);
  //     updateChartData(selectedOption, co2Chart);
  //   });
});
