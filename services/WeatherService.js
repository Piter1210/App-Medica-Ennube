// services/WeatherService.js
const OPENWEATHER_KEY = 'TU_API_KEY_OPENWEATHER'; // NO subir al repo; usar config local
export async function getWeather(ciudad='Tehuacan') {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(ciudad)}&appid=${OPENWEATHER_KEY}&units=metric&lang=es`;
  const resp = await fetch(url);
  if (!resp.ok) throw new Error(`Error OpenWeather: ${resp.status}`);
  const data = await resp.json();
  return {
    temperatura: data.main.temp,
    descripcion: data.weather[0].description,
    ciudad: data.name
  };
}
