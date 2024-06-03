function run() {
  const location = document.querySelector("#suchfeld").value;

  const options = {
    method: "GET",
  };

  fetch(
    `https://cors.bbz.cloud/api.content.tripadvisor.com:443/api/v1/location/search?searchQuery=${location}&key=7403A2F14821423C901207060F9DFAD4`,
    options
  )
    .then((response) => response.json())
    .then((response) => {
      console.log("Locations", response);
      renderTo(response, "location.mustache", "#grid-container");
      run2();
    })
    .catch((err) => console.error(err));
}

function run2() {
  const location2 = document.querySelector("#suchfeld").value;

  const options = {
    method: "GET",
    headers: { "User-Agent": "insomnia/9.2.0" },
  };

  fetch(
    `https://cors.bbz.cloud/http://api.openweathermap.org/data/2.5/weather?q=${location2}&appid=2e1551abe057c687623e1753c191a91b&units=metric`,
    options
  )
    .then((response) => response.json())
    .then((response) => {
      console.log("Here is the weather", response);
      const output = response.main.temp;
      console.log("The Temprerature is", output);
      renderTo(response, "weather.mustache", "#weather-container");
    })

    .catch((err) => console.error(err));

  // const weatherJson = weather.Response.json();
  // Datum umformatieren
  // weatherJson.date = new Date(weatherJson.dt * 1000).toLocaleDateString();
}
