import { HttpClient, withFetch } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import {
  Country,
  ResponseCountriesApi,
  ResponseCountryApi,
} from '../countries';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CountryService {
  private readonly _http = inject(HttpClient);
  private readonly baseUrl = environment.apiUrl;
  private readonly token = environment.apiKey;

  getAllCountries(): Observable<Country[]> {
    return this._http
      .get<ResponseCountriesApi>(this.baseUrl, {
        headers: { Authorization: `Bearer ${this.token}` },
      })
      .pipe(map((response) => response.data));
    // console.log(response);
    // return response.data;
  }

  //   http.get('/api/config').subscribe(config => {
  //   // process the configuration.
  // })

  // async getAllCountries(): Promise<ResponseCountriesApi> {
  //   const data = await fetch(this.baseUrl, {
  //     headers: { Authorization: `Bearer ${this.token}` },
  //   });

  //   return (await data.json()) ?? [];
  // }
  //  getAllCountries(): Observable<any> {
  //     return this.http.get(this.baseUrl, {
  //       headers: { Authorization: `Bearer ${this.token}` },
  //     });
  // const data = await fetch(this.baseUrl, {
  //   headers: { Authorization: `Bearer ${this.token}` },
  // });

  //   return (await data.json()) ?? [];
  // }

  // async getCountryByName(country: string): Promise<ResponseCountryApi> {
  //   const data = await fetch(`${this.baseUrl}/${country}`, {
  //     headers: { Authorization: `Bearer ${this.token}` },
  //   });
  //   return await data.json();
  // }
  getCountryByIso2(iso2Code: string): Observable<Country> {
    return this._http
      .get<ResponseCountryApi>(`${this.baseUrl}/countries?iso2=${iso2Code}`, {
        headers: { Authorization: `Bearer ${this.token}` },
      })
      .pipe(map((response) => response.data));
    // const data = await fetch(`${this.baseUrl}/countries?iso2=${iso2Code}`, {
    //   headers: { Authorization: `Bearer ${this.token}` },
    // });
    // return await data.json();
  }

  async getCountriesByContinent(
    continent: string
  ): Promise<ResponseCountriesApi> {
    const data = await fetch(
      `${this.baseUrl}/countries?continent=${continent}`,
      {
        headers: { Authorization: `Bearer ${this.token}` },
      }
    );
    return await data.json();
  }

  constructor(private http: HttpClient) {
    // http.get.(this.baseUrl, {
    //   headers: { Authorization: `Bearer ${this.token}` }
    // })
  }
}
