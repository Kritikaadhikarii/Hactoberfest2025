const apiKey = "YOUR_API_KEY"; // Replace with your actual API key
const apiBase = "https://api.openweathermap.org/data/2.5/weather";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");
const unitSwitch = document.getElementById('unitSwitch');

// Read preferred units from localStorage or default to metric
let units = localStorage.getItem('weather_units') || 'metric';
if (unitSwitch) unitSwitch.value = units;

async function checkWeather(city) {
  // Use selected units when querying the API
  const response = await fetch(`${apiBase}?q=${encodeURIComponent(city)}&units=${units}&appid=${apiKey}`);

  if (response.status === 404) {
    document.querySelector(".error").style.display = "block";
    document.querySelector(".weather").style.display = "none";
  } else {
    const data = await response.json();

    document.querySelector(".city").innerHTML = data.name;
  // Show the correct unit symbol
  const unitSymbol = units === 'metric' ? '°C' : '°F';
  document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + unitSymbol;
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
  // Wind speed unit: API returns meter/sec for metric and miles/hour for imperial
  const windText = units === 'metric' ? `${data.wind.speed} m/s` : `${data.wind.speed} mph`;
  document.querySelector(".wind").innerHTML = windText;

    if (data.weather[0].main === "Clouds") {
      weatherIcon.src = "images/clouds.png";
    } else if (data.weather[0].main === "Clear") {
      weatherIcon.src = "images/clear.png";
    } else if (data.weather[0].main === "Rain") {
      weatherIcon.src = "images/rain.png";
    } else if (data.weather[0].main === "Drizzle") {
      weatherIcon.src = "images/drizzle.png";
    } else if (data.weather[0].main === "Mist") {
      weatherIcon.src = "images/mist.png";
    }

    document.querySelector(".weather").style.display = "block";
    document.querySelector(".error").style.display = "none";
  }
}

searchBtn.addEventListener("click", () => {
  checkWeather(searchBox.value);
});

// When user changes units, save preference and refresh current city if present
if (unitSwitch) {
  unitSwitch.addEventListener('change', () => {
    units = unitSwitch.value;
    localStorage.setItem('weather_units', units);

    const currentCity = document.querySelector('.city').textContent;
    // If a city is displayed (not empty and not the placeholder), re-fetch
    if (currentCity && currentCity.trim().length > 0 && currentCity !== 'Bangalore') {
      checkWeather(currentCity);
    } else if (currentCity && currentCity.trim().length > 0) {
      // If example placeholder is present, just update displayed units by converting the temperature text
      convertDisplayedTempToCurrentUnits();
    }
  });
}

function convertDisplayedTempToCurrentUnits() {
  const tempEl = document.querySelector('.temp');
  if (!tempEl) return;
  const text = tempEl.textContent || '';
  const match = text.match(/(-?\d+)\s*°([CF])/i);
  if (!match) return;
  let value = parseInt(match[1], 10);
  const currentSymbol = match[2].toUpperCase();

  if (currentSymbol === 'C' && units === 'imperial') {
    // C -> F
    value = Math.round((value * 9) / 5 + 32);
  } else if (currentSymbol === 'F' && units === 'metric') {
    // F -> C
    value = Math.round(((value - 32) * 5) / 9);
  }

  const unitSymbol = units === 'metric' ? '°C' : '°F';
  tempEl.textContent = `${value}${unitSymbol}`;
}
