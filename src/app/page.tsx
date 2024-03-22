'use client';
import styles from './page.module.scss';
import Input from '@/components/UI/Input/Input';
import {useDebounce} from '@/hooks/useDebounce';
import {ChangeEvent, useState} from 'react';
import CountryList from '@/components/CountryList/CountryList';

import {keepPreviousData, useQuery} from '@tanstack/react-query';
import {CountriesType} from '@/types/CountriesType';
import MiniLoading from '@/components/UI/MiniLoading/MiniLoading';
import {search} from '@/utils/search';
import Error from '@/components/Error/Error';

export default function Home() {
  const [searchValue, setSearchValue] = useState('');
  const debouncedSearchValue = useDebounce(searchValue, 200);

  const {isPending, data, isFetching, isError} = useQuery<CountriesType[]>({
    queryKey: ['countries', debouncedSearchValue],
    queryFn: () =>
      search(debouncedSearchValue, '/countries', {
        namePrefix: debouncedSearchValue,
      }),
    placeholderData: keepPreviousData,
  });

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.block}>
        <Input
          handleSearchChange={handleSearchChange}
          value={searchValue}
          setValue={setSearchValue}
          placeholder={'Enter country (English)'}
        />
        {data && data.length > 0 && searchValue && !isFetching && (
          <CountryList countries={data} />
        )}
        {searchValue && isFetching && <MiniLoading />}
        {debouncedSearchValue &&
          !isPending &&
          !isFetching &&
          data &&
          data.length === 0 && <span>No results</span>}
      </div>
      {isError && <Error />}
    </div>
  );
}
