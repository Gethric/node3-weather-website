const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const getWeather = require("./utils/getWeather");

const app = express();

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Set up handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Set up static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
	res.render("index", {
		title: "Weather",
		name: "Gethin Thomas",
	});
});

app.get("/about", (req, res) => {
	res.render("about", {
		title: "About Me",
		name: "Gethin Thomas",
	});
});

app.get("/help", (req, res) => {
	res.render("help", {
		title: "Help Page",
		message: "Welcome to the help page",
		name: "Gethin Thomas",
	});
});

app.get("/weather", (req, res) => {
	if (!req.query.address) {
		return res.send({
			error: "You must provide an address",
		});
	}

	geocode(
		req.query.address,
		(error, { latitude, longitude, location } = {}) => {
			if (error) {
				return res.send({ error });
			}

			getWeather(latitude, longitude, (error, weatherData) => {
				if (error) {
					return res.send({ error });
				}

				res.send({
					weather: weatherData,
					location,
					address: req.query.address,
				});
			});
		}
	);
});

// To render if pages don't exist
app.get("/help/*", (req, res) => {
	res.render("404", {
		title: "404",
		name: "Gethin Thomas",
		error: "Help article not found",
	});
});

app.get("*", (req, res) => {
	res.render("404", {
		title: "404",
		name: "Gethin Thomas",
		error: "Page not found",
	});
});

app.listen(3000, () => {
	console.log("Server is up on port 3000.");
});
