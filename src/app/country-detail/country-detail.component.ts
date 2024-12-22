import { Component, inject, Input } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Country } from '../countries';
import { CountryService } from '../services/country.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { ButtonComponent } from '../button/button.component';

@Component({
  selector: 'app-country-detail',
  imports: [CommonModule, RouterModule, ButtonComponent],
  template: `
    <div
      class="bg-[#F2F2F2] min-h-full pb-6  h-full pt-10
    lg:pt-12 items-center flex flex-col "
    >
      <div class="w-[320px] lg:max-w-[1000px] lg:w-full">
        <a [routerLink]="['/']">
          <app-button
            label="Back"
            customCss="btn bg-white self-start"
          ></app-button>
        </a>
        <div
          class="w-full pt-16"
          *ngIf="country$ | async as country; else loading"
        >
          <div class="lg:flex">
            <div class="relative w-full h-auto mb-11">
              <img
                [src]="country?.href?.flag"
                width="560"
                height="401"
                sizes="100vw"
              />
            </div>
            <div>
              <h1 class="text-2xl mb-4 lg:text-3xl lg:font-extrabold">
                {{ country?.name }}
              </h1>
              <ul class="flex flex-col gap-y-3">
                <li class="text-sm  font-light lg:text-base">
                  <span class="font-semibold">Population:</span>
                  {{ country?.population }}
                </li>
                <li class="text-sm  font-light lg:text-base">
                  <span class="font-semibold">Region:</span>
                  {{ country?.continent }}
                </li>
                <li class="text-sm  font-light lg:text-base">
                  <span class="font-semibold">Capital:</span
                  >{{ country?.capital }}
                </li>
                <li class="text-sm  font-light lg:text-base">
                  <span class="font-semibold">Continent:</span
                  >{{ country?.continent }}
                </li>
                <li class="text-sm  font-light lg:text-base">
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
