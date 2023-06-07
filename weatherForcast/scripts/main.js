window.onload = init;
function init() {
  getCities();
  document.getElementById("city").addEventListener("change", getWetherForcast);
}

function getCities() {
  var citySelect = document.getElementById("city");

  for (var i = 0; i < cityArray.length; i++) {
    var option = document.createElement("option");
    option.value = cityArray[i].name;
    option.text = cityArray[i].name;
    citySelect.appendChild(option);
  }
}

function getWetherForcast(e) {
  let searchValue = document.getElementById("city").value;

  if (searchValue) {
    var result = cityArray.filter((obj) => {
      return obj.name === searchValue;
    });

    fetchForcastURL(result);
  }
}

function fetchForcastURL(city) {
  let url =
    "https://api.weather.gov/points/" +
    city[0].latitude +
    "," +
    city[0].longitude;

  fetch(url)
    .then(function (response) {
      return response.json();
    })
    .then(function (response) {
      fetchWetherForcast(response);
    });
}

function fetchWetherForcast(request) {
  fetch(request.properties.forecast)
    .then(function (response) {
      return response.json();
    })
    .then(function (response) {
      console.log(response);

      var resultContainer = document.getElementById("resultContainer");
      resultContainer.innerHTML = "";

      // Create the table element
      var table = document.createElement("table");
      table.role = "grid";

      // Create the table header
      var thead = document.createElement("thead");
      var headerRow = document.createElement("tr");

      var tableHeading = ["Day", "Temprature", "Detailed Forecast"];

      tableHeading.forEach((element) => {
        var th = document.createElement("th");
        th.textContent = element;
        headerRow.appendChild(th);
      });

      thead.appendChild(headerRow);
      table.appendChild(thead);

      // Create the table body
      var tbody = document.createElement("tbody");

      // add filtered data to table td
      response.properties.periods.forEach(function (obj) {
        var row = document.createElement("tr");

        var cell = document.createElement("td");
        cell.textContent = obj.name;
        row.appendChild(cell);

        var cell = document.createElement("td");
        let cellValue =
          "Temprature  " +
          obj.temperature +
          " " +
          obj.temperatureUnit +
          " Wind  " +
          obj.windDirection +
          " " +
          obj.windSpeed;
        cell.textContent = cellValue;
        row.appendChild(cell);

        var cell = document.createElement("td");
        cell.textContent = obj.shortForecast;
        row.appendChild(cell);

        tbody.appendChild(row);
      });
      table.appendChild(tbody);

      resultContainer.appendChild(table);
    });
}
