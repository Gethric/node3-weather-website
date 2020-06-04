const request = require("request");

const getWeather = (lat, lon, callback) => {
	const url =
		"http://api.weatherstack.com/current?access_key=fb190b39b622b7ddc8e7369dd8ba015b&query=" +
		lat +
		"," +
		lon;

	request({ url, json: true }, (error, { body }) => {
		if (error) {
			callback("Unable to connect", undefined);
		} else if (body.error) {
			callback("Unable to find location", undefined);
		} else {
			callback(undefined, {
				temp: body.current.temperature,
				feelsLike: body.current.feelslike,
			});
		}
	});
};

module.exports = getWeather;
