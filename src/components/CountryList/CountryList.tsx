import styles from './CountryList.module.scss';
import {CountriesType} from '@/types/CountriesType';
import React, {useEffect, useRef} from 'react';
import Link from 'next/link';

type CountryListProps = {
  countries: CountriesType[];
};

export default function CountryList({countries}: CountryListProps) {
  const countryRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (countryRef.current) {
      const currentHeight = countryRef.current?.scrollHeight;
      countryRef.current.style.height = 'auto';
      if (currentHeight > 200) countryRef.current.style.height = '250px';
    }
  }, [countryRef.current]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.countries} ref={countryRef}>
        {countries.map(country => (
          <Link
            href={`/country/${country.wikiDataId}`}
            key={country.wikiDataId}
            className={styles.country}
          >
            {country.name}
          </Link>
        ))}
      </div>
    </div>
  );
}
