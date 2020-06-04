const request = require("request");

const geocode = (address, callback) => {
	const url =
		"https://api.mapbox.com/geocoding/v5/mapbox.places/" +
		encodeURIComponent(address) +
		".json?access_token=pk.eyJ1IjoiZ2V0aHJpYyIsImEiOiJjazdlcjQydGUwN2ZkM2VvMzVkdHZma3o0In0.Xv40zlO5-8LOrlsvma72Jw";

	request({ url, json: true }, (error, { body }) => {
		if (error) {
			callback("Unable to connect", undefined);
		} else if (body.features.length === 0) {
			callback("Unable to find location", undefined);
		} else {
			callback(undefined, {
				latitude: body.features[0].center[1],
				longitude: body.features[0].center[0],
				location: body.features[0].place_name,
			});
		}
	});
};

module.exports = geocode;
