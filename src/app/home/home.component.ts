import { Component } from '@angular/core';
import { CardComponent } from '../card/card.component';

@Component({
  selector: 'app-home',
  imports: [CardComponent],
  template: `
    <div class="bg-[#F2F2F2] w-full h-full pt-6 px-4 lg:px-20 lg:pt-12">
      <div class="flex justify-between">
        <div class="max-w-[480px]">
          <label class="input input-bordered flex items-center gap-2  w-full">
            <input
              type="text"
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
        <div class="max-w-[200px]">
          <select
            class="select select-bordered w-full max-w-xs text-xs lg:text-sm"
          >
            <option disabled selected>Filter by region</option>
            <option>Han Solo</option>
            <option>Greedo</option>
          </select>
        </div>
      </div>
      <app-card></app-card>
    </div>
  `,
})
export class HomeComponent {}
