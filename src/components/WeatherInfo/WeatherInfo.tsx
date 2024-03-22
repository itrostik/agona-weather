import styles from './WeatherInfo.module.scss';
import {WeatherType} from '@/types/WeatherType';

export default function WeatherInfo({weather}: {weather: WeatherType}) {
  return (
    <div className={styles.weather}>
      <span>Temperature: {weather.main.temp} K</span>
      <span>Temperature (min): {weather.main.temp_min} K</span>
      <span>Temperature (max): {weather.main.temp_max} K</span>
      <span>
        <span>Description: </span>
        {weather.weather.map(weather => (
          <span key={weather.id}>{weather.description}</span>
        ))}
      </span>
    </div>
  );
}
