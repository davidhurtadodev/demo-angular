import { Component, inject } from '@angular/core';
import { AsyncPipe, CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CardComponent } from '../card/card.component';
import { CountryService } from '../services/country.service';
import { Country } from '../countries';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  imports: [CardComponent, CommonModule, AsyncPipe, FormsModule],
  template: `
    <div class="bg-[#F2F2F2] w-full h-full pt-6 px-4 lg:px-20 lg:pt-12">
      <div class="flex justify-between">
        <form>
          <div class="max-w-[480px]">
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
          <button (click)="filterByName()" class="btn btn-primary mt-4">
            Filter by name
          </button>
        </form>
        <form>
          <div class="max-w-[200px]">
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
          <button (click)="filterByContinent()" class="btn btn-primary mt-4">
            Filter By country
          </button>
        </form>
      </div>
      <div
        class="flex flex-col items-center gap-y-10 lg:flex-row lg:flex-wrap lg:gap-[65px] mt-12"
      >
        <app-card
          *ngFor="let country of filteredCountries"
          [country]="country"
        ></app-card>
      </div>
    </div>
  `,
})
export class HomeComponent {
  ngOnInit() {
    // Get initial countries
    this.countriesService.getAllCountries().subscribe((countries) => {
      this.currentCountries = countries;
      this.filteredCountries = countries;
    });
  }

  private readonly countriesService: CountryService = inject(CountryService);
  // countriesList: Country[] = [];
  countryName = '';
  continent = '';
  private currentCountries: Country[] = [];
  filteredCountries: Country[] = [];
  countries$: Observable<Country[]> = this.countriesService.getAllCountries();

  filterByName() {
    const filterValue = this.countryName.trim().toLowerCase();

    if (!filterValue) {
      this.filteredCountries = this.currentCountries;
      return;
    }

    this.filteredCountries = this.currentCountries.filter((country) =>
      country.name.toLowerCase().includes(filterValue)
    );
  }

  filterByContinent() {
    if (this.continent) {
      this.countriesService
        .getCountriesByContinent(this.continent)
        .subscribe((countries) => {
          this.currentCountries = countries;

          this.filterByName();
        });
    } else {
      this.countriesService.getAllCountries().subscribe((countries) => {
        this.currentCountries = countries;
        this.filterByName();
      });
    }
  }
}
