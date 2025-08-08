const apiKey = "cd53fb0ddb12412b2e8739d8b1e7a41b";
const cityInput = document.getElementById("cityInput");
const weatherCard = document.getElementById("weatherCard");
const cityName = document.getElementById("cityName");
const weatherIcon = document.getElementById("weatherIcon");
const temperature = document.getElementById("temperature");
const condition = document.getElementById("condition");
const humidity = document.getElementById("humidity");
const windSpeed = document.getElementById("windSpeed");
const errorMsg = document.getElementById("errorMsg");

async function getWeather() {
  const city = cityInput.value.trim();
  if (!city) return;

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error("City not found");

    const data = await res.json();
    updateUI(data);
    errorMsg.textContent = "";
  } catch (error) {
    weatherCard.classList.add("hidden");
    errorMsg.textContent = error.message;
    document.body.style.backgroundImage = "url('assets/default.jpg')";
  }
}

function updateUI(data) {
  const { name, weather, main, wind } = data;

  cityName.textContent = name;
  temperature.textContent = `🌡️ ${main.temp}°C`;
  condition.textContent = `📍 ${weather[0].description}`;
  humidity.textContent = `💧 Humidity: ${main.humidity}%`;
  windSpeed.textContent = `💨 Wind Speed: ${wind.speed} km/h`;

  const icon = `https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`;
  weatherIcon.src = icon;
  weatherCard.classList.remove("hidden");

  const bgImage = getBackgroundImage(weather[0].main);
  document.body.style.backgroundImage = `url('assets/${bgImage}')`;
}

function getBackgroundImage(condition) {
  switch (condition.toLowerCase()) {
    case "clear":
      return "sunny.jpg";
    case "rain":
      return "rainy.jpg";
    case "clouds":
      return "cloudy.jpg";
    default:
      return "default.jpg";
  }
}

// Dark Mode Toggle
document.getElementById("darkModeToggle").addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
});
