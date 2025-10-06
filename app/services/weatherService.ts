// app/services/weatherService.ts
import axios from 'axios';
import { KEYS } from '../config/keys';

export async function getWeatherForCity(city: string) {
  if (!city) throw new Error('Ciudad requerida');

  try {
    const resp = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
      params: {
        q: city,
        appid: KEYS.OPENWEATHER_API_KEY,
        units: 'metric',
        lang: 'es'
      },
      timeout: 8000
    });

    const data = resp.data;
    return {
      temp: data.main.temp,
      desc: (data.weather?.[0]?.description) ?? '',
      raw: data
    };
  } catch (err) {
    const error = err as any;
    if (error.response) {
      throw new Error(`API error: ${error.response.status} ${error.response.data?.message || ''}`);
    } else if (error.request) {
      throw new Error('No hay respuesta de la API (problema de red).');
    } else {
      throw new Error('Error en la petición: ' + error.message);
    }
  }
}
