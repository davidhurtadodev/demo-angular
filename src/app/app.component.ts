import { Component, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent],
  template: ` <div class="bg-[#F2F2F2] w-full h-full flex flex-col">
    <app-header></app-header>
    <main class="grow">
      <router-outlet></router-outlet>
    </main>
  </div>`,
})
export class AppComponent {
  title = 'demo-angular';
  authService = inject(AuthService);
  router = inject(Router);
}
