import {
  Component,
  inject,
  Input,
  Output,
  EventEmitter,
  Inject,
  PLATFORM_ID,
} from '@angular/core';
import { ButtonComponent } from '../button/button.component';
import { FormsModule } from '@angular/forms';

import { Country } from '../countries';
import { CountryService } from '../services/country.service';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-filters',
  imports: [ButtonComponent, FormsModule],
  template: `
    <div class="flex lg:justify-between lg:flex-row flex-col items-center">
      <form class="w-full lg:max-w-[480px] max-w-[264px] mb-8 lg:mb-0">
        <h2 class="text-xl font-bold  mb-2">Filter by name (in client)</h2>
        <div class=" w-full">
          <label class="input input-bordered flex items-center gap-2  w-full">
            <input
              type="text"
              name="countryName"
              [(ngModel)]="countryName"
              class="grow text-xs lg:text-sm"
              placeholder="Search for a country"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              class="h-4 w-4 opacity-70"
            >
              <path
                fill-rule="evenodd"
                d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                clip-rule="evenodd"
              />
            </svg>
          </label>
        </div>
        <app-button
          label="Filter"
          customCss="btn btn-primary mt-4"
          (onClick)="filterByName()"
          type="submit"
        ></app-button>
      </form>
      <form class=" max-w-[264px] w-full ">
        <h2 class="text-xl font-bold  mb-2">Filter by country (in server)</h2>
        <div class="w-full ">
          <select
            class="select select-bordered w-full max-w-xs text-xs lg:text-sm"
            [(ngModel)]="continent"
            name="continent"
          >
            <option value="" selected>All</option>
            <option value="europe">Europe</option>
            <option value="africa">Africa</option>
            <option value="asia">Asia</option>
            <option value="north-america">North America</option>
            <option value="central-america">Central America</option>
            <option value="south-america">South America</option>
            <option value="oceana">Oceana</option>
          </select>
        </div>
        <app-button
          label="Filter"
          customCss="btn btn-primary mt-4"
          (onClick)="filterByContinent()"
          type="submit"
        ></app-button>
      </form>
    </div>
  `,
  styles: ``,
})
export class FiltersComponent {
  countryName: string = '';
  currentCountries: Country[] = [];
  filteredCountries: Country[] = [];
  continent: string = '';
  @Input() page: number = 1;
  @Output() filteredCountriesChange = new EventEmitter<Country[]>();
  @Output() currentCountriesChange = new EventEmitter<Country[]>();
  private readonly countriesService: CountryService = inject(CountryService);

  filterByName() {
    this.page = 1;
    const filterValue = this.countryName.trim().toLowerCase();

    if (!filterValue) {
      this.filteredCountries = this.currentCountries;
    } else {
      this.filteredCountries = this.currentCountries.filter((country) =>
        country.name.toLowerCase().includes(filterValue)
      );
    }

    this.filteredCountriesChange.emit(this.filteredCountries);
  }

  filterByContinent() {
    this.page = 1;
    if (this.continent) {
      this.countriesService
        .getCountriesByContinent(this.continent)
        .subscribe((countries) => {
          this.currentCountries = countries;
          this.currentCountriesChange.emit(this.filteredCountries);
          this.filterByName();
        });
    } else {
      this.countriesService.getAllCountries().subscribe((countries) => {
        this.currentCountries = countries;
        this.currentCountriesChange.emit(this.filteredCountries);
        this.filterByName();
      });
    }
  }
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}
  ngOnInit() {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }
    const localStorage = document.defaultView?.localStorage;
    //debugger;
    if (localStorage) {
      const cachedCountries = localStorage.getItem('countries');
      if (cachedCountries) {
        this.currentCountries = JSON.parse(cachedCountries);
        this.currentCountriesChange.emit(this.currentCountries);
        this.filteredCountries = this.currentCountries;
        this.filteredCountriesChange.emit(this.filteredCountries);
      } else {
        this.countriesService.getAllCountries().subscribe((countries) => {
          this.currentCountries = countries;
          this.currentCountriesChange.emit(this.currentCountries);
          this.filteredCountries = countries;
          this.filteredCountriesChange.emit(this.filteredCountries);
          localStorage.setItem('countries', JSON.stringify(countries));
        });
      }
    }
  }
}
