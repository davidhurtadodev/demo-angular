import { Component, inject, Input } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Country } from '../countries';
import { CountryService } from '../services/country.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-country-detail',
  imports: [CommonModule, RouterModule],
  template: `
    <div
      class="bg-[#F2F2F2] min-h-full pb-6  h-full pt-10
    lg:pt-12 items-center flex flex-col items-center "
    >
      <div class="w-[320px]">
        <a [routerLink]="['/']">
          <button class="btn bg-white self-start">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="size-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
              />
            </svg>
            Back
          </button>
        </a>
        <div
          class="w-full pt-16"
          *ngIf="country$ | async as country; else loading"
        >
          <div class="">
            <div class="relative w-full h-auto mb-11">
              <img
                [src]="country?.href?.flag"
                width="560"
                height="401"
                sizes="100vw"
              />
            </div>
            <div>
              <h1 class="text-2xl mb-4">{{ country?.name }}</h1>
              <ul class="flex flex-col gap-y-3">
                <li class="text-sm  font-light">
                  <span class="font-semibold">Population:</span>
                  {{ country?.population }}
                </li>
                <li class="text-sm  font-light">
                  <span class="font-semibold">Region:</span>
                  {{ country?.continent }}
                </li>
                <li class="text-sm  font-light">
                  <span class="font-semibold">Capital:</span
                  >{{ country?.capital }}
                </li>
                <li class="text-sm  font-light">
                  <span class="font-semibold">Continent:</span
                  >{{ country?.continent }}
                </li>
                <li class="text-sm  font-light">
                  <span class="font-semibold">Currency:</span
                  >{{ country?.currency }}
                </li>
              </ul>
            </div>
          </div>
        </div>
        <ng-template #loading>
          <p>Loading...</p>
        </ng-template>
      </div>
    </div>
  `,
})
export class CountryDetailComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  private readonly countriesService: CountryService = inject(CountryService);
  country: Country | undefined;
  // countryIso2: string;
  country$: Observable<Country>;

  constructor() {
    // this.countryIso2 = this.route.snapshot.params['iso2'];
    // this.countryService.getCountryByIso2(countryIso2).then((response) => {
    //   this.country = response.data;
    // });
    this.country$ = this.countriesService.getCountryByIso2(
      this.route.snapshot.params['iso2']
    );
  }
}
