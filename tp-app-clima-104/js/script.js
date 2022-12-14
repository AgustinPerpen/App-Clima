
let cityDisplay = document.querySelector(".card-container");
let cityInputForm = document.querySelector(".card-input");
let backButton = document.getElementById("back-button");
let select = document.getElementById("mySelect");
let myCityArray = JSON.parse(localStorage.getItem("cityData")) || [];

async function fetchWeather(city) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=3936d0749fdc3124c6566ed26cf11978`;
  const respuesta = await fetch(url);
  const data = await respuesta.json();
  return displayWeather(data);
}

function displayWeather(data) {
  const { name } = data;
  const { icon, description } = data.weather[0];
  const { temp, humidity } = data.main;
  const { speed } = data.wind;
  if (select.value.toLowerCase() == name.toLowerCase()){
  document.querySelector(".city").innerText = "Weather in " + name;
  document.querySelector(".icon").src =
    "https://openweathermap.org/img/wn/" + icon + ".png";
  document.querySelector(".description").innerText = description;
  document.querySelector(".temp").innerText = temp + "°C";
  document.querySelector(".humidity").innerText = "Humidity: " + humidity + "%";
  document.querySelector(".wind").innerText = "Wind speed: " + speed + " km/h";
  }
  if (select.value.toLowerCase() != name.toLowerCase()){
    alert("error, no es una ciudad");
  }
}

function searchCity() {
  this.fetchWeather(document.getElementById("mySelect").value);
}

document.querySelector(".search button").addEventListener("click", function () {
  searchCity();
});

document.getElementById("add-city").addEventListener('keyup', function (e){
  if(e.key == "Enter"){
    addACity();
    document.querySelector(".add-city").value = '';
  }
})


function addACity() {
  let city = document.querySelector(".add-city").value;
  
  myCityArray.push(city);
  let el = document.createElement("option");
  el.style.background = "#7c7c7c2b";
  el.style.color = "white";
  for (i = 0; i < myCityArray.length; i++) {
    el.text = myCityArray[i];
    el.value = myCityArray[i];
    select.add(el);
  }
  let myCityJSON = JSON.stringify(myCityArray);
  localStorage.setItem("cityData", myCityJSON);
  document.querySelector(".add-city").value = '';
}

function showData() {
  cityInputForm.style.display = "none";
  cityDisplay.style.display = "block";
  
}

function goback() {
  cityInputForm.style.display = "block";
  cityDisplay.style.display = "none";
}

function cargaSelect() {
    for (i = 0; i < myCityArray.length; i++) {
      let el = document.createElement("option");
      el.style.background = "#7c7c7c2b";
      el.style.color = "white"; 
      el.text = myCityArray[i];
      el.value = myCityArray[i];
      select.add(el); 
    }
 
}