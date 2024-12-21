import { HttpClient, withFetch } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CountryService {
  readonly baseUrl = 'https://restcountries.com/v3.1/';

  constructor(private http: HttpClient) {
    //  withFetch(),
  }
}
