import {CountriesType} from '@/types/CountriesType';

export type CountryType = CountriesType & {
  capital: string;
  numRegions: string;
  callingCode: string;
  flagImageUri: string;
};
