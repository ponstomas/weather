const API_key = '6db96d72d1ffdbba83820cba0d33aafe';

const btn = document.getElementById('btn');
const contenido = document.getElementById('contenido');
const dscrpt = document.getElementById('clima');
const temperatura = document.getElementById('temperatura') ;
const viento = document.getElementById('viento');
const humedad = document.getElementById('humedad')
const otros = document.getElementById('otros');
const icono = document.getElementById('icon');
const icoTemp = document.getElementById('temp');
const icoWind = document.getElementById('wind');
const icoHum = document.getElementById('hum')

let ciudad;
let latitud;
let longitud;

const mapeoIconos = {
    "01d": "bi bi-sun-fill",
    "01n": "bi bi-moon-fill",
    "02d": "bi bi-cloud-sun-fill",
    "02n": "bi bi-cloud-moon-fill",
    "03d": "bi bi-cloud-fill",
    "03n": "bi bi-cloud-fill",
    "04d": "bi bi-clouds-fill",
    "04n": "bi bi-clouds-fill",
    "09d": "bi bi-cloud-rain-fill",
    "09n": "bi bi-cloud-rain-fill",
    "10d": "bi bi-cloud-rain-fill",
    "10n": "bi bi-cloud-rain-fill",
    "11d": "bi bi-cloud-lightning-rain-fill",
    "11n": "bi bi-cloud-lightning-rain-fill",
    "13d": "bi bi-snow2",
    "13n": "bi bi-snow2",
    "50d": "bi bi-cloud-haze-fill",
    "50n": "bi bi-cloud-haze-fill"
};

btn.addEventListener('click', () => {
    const input = document.getElementById('input').value;
    ciudad = input;
    
    getLatLon()
});

async function getLatLon() {
    const res = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${ciudad}&appid=${API_key}`)
    const coord = await res.json();
    latitud = coord[0].lat;
    longitud = coord[0].lon;
    console.log(latitud);
    console.log(longitud);

    async function getClima() {
        const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitud}&lon=${longitud}&units=metric&lang=es&appid=${API_key}`)
        const data = await res.json();

        const iconId = data.weather[0].icon;
        const iconClass = mapeoIconos[iconId];

        contenido.className = "card rounded card-centered"
        
        icono.className = `bi ${iconClass}`;
        dscrpt.innerHTML += `${data.weather[0].main} (${data.weather[0].description})`;

        icoTemp.className = "bi bi-thermometer-half";
        temperatura.innerHTML += `Max: ${data.main.temp_max}°C || Min: ${data.main.temp_min}°C`;
        
        icoWind.className = "bi bi-wind";
        viento.innerHTML += `Viento: ${data.wind.speed}km/h`;

        icoHum.className = "bi bi-water";
        humedad.innerHTML += `Humedad: ${data.main.humidity}%`

        otros.innerHTML += `${ciudad}, ${data.sys.country}`


    };
    getClima();
};


 




