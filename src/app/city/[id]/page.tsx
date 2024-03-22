'use client';
import styles from './page.module.scss';
import {useEffect, useState} from 'react';
import axios from 'axios';
import {CitiesType} from '@/types/CitiesType';
import {WeatherType} from '@/types/WeatherType';
import Loading from '@/components/UI/Loading/Loading';
import MiniLoading from '@/components/UI/MiniLoading/MiniLoading';
import {search} from '@/utils/search';
import Error from '@/components/Error/Error';
import {useRouter} from 'next/navigation';
import WeatherInfo from '@/components/WeatherInfo/WeatherInfo';

export default function Page({params}: {params: {id: string}}) {
  const [city, setCity] = useState<CitiesType>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [weather, setWeather] = useState<WeatherType>();

  const router = useRouter();

  useEffect(() => {
    const getCity = async () => {
      setIsLoading(true);
      try {
        const data = await search(params.id, `/cities/${params.id}`);
        setCity(data);
      } catch (e) {
        router.push('/error');
      }
      setIsLoading(false);
    };
    getCity();
  }, []);

  useEffect(() => {
    const getWeather = async () => {
      const {data} = await axios.get<WeatherType>(
        `${process.env.NEXT_PUBLIC_API_WEATHER_URL}`,
        {
          params: {
            lat: city?.latitude,
            lon: city?.longitude,
            appid: process.env.NEXT_PUBLIC_API_WEATHER_KEY,
          },
        },
      );
      setWeather(data);
    };

    if (city) getWeather();
  }, [city]);

  return (
    <div className={styles.wrapper}>
      {city && !isLoading ? (
        <div className={styles.content}>
          <div className={styles.country}>
            <div>You chosen {city.name}</div>
          </div>

          <div className={styles.text}>Weather in this city</div>
          {weather ? <WeatherInfo weather={weather} /> : <MiniLoading />}
        </div>
      ) : (
        <Loading />
      )}
      {!isLoading && !city && <Error />}
    </div>
  );
}
