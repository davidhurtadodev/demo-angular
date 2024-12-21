import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HomeComponent } from './home/home.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HomeComponent],
  template: ` <div class="bg-[#F2F2F2] w-full h-full flex flex-col">
    <header
      class="flex items-center p-y-8 px-4 bg-white drop-shadow-md lg:px-20 lg:py-6"
    >
      <a class="lg:text-2xl text-sm font-bold text-[#111517]"
        ><h1>Where in the world?</h1></a
      >
    </header>
    <main class="grow">
      <router-outlet></router-outlet>
    </main>
  </div>`,
})
export class AppComponent {
  title = 'demo-angular';
}
