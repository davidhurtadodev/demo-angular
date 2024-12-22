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
  }

  getCountryByIso2(iso2Code: string): Observable<Country> {
    return this._http
      .get<ResponseCountryApi>(`${this.baseUrl}/countries?iso2=${iso2Code}`, {
        headers: { Authorization: `Bearer ${this.token}` },
      })
      .pipe(map((response) => response.data));
  }

  getCountriesByContinent(continent?: string): Observable<Country[]> {
    return this._http
      .get<ResponseCountriesApi>(
        `${this.baseUrl}/countries?continent=${continent}`,
        {
          headers: { Authorization: `Bearer ${this.token}` },
        }
      )
      .pipe(map((response) => response.data));
  }

  constructor(private http: HttpClient) {}
}
