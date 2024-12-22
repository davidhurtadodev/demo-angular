export interface ResponseCountryApi {
  data: Country;
}

export interface ResponseCountriesApi {
  data: Country[];
  links: Links;
  meta: Meta;
}

export interface Country {
  name: string;
  full_name: null | string;
  capital: string;
  iso2: string;
  iso3: string;
  covid19: Covid19;
  current_president: CurrentPresident | null;
  currency: string;
  phone_code: string;
  continent: Continent | null;
  description: null | string;
  size: string;
  independence_date: Date | null;
  population: string;
  href: CountryHref;
}

export enum Continent {
  Africa = 'Africa',
  Asia = 'Asia',
  Australia = 'Australia',
  CentralAmerica = 'Central America',
  Europe = 'Europe',
  NorthAmerica = 'North America',
  Oceana = 'Oceana',
  SouthAmerica = 'South America',
  TheCaribean = 'The Caribean',
}

export interface Covid19 {
  total_case: string;
  total_deaths: string;
  last_updated: Date;
}

export interface CurrentPresident {
  name: string;
  gender: string;
  appointment_start_date: Date;
  appointment_end_date: null;
  href: CurrentPresidentHref;
}

export interface CurrentPresidentHref {
  self: string;
  country: string;
  picture: string;
}

export interface CountryHref {
  self: string;
  states: string;
  presidents: string;
  flag: string;
}

export interface Links {
  first: string;
  last: string;
  prev: null;
  next: null;
}

export interface Meta {
  current_page: number;
  from: number;
  last_page: number;
  path: string;
  per_page: number;
  to: number;
  total: number;
}
