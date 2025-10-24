const apiKey = "YOUR_API_KEY"; // Replace with your actual API key
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");
const favoriteBtn = document.getElementById("favoriteBtn");

let currentCity = "";
let favorites = JSON.parse(localStorage.getItem("weatherFavorites") || "[]");
let recentSearches = JSON.parse(localStorage.getItem("weatherRecent") || "[]");

// Initialize the app
document.addEventListener("DOMContentLoaded", () => {
  updateQuickAccess();
});

async function checkWeather(city) {
  if (!city.trim()) {
    showError("Please enter a city name");
    return;
  }

  try {
    const response = await fetch(`${apiUrl}${city}&appid=${apiKey}`);
    
    if (response.status === 404) {
      showError("City not found. Please check the spelling and try again.");
    } else if (!response.ok) {
      showError("Unable to fetch weather data. Please try again later.");
    } else {
      const data = await response.json();
      displayWeather(data);
      addToRecentSearches(data.name);
      currentCity = data.name;
      updateFavoriteButton();
    }
  } catch (error) {
    showError("Network error. Please check your internet connection and try again.");
  }
}

function showError(message) {
  document.querySelector(".error").innerHTML = message;
  document.querySelector(".error").style.display = "block";
  document.querySelector(".weather").style.display = "none";
}

function displayWeather(data) {
  document.querySelector(".city").innerHTML = data.name;
  document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
  document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
  document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

  const weatherIcon = document.querySelector(".weather-icon");
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
  } else if (data.weather[0].main === "Snow") {
    weatherIcon.src = "images/snow.png";
  }

  document.querySelector(".weather").style.display = "block";
  document.querySelector(".error").style.display = "none";
}

// Favorites functionality
function toggleFavorite() {
  if (!currentCity) return;
  
  const index = favorites.indexOf(currentCity);
  if (index > -1) {
    favorites.splice(index, 1);
  } else {
    favorites.push(currentCity);
  }
  
  localStorage.setItem("weatherFavorites", JSON.stringify(favorites));
  updateFavoriteButton();
  updateQuickAccess();
}

function updateFavoriteButton() {
  if (!currentCity) return;
  
  if (favorites.includes(currentCity)) {
    favoriteBtn.classList.add("favorited");
    favoriteBtn.title = "Remove from favorites";
  } else {
    favoriteBtn.classList.remove("favorited");
    favoriteBtn.title = "Add to favorites";
  }
}

// Recent searches functionality
function addToRecentSearches(city) {
  // Remove if already exists
  const index = recentSearches.indexOf(city);
  if (index > -1) {
    recentSearches.splice(index, 1);
  }
  
  // Add to beginning
  recentSearches.unshift(city);
  
  // Keep only last 5 searches
  if (recentSearches.length > 5) {
    recentSearches.pop();
  }
  
  localStorage.setItem("weatherRecent", JSON.stringify(recentSearches));
  updateQuickAccess();
}

function updateQuickAccess() {
  updateFavoritesList();
  updateRecentList();
}

function updateFavoritesList() {
  const favoritesList = document.getElementById("favoritesList");
  favoritesList.innerHTML = "";
  
  if (favorites.length === 0) {
    favoritesList.innerHTML = '<span style="opacity: 0.6; font-size: 12px;">No favorites yet</span>';
    return;
  }
  
  favorites.forEach(city => {
    const cityBtn = document.createElement("button");
    cityBtn.className = "quick-city";
    cityBtn.textContent = city;
    cityBtn.onclick = () => {
      searchBox.value = city;
      checkWeather(city);
    };
    favoritesList.appendChild(cityBtn);
  });
}

function updateRecentList() {
  const recentList = document.getElementById("recentList");
  recentList.innerHTML = "";
  
  if (recentSearches.length === 0) {
    recentList.innerHTML = '<span style="opacity: 0.6; font-size: 12px;">No recent searches</span>';
    return;
  }
  
  recentSearches.forEach(city => {
    const cityBtn = document.createElement("button");
    cityBtn.className = "quick-city";
    cityBtn.textContent = city;
    cityBtn.onclick = () => {
      searchBox.value = city;
      checkWeather(city);
    };
    recentList.appendChild(cityBtn);
  });
}

// Event listeners
searchBtn.addEventListener("click", () => {
  checkWeather(searchBox.value);
});

searchBox.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    checkWeather(searchBox.value);
  }
});

favoriteBtn.addEventListener("click", toggleFavorite);
