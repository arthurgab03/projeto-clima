const apiKey = "7ec1647082b6f284d0637920696c690e";
const apiCountryURL = "https://flagsapi.com/";
const apiUnsplash = "https://source.unsplash.com/1600x900/?";

const cityInput = document.getElementById("city-input");
const searchButton = document.getElementById("search");
const nameInput = document.getElementById("user-name");
const surnameInput = document.getElementById("user-surname");
const comment = document.getElementById("comment");
const errorMessage = document.querySelector(".error-container")

// Elementos 

const cityElement = document.getElementById("city");
const tempElement = document.getElementById("temperature");
const descElement = document.getElementById("description");
const weatherIconElement = document.getElementById("weather-icon");
const countryElement = document.getElementById("country");
const humidiyElement = document.getElementById("humidity");
const windElement = document.getElementById("wind");
const weatherContainer = document.querySelector(".weather-data")



// Funções 


const showErrorMessage = () => {
    errorMessage.classList.remove("hide");
    weatherContainer.classList.add("hide");
};


const getWeatherData = async(city)=> {
    const apiWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=pt_br`;

    const res = await fetch(apiWeatherURL);

    const data = await res.json();

    return data;
}

const showWeatherData = async (city) => {
    const data = await getWeatherData(city);

    if (data.cod === "404") { // se o data.cod é 404, significa que não existe/cidade não encontrada.
        showErrorMessage();
        return;
    }

    cityElement.innerText = data.name;
    tempElement.innerText = parseInt(data.main.temp);
    descElement.innerText = data.weather[0].description
    weatherIconElement.setAttribute("src", `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`);
    countryElement.setAttribute("src",`https://flagsapi.com/${data.sys.country}/flat/64.png` )
    humidiyElement.innerText = `${data.main.humidity}%`;
    windElement.innerText = `${data.wind.speed}km/h`;
    weatherContainer.classList.remove("hide");
    errorMessage.classList.add("hide")
    const userName = nameInput.value;
    const userSurName = surnameInput.value;
    comment.innerText = `${userName} ${userSurName}, aqui estão as informações:`;

    document.body.style.backgroundImage = `url("${apiUnsplash + city}")`;
    
    
   

    if(userName === "" || userSurName === ""){
        comment.innerText = `Aqui estão as informações:`
    } 

    

    
}
 
// Eventos 

searchButton.addEventListener("click", (e) => {
    e.preventDefault();

    const city = cityInput.value;

    showWeatherData(city);
})

cityInput.addEventListener("keyup", (e)=>{
    e.preventDefault;
    if(e.code === "Enter") {
        const city = e.target.value;

        showWeatherData(city);
    }
})



