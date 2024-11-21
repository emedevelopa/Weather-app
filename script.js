const searchBtn = document.querySelector(".input__btn")
const container = document.querySelector(".main__container")
const weather = document.querySelector(".weather__container")
const gradient = document.querySelector(".gradient")
const gradient2 = document.querySelector(".gradient2")

const error404 = document.querySelector(".not-found__container")


searchBtn.addEventListener("click", () => {

    const APIKey = "c5adfdc2376aaf0f3776b1b6783a2e5e"
    let city = document.querySelector(".input__text").value
    
    if (city === "") {
        alert("Please, enter your city")
    }

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`).then(response => response.json()).then(json => {
        const image = document.querySelector(".weather__icon")
        const temp = document.querySelector(".weather__temp")
        const humidity = document.querySelector(".weather__humidity")
        const wind = document.querySelector(".weather__wind")

        const hot = document.querySelector(".gradient__hot")
        const cold = document.querySelector(".gradient__cold")
        const snow = document.querySelector(".gradient__snow")
        /*const nameCity = document.querySelector(".weather__city")
        city = city.charAt(0).toUpperCase() + city.slice(1).toLowerCase();
        nameCity.textContent = city;*/


        if(json.cod == "404") {

            container.style.height = "500px"
            weather.classList.remove("active")
            error404.classList.add("active")
            return
        }

        container.style.height = "550px"
        weather.classList.add("active")
        error404.classList.remove("active")

        removeActive(hot, cold, snow)

        switch(json.weather[0].main) {
            case "Clear":
                image.src = "Assets/sun.svg";
                hot.classList.add("active")
                
                break;

            case "Rain":
                image.src = "Assets/rain.svg";
                cold.classList.add("active")
                
                break;
            
            case "Snow":
                image.src = "Assets/snow.svg";
                snow.classList.add("active")
                
                break;

            case "Clouds":
                image.src = "Assets/cloud.svg";
                cold.classList.add("active")
                
                break;

            case "Mist":
                image.src = "Assets/humidity.svg";
                snow.classList.add("active")
                
                break;

            default:
                image.src= "Assets/cloud.svg"
                
        }


        temp.innerHTML = `${parseInt(json.main.temp)}ºC`
        humidity.innerHTML = `${json.main.humidity}%`
        wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`
        gradient.style.display="none"
        gradient2.style.display="none"

        function removeActive () {
            hot.classList.remove("active")
            cold.classList.remove("active")
            snow.classList.remove("active")
        }

    })

})

