searchbar = document.getElementById("searchbar");
btn1 = document.getElementById("btn1");
btn2 = document.getElementById("btn2");
btn3 = document.getElementById("btn3");
btn4 = document.getElementById("btn4");
btn5 = document.getElementById("btn5");
btn6 = document.getElementById("btn6");
btn7 = document.getElementById("btn7");
day0 = document.getElementById("day0");
day1 = document.getElementById("day1");
day2 = document.getElementById("day2");
day3 = document.getElementById("day3");
day4 = document.getElementById("day4");
day5 = document.getElementById("day5");
entrbtn = document.getElementById("entrbtn");
cityName=document.getElementById("cityname");
btnArr = [btn1,btn2,btn3,btn4,btn5,btn6,btn7];
dayArr = [day0,day1,day2,day3,day4,day5];

//Fills Buttons with last session weather search
btn1.textContent = localStorage.getItem(0);
btn2.textContent = localStorage.getItem(1);
btn3.textContent = localStorage.getItem(2);
btn4.textContent = localStorage.getItem(3);
btn5.textContent = localStorage.getItem(4);
btn6.textContent = localStorage.getItem(5);
btn7.textContent = localStorage.getItem(6);


//Calls google geolcation Api to get latitude and longitude of the inputted address
function getLatLon(address){
  var getApiLink ="https://maps.googleapis.com/maps/api/geocode/json?address="+address+"&key=AIzaSyAzUmRlln0TpRcKZpQiPx4cCBo0CBAMlcc";
  console.log(getApiLink);
  fetch(getApiLink)
  .then(function (response) {
  return response.json();
  })
  .then(function (data) {
    
    Gapi = data;
    getWeatherApi(Gapi.results[0].geometry.location.lat, Gapi.results[0].geometry.location.lng);

    updateButtons(address.toUpperCase());
    
    
  })
}

//Gets weather data of inputted lat and longitude and updates the User interface with the new value
function getWeatherApi(lat,lon){
  var getApiLink ="https://api.openweathermap.org/data/2.5/onecall?lat="+String(lat)+"&lon="+String(lon)+"&appid=7e652699396826148e20dd3624cf79fa";
  console.log(getApiLink);
  fetch(getApiLink)
  .then(function (response) {
  return response.json();
  })
  .then(function (data) {
    dayArr[0].children[0].innerHTML= "Temp: " + String(roundTemp(data.current.temp*1.8 - 459.67)) + " ℉";
    dayArr[0].children[1].innerHTML= "Wind: " + String(data.current.wind_speed) + " MPH";
    dayArr[0].children[2].innerHTML= "Humidity: " + String(data.current.humidity) + "%";
    dayArr[0].children[3].innerHTML= "UV Index: " + String(data.current.uvi);
    for(var i=0; i<5; i++){
      
      dayArr[i+1].children[0].innerHTML= "Temp: " + String(roundTemp(data.daily[i].temp.day*1.8 - 459.67) + " ℉");
      dayArr[i+1].children[1].innerHTML= "Wind: " + String(data.daily[i].wind_speed) + " MPH";
      dayArr[i+1].children[2].innerHTML= "Humidity: " + String(data.daily[i].humidity) + "%";
      dayArr[i+1].children[3].innerHTML= "UV Index: " + String(data.daily[i].uvi);
      
    }
    console.log(data);
    
  })
}

function updateButtons(address){
  for(var i=0; i<btnArr.length; i++){
    if(btnArr[i].textContent == address){
      
      return;
    }
  }
  for(var i=btnArr.length-1; i>0; i--){
    localStorage.setItem(i, btnArr[i-1].textContent);
    btnArr[i].textContent=btnArr[i-1].textContent;
    
  }
  btnArr[0].textContent=address;
  localStorage.setItem(0, address);
}

searchbar.addEventListener('keypress', function (e) {
  if (e.key === 'Enter') {
    city = searchbar.value;
    getLatLon(city);
  }
});

btn1.addEventListener("click", function () {
  city=btn1.textContent;
  cityName.textContent = city;
  getLatLon(city);
  
});
btn2.addEventListener("click", function () {
  city=btn2.textContent;
  cityName.textContent = city;
  getLatLon(city);
  
});
btn3.addEventListener("click", function () {
  city=btn3.textContent;
  cityName.textContent = city;
  getLatLon(city);
  
});
btn4.addEventListener("click", function () {
  city=btn4.textContent;
  cityName.textContent = city;
  getLatLon(city);
  
});
btn5.addEventListener("click", function () {
  city=btn5.textContent;
  cityName.textContent = city;
  getLatLon(city);
  
});
btn6.addEventListener("click", function () {
  city=btn6.textContent;
  cityName.textContent = city;
  getLatLon(city);
  
});
btn7.addEventListener("click", function () {
  city=btn7.textContent;
  cityName.innerHTML = city;
  getLatLon(city);
  
});
entrbtn.addEventListener("click",function(){
  city=searchbar.value.toUpperCase();
  cityName.innerHTML = city;
  getLatLon(city);
})

function roundTemp(num){
  return Math.round(num * 10)/10
}
