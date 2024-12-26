import { Component, computed, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ButtonComponent } from '../button/button.component';

@Component({
  selector: 'app-header',
  imports: [RouterModule, ButtonComponent],
  template: `
    <header
      class="flex items-center py-8 px-4 bg-white drop-shadow-md lg:px-20 lg:py-6"
    >
      <a
        [routerLink]="['/']"
        class="lg:text-2xl text-sm font-bold text-[#111517]"
        ><h1>Where in the world?</h1></a
      >
      <div class="flex items-center mr-0 ml-auto">
        @if ((userEmail())) {
        <div class="flex items-center gap-x-3">
          <p>Hello, {{ userEmail() }}</p>
          <app-button
            label="Logout"
            type="button"
            class="btn btn-error "
            (onClick)="logout()"
          ></app-button>
        </div>

        }
      </div>
    </header>
  `,
  styles: ``,
})
export class HeaderComponent {
  authService = inject(AuthService);
  userEmail = computed(() => this.authService.currentUser());

  logout() {
    this.authService.logout();
  }
}
