const searchButton = document.getElementById("search-button");
const searchInput = document.getElementById("search");
const weatherCard = document.getElementById("weather-card");

searchButton.addEventListener("click", () => {
    const city = searchInput.value;
    if (city.trim() === "") {
        alert("Please enter a city name.");
        return;
    }

    fetch(`https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={fdb409627a79adf1644ddaf02a98fc8e}
    `)
        .then((response) => response.json())
        .then((data) => {
            const temperature = Math.round(data.main.temp - 273.15); // Convert from Kelvin to Celsius
            const description = data.weather[0].description;
            const icon = data.weather[0].icon;

            const weatherInfo = `
                <h2>Weather in ${city}</h2>
                <p>${description}</p>
                <p>Temperature: ${temperature}&#8451;</p>
                <img src="http://openweathermap.org/img/w/${icon}.png" alt="${description}">
            `;

            weatherCard.innerHTML = weatherInfo;
        })
        .catch((error) => {
            console.error("Error fetching weather data:", error);
            alert("Could not fetch weather data. Please try again later.");
        });

    searchInput.value = "";
});
