import { Component, Input } from '@angular/core';
import { Country } from '../countries';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-card',
  imports: [CommonModule, NgOptimizedImage, RouterModule],
  template: `
    <a
      [routerLink]="['/details', country.iso2]"
      class="w-[264px] rounded bg-white overflow-hidden block cursor-pointer hover:shadow-lg hover:outline hover:outline-yellow-400 group transition-all"
    >
      <div class=" w-full h-[160px] overflow-hidden relative">
        <img class="w-full h-auto" [ngSrc]="country.href.flag" fill />
      </div>
      <div class="px-5 pt-6 pb-11 flex flex-col">
        <h2 class="text font-extrabold text-lg">{{ country.name }}</h2>
        <ul>
          <li class="text-sm  font-light">
            <span class="font-semibold">Population:</span>
            {{ country.population }}
          </li>
          <li class="text-sm  font-light">
            <span class="font-semibold">Region:</span> {{ country.continent }}
          </li>
          <li class="text-sm  font-light">
            <span class="font-semibold">Capital:</span>{{ country.capital }}
          </li>
        </ul>
        <p
          class="text-sm transition text-transparent font-semibold self-end group-hover:text-yellow-400"
        >
          Learn more
        </p>
      </div>
    </a>
  `,
})
export class CardComponent {
  @Input() country!: Country;
}
