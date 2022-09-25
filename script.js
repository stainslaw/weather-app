const form = document.querySelector('form');
const submitBtn = document.querySelector('.submit-btn');
const error = doocument.querySelector('.error-msg');
form.addEventListener('submit', handleSubmit);
submitBtn.addEventListener('click', handleSubmit);

function handleSubmit(e) {
    e.preventDefault();
    fetchWeather();
}

async function getWeatherData(location) {
    const response = await fetch(
      http://api.weatherapi.com/v1/forecast.json?key=d12d5fe486cc4e40b64164906222409&q=${location},
      {
        mode: 'cors',
      }
    );
    if (response.status === 400) {
      throwErrorMsg();
    } else {
      error.style.display = 'none';
      const weatherData = await response.json();
      const newData = processData(weatherData);
      displayData(newData);
      reset();
    }
  }

  function throwErrorMsg() {
    error.style.display = 'block';
    if (error.classList.contains('fade-in')) {
      error.style.display = 'none';
      error.classList.remove('fade-in2');
      error.offsetWidth;
      error.classList.add('fade-in');
      error.style.display = 'block';
    } else {
      error.classList.add('fade-in');
    }
  }

  function processData(weatherData) {
    const myData = {
      condition: weatherData.current.condition.text,
      feelsLike: {
        f: Math.round(weatherData.current.feelslike_f),
        c: Math.round(weatherData.current.feelslike_c),
      },
      currentTemp: {
        f: Math.round(weatherData.current.temp_f),
        c: Math.round(weatherData.current.temp_c),
      },
      wind: Math.round(weatherData.current.wind_mph),
      humidity: weatherData.current.humidity,
      location: weatherData.location.name.toUpperCase(),
    };
      if (weatherData.location.country === 'United States of America') {
    myData['region'] = weatherData.location.region.toUpperCase();
  } else {
    myData['region'] = weatherData.location.country.toUpperCase();
  }

  return myData;
}