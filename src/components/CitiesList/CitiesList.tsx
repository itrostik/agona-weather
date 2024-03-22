import styles from './CitiesList.module.scss';

import {CitiesType} from '@/types/CitiesType';
import React, {useEffect, useRef} from 'react';
import Link from 'next/link';
type CitiesListProps = {
  cities: CitiesType[];
};

export default function CitiesList({cities}: CitiesListProps) {
  const citiesRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (citiesRef.current) {
      const currentHeight = citiesRef.current?.scrollHeight;
      citiesRef.current.style.height = 'auto';
      if (currentHeight > 200) citiesRef.current.style.height = '250px';
    }
  }, [citiesRef.current]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.cities} ref={citiesRef}>
        {cities.map(city => (
          <Link
            href={`/city/${city.wikiDataId}`}
            key={city.wikiDataId}
            className={styles.city}
          >
            {city.name}
          </Link>
        ))}
      </div>
    </div>
  );
}
