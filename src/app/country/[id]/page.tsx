'use client';
import styles from './page.module.scss';
import {ChangeEvent, useEffect, useState} from 'react';
import {CountryType} from '@/types/CountryType';
import Image from 'next/image';
import Input from '@/components/UI/Input/Input';
import {useDebounce} from '@/hooks/useDebounce';
import {keepPreviousData, useQuery} from '@tanstack/react-query';
import CitiesList from '@/components/CitiesList/CitiesList';
import {CitiesType} from '@/types/CitiesType';
import Loading from '@/components/UI/Loading/Loading';
import MiniLoading from '@/components/UI/MiniLoading/MiniLoading';
import {search} from '@/utils/search';
import Error from '@/components/Error/Error';
export default function Page({params}: {params: {id: string}}) {
  const [country, setCountry] = useState<CountryType>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>('');

  const debouncedSearchValue = useDebounce(searchValue, 500);

  const {isPending, data, isFetching, isError} = useQuery<CitiesType[]>({
    queryKey: ['cities', debouncedSearchValue],
    queryFn: () =>
      search(debouncedSearchValue, '/cities', {
        countryIds: params.id,
        namePrefix: debouncedSearchValue,
      }),
    placeholderData: keepPreviousData,
    refetchOnWindowFocus: false,
  });

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };
  useEffect(() => {
    const getCountry = async () => {
      setIsLoading(true);
      const data = await search(params.id, `/countries/${params.id}`);
      setCountry(data);
      setIsLoading(false);
    };
    getCountry();
  }, []);
  return (
    <div className={styles.wrapper}>
      {country && !isLoading ? (
        <div className={styles.content}>
          <div className={styles.country}>
            <div>You chosen {country.name}</div>
            <Image
              src={country.flagImageUri}
              alt={'flag'}
              width={50}
              height={50}
            />
          </div>
          <div className={styles.text}>
            Now you can enter a city of this country and find the weather
          </div>
          <Input
            handleSearchChange={handleSearchChange}
            value={searchValue}
            setValue={setSearchValue}
            placeholder={'Enter city (English)'}
          />
          {data && data.length > 0 && searchValue && !isFetching && (
            <CitiesList cities={data} />
          )}
          {searchValue.length > 0 && isFetching && <MiniLoading />}
          {debouncedSearchValue &&
            !isPending &&
            !isFetching &&
            data &&
            data.length === 0 && <span>No results</span>}
        </div>
      ) : (
        <Loading />
      )}
      {isError && <Error />}
    </div>
  );
}
