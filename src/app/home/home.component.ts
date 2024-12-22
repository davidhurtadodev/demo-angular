import { Component, inject } from '@angular/core';
import { AsyncPipe, CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CardComponent } from '../card/card.component';
import { ButtonComponent } from '../button/button.component';
import { CountryService } from '../services/country.service';
import { Country } from '../countries';
import { Observable } from 'rxjs';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-home',
  imports: [
    ButtonComponent,
    CardComponent,
    CommonModule,
    FormsModule,
    NgxPaginationModule,
  ],
  template: `
    <div class="bg-[#F2F2F2] w-full h-full pt-6 px-4 lg:px-20 lg:pt-12">
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
      <div
        class="flex flex-col items-center gap-y-10 lg:flex-row lg:flex-wrap lg:gap-[65px] mt-12"
      >
        <app-card
          *ngFor="
            let country of filteredCountries
              | paginate : { itemsPerPage: 8, currentPage: page }
          "
          [country]="country"
        ></app-card>
        <div class="w-full justify-center">
          <pagination-controls
            class="pagination-controls"
            (pageChange)="page = $event"
          ></pagination-controls>
        </div>
      </div>
    </div>
  `,
  styles: `
   .pagination-controls ::ng-deep .ngx-pagination {
    display: flex;
    justify-content: center;
  }
  `,
})
export class HomeComponent {
  ngOnInit() {
    const cachedCountries = localStorage.getItem('countries');
    if (cachedCountries) {
      this.currentCountries = JSON.parse(cachedCountries);
      this.filteredCountries = this.currentCountries;
    } else {
      this.countriesService.getAllCountries().subscribe((countries) => {
        this.currentCountries = countries;
        this.filteredCountries = countries;
        localStorage.setItem('countries', JSON.stringify(countries));
      });
    }
  }

  // ngOnInit() {
  //   // Get initial countries
  //   this.countriesService.getAllCountries().subscribe((countries) => {
  //     this.currentCountries = countries;
  //     this.filteredCountries = countries;
  //   });
  // }
  private readonly countriesService: CountryService = inject(CountryService);
  // countriesList: Country[] = [];
  countryName = '';
  continent = '';
  page: number = 1;
  private currentCountries: Country[] = [];
  filteredCountries: Country[] = [];
  // countries$: Observable<Country[]> = this.countriesService.getAllCountries();

  filterByName() {
    this.page = 1;
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
    this.page = 1;
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
