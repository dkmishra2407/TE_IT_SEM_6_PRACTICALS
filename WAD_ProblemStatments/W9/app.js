const cityInput = document.getElementById('city-input');
const searchBtn = document.getElementById('search-btn');
const weatherInfo = document.querySelector('.weather-info');
const cityName = document.querySelector('.city-name');
const temperature = document.querySelector('.temperature');
const condition = document.querySelector('.condition');
const humidityValue = document.getElementById('humidity-value');
const windValue = document.getElementById('wind-value');
const errorMessage = document.querySelector('.error-message');

const getwetherdata = () => {
    const city = cityInput.value.trim().toLowerCase();

    if(!city){
        return;
    }

    const xhr = new XMLHttpRequest();

    xhr.open('GET','weather.json',true);

    xhr.onprogress = function(){
        console.log("loading...");
    }

    xhr.onload = function(){
        try{
            if(this.status === 200){
                const data = JSON.parse(this.responseText)

                displaycontent(data[city]);
            }
            else{
                weatherInfo.classList.remove('active');
                errorMessage.textContent = "City not found. Please try again.";

            }
        }
        catch(error){
            weatherInfo.classList.remove('active');
                errorMessage.textContent = "City not found. Please try again.";

            console.log("error",error);
        }
    }

    xhr.onerror = function(){
        weatherInfo.classList.remove('active');
        errorMessage.textContent = "City not found. Please try again.";

        console.log("Request error");
    }

    xhr.send();
}

function displaycontent(maindata){

    if(!maindata){
        alert("City not found. Please try again.");
        weatherInfo.classList.remove('active');
        errorMessage.textContent = "City not found. Please try again.";
        return;
    }
    cityName.textContent = maindata.name;
    temperature.textContent = `${maindata.temp}°C`;
    condition.textContent = maindata.condition;
    humidityValue.textContent = `${maindata.humidity}%`;
    windValue.textContent = `${maindata.wind} m/s`;

    weatherInfo.classList.add('active');
}

searchBtn.addEventListener('click', getwetherdata);

cityInput.addEventListener('keyup',(event)=>{
    if(event.key === 'Enter'){
        getwetherdata();
    }
})

window.onload = function(){
    cityInput.value ='london';
    getwetherdata();
}
