import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [RouterModule],
  template: `
    <header
      class="flex items-center py-8 px-4 bg-white drop-shadow-md lg:px-20 lg:py-6"
    >
      <a
        [routerLink]="['/']"
        class="lg:text-2xl text-sm font-bold text-[#111517]"
        ><h1>Where in the world?</h1></a
      >
    </header>
  `,
  styles: ``,
})
export class HeaderComponent {}
