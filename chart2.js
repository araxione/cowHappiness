document.addEventListener("DOMContentLoaded", function () {
  var ctxCowHappiness = document
    .getElementById("historical-cow-happiness-chart")
    .getContext("2d");

  // Define data for each filter option
  var dataToday = [80, 82, 85, 88, 90, 92]; // Fake data for today
  var dataMonth = [82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93]; // Fake data for month
  var dataYear = [85, 86, 87, 88, 89]; // Fake data for year

  // Initialize with today's data
  var selectedData = dataToday;
  var selectedLabels = ["12am", "4am", "8am", "12pm", "4pm", "8pm"];

  var cowHappinessChart = new Chart(ctxCowHappiness, {
    type: "line",
    data: {
      labels: selectedLabels,
      datasets: [
        {
          label: "Cow Happiness Index",
          data: selectedData,
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
          suggestedMax: 100, // Set y-axis max to 100 for cow happiness index
        },
      },
    },
  });

  // Update chart data based on selected filter option
  function updateChartData(selectedOption) {
    switch (selectedOption) {
      case "today":
        selectedData = dataToday;
        selectedLabels = ["12am", "4am", "8am", "12pm", "4pm", "8pm"];
        break;
      case "month":
        selectedData = dataMonth;
        selectedLabels = Array.from(
          {
            length: 12,
          },
          (_, i) => {
            return new Date(2000, i, 1).toLocaleString("en", {
              month: "short",
            });
          }
        );
        break;
      case "year":
        selectedData = dataYear;
        selectedLabels = ["2020", "2021", "2022", "2023", "2024"];
        break;
    }

    cowHappinessChart.data.labels = selectedLabels;
    cowHappinessChart.data.datasets[0].data = selectedData;
    cowHappinessChart.update();
  }

  // Event listener for dropdown change
  document
    .getElementById("cow-happiness-filter")
    .addEventListener("change", function (event) {
      var selectedOption = event.target.value;
      updateChartData(selectedOption);
    });
});
