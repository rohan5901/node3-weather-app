const request = require("postman-request");

const forecast = (lat, lng, loc, callback) => {
  // const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=f13e951b419a4489bbb36891974f5443`;
  const url = `http://api.weatherstack.com/current?access_key=36b2a4d8d3873d23f0c6cfbbf593c211&query=${lat},${lng}`;

  request({ url, json: true }, (err, { body } = {}) => {
    if (err) {
      callback("Unable to connect to weather service!", undefined);
    } else if (body.error) {
      callback("could not find location", undefined);
    } else {
      const currentWeather = body.current;
      callback(
        undefined,
        `${currentWeather.weather_descriptions[0]} in ${loc}. Currently is ${currentWeather.temperature} degrees out, but it feels like ${currentWeather.feelslike}. Humidity currently is ${currentWeather.humidity}%.`
        // `${res.weather[0].description} in ${res.name}. Currently is ${res.main.temp}, but it feels like ${res.main.feels_like}`
      );
    }
  });
};

module.exports = forecast;
