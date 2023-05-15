let latitude = 0; //initialize lat
let longitude = 0; //initilaize lon

window.onload = function() {
    const date = new Date();
    // Outputs our date in MM/DD/YYYY
    const dateString = (date.getMonth() + 1) + '/' + date.getDate() + '/' + date.getFullYear();
    document.getElementById('date').innerHTML = dateString
    // Now, set the .date HTML text to our dateString
    if ("geolocation" in navigator) { // If the browser supports location
		navigator.geolocation.getCurrentPosition(success) // Get postion and call 'success' function

	} else { // If location does not exist, or if we deny permission
	  console.log("Geolocation is not available in your browser.");
	}
}

function success(position){
	latitude = position.coords.latitude;
	longitude = position.coords.longitude;
    console.log(latitude, longitude);
	// Print out the latitude and longitude to see if it works!
}
const btn = document.getElementById('getWeatherBtn');
btn.addEventListener("click", function(){
  const xhr = new XMLHttpRequest();
  xhr.open("GET", `localhost:3000/weather/${latitude}/${longitude}`); // opens a get request
  xhr.send(); // sends the request

  xhr.onload = function() {
    const body = JSON.parse(xhr.responseText)
    let temperature = body.temperature;
    let weatherStatus = body.weatherStatus;
    document.getElementById("temperature").innerHTML = `temperature: ${temperature}°F`;
    document.getElementById("weatherStatus").innerHTML = `weatherStatus: ${weatherStatus}`;
  }
  const xhr2 = new XMLHttpRequest();
  xhr2.open("Get", `localhost:3000/forecast/${latitiude}/${longitude}`);
  xhr2.send();

  xhr2.onload = function() {
    const body = JSON.parse(xhr2.responseText)
    let forecast = body.forecast;
    let forecastElements = document.getElementsByClassName("forecast");
    for (let i = 0; i < forecast.length; i++) {
      forecastElements[i].innerHTML = `${forecast[i].dayName}: ${forecast[i].temp}°F`;
    }
}

  let forecast = [["M", 52], ["Tu", 53], ["W", 54], ["Th", 55], ["F", 56]] // Nested array of redefines day/forecast pairs
  let forecastElements = document.getElementsByClassName("forecast"); // setting forecastElement to a array of divs with 
  for (let i = 0; i < forecast.length; i++) { // For loop that goes from the 0th index to the length - 1 index 
      forecastElements[i].innerHTML = forecast[i][0] + ": " + forecast[i][1] + "\u00B0F"; // Sets the innerHTML of the i'th element to a string in the format of "Day: Temp F"
    }
})