const apiKey = "YOUR_OPENWEATHERMAP_API_KEY"; // Replace with your OpenWeatherMap API key
const searchButton = document.getElementById("search-btn");
const cityInput = document.getElementById("city-input");
const weatherInfoDiv = document.getElementById("weather-info");
const errorDiv = document.getElementById("error");

searchButton.addEventListener("click", () => {
  const city = cityInput.value;
  if (city) {
    fetchWeather(city);
  } else {
    alert("Please enter a city name.");
  }
});

async function fetchWeather(city) {
  try {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
    const data = await response.json();

    if (data.cod === "404") {
      weatherInfoDiv.style.display = "none";
      alert("City not found");
    } else {
      weatherInfoDiv.style.display = "block";
      displayWeather(data);
    }
  } catch (error) {
    console.error("Error fetching weather data:", error);
  }
}

function displayWeather(data) {
  const cityName = data.name;
  const temperature = data.main.temp;
  const description = data.weather[0].description;
  const humidity = data.main.humidity;
  const windSpeed = data.wind.speed;

  weatherInfoDiv.innerHTML = `
    <p><strong>${cityName}</strong></p>
    <p>Temperature: ${temperature}°C</p>
    <p>Description: ${description}</p>
    <p>Humidity: ${humidity}%</p>
    <p>Wind Speed: ${windSpeed} m/s</p>
  `;
}
