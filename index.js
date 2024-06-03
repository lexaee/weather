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
      response.data.forEach((element, index) => {

        fetch(
          `https://cors.bbz.cloud/api.content.tripadvisor.com:443/api/v1/location/${element.location_id}/photos?language=en&key=7403A2F14821423C901207060F9DFAD4`,
        )
          .then((response) => response.json())
          .then((response) => {
            
            const elements = document.querySelectorAll('#image-location');

            console.log(elements)

            // Iterate over the elements and modify them
            for (let i = 0; i < elements.length; i++) {
              if (i === index) {
                console.log(i, index)
                console.log(response)
                element.src = response.data[0].images.thumbnail.url;
              }
            }
          })
          .catch((err) => console.error(err));
      });
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
      const temperature = Math.round(response.main.temp);
      const output = Math.round(response.main.temp);
      console.log("The Temprerature is", output);
      response.main.temp = temperature;
      renderTo(response, "weather.mustache", "#weather-container");
    })

    .catch((err) => console.error(err));

  // const weatherJson = weather.Response.json();
  // Datum umformatieren
  // weatherJson.date = new Date(weatherJson.dt * 1000).toLocaleDateString();
}
