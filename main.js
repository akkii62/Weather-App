const API_key = '58f584025aef9c65a3fafc17cc673432';

//api.openweathermap.org/data/3.0/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}

https: var searchBarEl = document.getElementById('searchInput');

const form = document.querySelector('form');
const searchBar = document.getElementById('searchInput');
const searchBtnEL = document.getElementById('btn');
const weatherDataEl = document.getElementById('weather-data');
const secondaryDataEl = document.getElementById('secondary-data');

async function getWeather(city) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_key}&units=metric`;
  const response = await fetch(url);
  const data = await response.json();
  console.log(data);
  showData(data);
}

function showData(data) {
  if (data.cod === '404') {
    weatherDataEl.innerHTML = ` 
     <h2 class="not-found">${data.message} 😥</h2>
    `;
    secondaryDataEl.innerHTML = '';
    return;
  } else {
    weatherDataEl.innerHTML = `
    <div><img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="clouds" /></div> 
   
    <div>
      <h2 class="temperature">${data.main.temp} ℃</h2>
      <h4 class="weather-type">${data.weather[0].main}</h4>
    </div>
    `;

    const sunrisetime = formatTimeStamp(data.sys.sunrise);
    const sunsetime = formatTimeStamp(data.sys.sunset);
    secondaryDataEl.innerHTML = `
         <h5> humidty = ${data.main.humidity}</h5>
          <h5><img src="img/pngwing.com (1).png" class="sun-png" /> sunrise = ${sunrisetime}</h5>
          <h5><img src="img/pngwing.com (3).png" class="sun-png" /> sunset = ${sunsetime}</h5>
    `;
  }
}

form.addEventListener('submit', (event) => {
  getWeather(searchBar.value);
  event.preventDefault();
});

function formatTimeStamp(timestamp) {
  const date = new Date(timestamp * 1000);
  const formattedDate = date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
  const formattedTime = date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    hour12: true,
  });
  return `${formattedDate}, ${formattedTime}`;
}
