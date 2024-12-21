import { Component } from '@angular/core';

@Component({
  selector: 'app-card',
  imports: [],
  template: `
    <div class="w-[264px] rounded bg-white overflow-hidden">
      <div class="bg-gray-200 w-full h-[160px] overflow-hidden"></div>
      <div class="px-5 pt-6 pb-11">
        <h2 class="text font-extrabold text-lg">United States of America</h2>
        <ul>
          <li class="text-sm  font-light">
            <span class="font-semibold">Population:</span>300.000
          </li>
          <li class="text-sm  font-light">
            <span class="font-semibold">Region:</span>Americas
          </li>
          <li class="text-sm  font-light">
            <span class="font-semibold">Capital:</span>Washington D.C
          </li>
        </ul>
      </div>
    </div>
  `,
  styles: ``,
})
export class CardComponent {}
