function get(url) {
  return new Promise(function(resolve, reject) {
    let httpRequest = new XMLHttpRequest();
    httpRequest.open('GET', url);
    httpRequest.onload = function() {
      if (httpRequest.status === 200) {
        // Resolve the promise with the response text
        // success(httpRequest.responseText);
        resolve(httpRequest.response);
      } else {
        // Reject the promise with the status text
        // fail(httpRequest.status);
        reject(Error(httpRequest.statusText));
      }
    };

    // Handle network errors
    httpRequest.onerror = function() {
      reject(Error('Network Error'));
    };

    httpRequest.send();
  });
}

function successHandler(data) {
  const dataObj = JSON.parse(data);
  const weatherDiv = document.querySelector('#weather');
  const weatherFragment = `
        <h1>Weather</h1>
        <h2 class="top">
        <img
            src="http://openweathermap.org/img/w/${dataObj.weather[0].icon}.png"
            alt="${dataObj.weather[0].description}"
            width="50"
            height="50"
        />${dataObj.name}
        </h2>
        <p>
          <span class="tempF">${tempToF(dataObj.main.temp)}&deg;</span> | 
          ${dataObj.weather[0].description}
        </p>
    `;
  weatherDiv.innerHTML = weatherFragment;
  weatherDiv.classList.remove('hidden');
}

function failHandler(status) {
  console.log(status);
  const weatherDiv = document.querySelector('#weather');
  weatherDiv.classList.remove('hidden');
}

function tempToF(kelvin) {
  return ((kelvin - 273.15) * 1.8 + 32).toFixed(0);
}

document.addEventListener('DOMContentLoaded', function() {
  const apiKey = 'da575370dc624f21b490ed223966b435';
  //const apiKey = '';

  const url =
    'https://api.openweathermap.org/data/2.5/weather?q=los+angeles&APPID=' +
    apiKey;
  // get(url, successHandler, failHandler);
  // console.log(get(url));
  get(url)
    .then(function(response) {
      successHandler(response);
    })
    .catch(function(status) {
      failHandler(status);
    });
});
