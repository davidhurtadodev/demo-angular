import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CardComponent } from '../card/card.component';
import { Country } from '../countries';
import { NgxPaginationModule } from 'ngx-pagination';
import { FiltersComponent } from '../filters/filters.component';

@Component({
  selector: 'app-home',
  imports: [
    CardComponent,
    CommonModule,
    FormsModule,
    NgxPaginationModule,
    FiltersComponent,
  ],
  template: `
    <div class="bg-[#F2F2F2] w-full h-full pt-6 px-4 lg:px-20 lg:pt-12">
      <app-filters
        (filteredCountriesChange)="updateFilteredCountries($event)"
        (currentCountriesChange)="updateCurrentCountries($event)"
        [page]="page"
      ></app-filters>

      <div
        class="flex flex-col items-center gap-y-10 lg:flex-row lg:flex-wrap lg:gap-[65px] mt-12"
      >
        @if (filteredCountries.length > 0) {
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
        } @else {
        <p>Loading...</p>
        }
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
  countryName = '';
  continent = '';
  page: number = 1;
  currentCountries: Country[] = [];
  filteredCountries: Country[] = [];

  updateCurrentCountries(countries: Country[]) {
    this.currentCountries = countries;
  }

  updateFilteredCountries(countries: Country[]) {
    this.filteredCountries = countries;
  }
}
