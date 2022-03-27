const request = require("postman-request");

const geocode = function (address, callback) {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1Ijoicmdhcmc0NTM3dCIsImEiOiJjbDE0eG8yMTEwZmR1M2RrYTNsOWY4MWFsIn0.aZOik0F0a_lguY9jyb_RRA&limit=1`;

  request({ url, json: true }, (err, { body }) => {
    if (err) {
      return callback("Unable to connect to location service!", undefined);
    }
    if (!body.features[0]) {
      return callback("Unable to find location. Try another search", undefined);
    }
    const [lng, lat] = body.features[0].geometry.coordinates;
    const loc = body.features[0].place_name;
    // console.log(`lat=${lat},lng=${lng}`);
    callback(undefined, { lat, lng, loc });
  });
};

module.exports = geocode;
