const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const messageOne = document.querySelector("#message-1");
const messageTwo = document.querySelector("#message-2");
const messageThree = document.querySelector("#message-3");
const messageFour = document.querySelector("#message-4");
const messageFive = document.querySelector("#message-5");

weatherForm.addEventListener("submit", (e) => {
	e.preventDefault();
	const location = search.value;

	messageOne.textContent = "Loading...";
	messageTwo.textContent = "";
	messageThree.textContent = "";
	messageFour.textContent = "";
	messageFive.textContent = "";

	fetch("/weather?address=" + location).then((response) => {
		response.json().then((data) => {
			if (data.error) {
				messageOne.textContent = data.error;
			} else {
				messageOne.textContent = data.location;
				messageTwo.textContent = `It is ${data.weather.temp}C and feels like ${data.weather.feelsLike}C`;
				messageThree.textContent = `The current weather is ${data.weather.description}`;
				messageFour.textContent = `There is a ${data.weather.rain}% chance of rain`;
				messageFive.textContent = `The wind is blowing ${data.weather.wind}`;

				console.log(data);
			}
		});
	});
});
