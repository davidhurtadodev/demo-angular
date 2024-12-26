import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ButtonComponent } from '../button/button.component';

@Component({
  selector: 'app-login',
  imports: [FormsModule, ButtonComponent],
  template: `<div class="pt-6">
    <form class="flex flex-col gap-y-4 max-w-[300px] mx-auto">
      <label class="input input-bordered flex items-center gap-2  w-full">
        Email
        <input
          type="email"
          name="email"
          [(ngModel)]="email"
          class="grow text-xs lg:text-sm"
        />
      </label>
      <label class="input input-bordered flex items-center gap-2  w-full">
        Password
        <input
          type="password"
          name="passoword"
          [(ngModel)]="password"
          class="grow text-xs lg:text-sm"
        />
      </label>
      <app-button
        label="Login"
        customCss="btn btn-primary mt-4 "
        (onClick)="onLoginSubmit()"
        type="submit"
      ></app-button>
    </form>
  </div> `,
  styles: ``,
})
export class LoginComponent {
  formBuilder = inject(FormBuilder);
  http = inject(HttpClient);
  router = inject(Router);
  authService = inject(AuthService);
  email = '';
  password = '';

  onLoginSubmit(): void {
    this.authService
      .login(this.email.trim(), this.password)
      .subscribe((result) => {
        if (result.error) {
          console.error(result.error);
        } else {
          this.router.navigateByUrl('/');
        }
      });
  }
}
