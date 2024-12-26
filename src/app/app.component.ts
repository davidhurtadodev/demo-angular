import { Component, computed, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { HomeComponent } from './home/home.component';
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
  userEmail = computed(() => this.authService.currentUser());

  // logout() {
  //   this.authService.logout();
  // }

  ngOnInit(): void {
    // this.authService.getSession().subscribe(({ data }) => {
    //   const isLoggedIn = !!data.session?.user;
    //   const isLoginPage = this.router.url === '/login';
    //   if (!isLoggedIn && !isLoginPage) {
    //     this.router.navigateByUrl('/login');
    //   } else if (isLoggedIn && isLoginPage) {
    //     this.router.navigateByUrl('/');
    //   }
    // });
    // const user = this.authService.currentUser();
    // if (!user) {
    //   console.log(this.authService.currentUser());
    //   this.router.navigateByUrl('/login');
    // } else {
    //   this.router.navigateByUrl('/login');
    // }
    //  this.authService.currentUser.subscribe((user) => {
    //    if (!user && this.router.url !== '/login') {
    //      this.router.navigateByUrl('/login');
    //    }
    //  });
    // this.authService.supabase.auth.onAuthStateChange((event, session) => {
    //   if (event === 'SIGNED_IN') {
    //     this.authService.currentUser.set({
    //       email: session?.user.email!,
    //     });
    //   } else if (event === 'SIGNED_OUT') {
    //     this.authService.currentUser.set(null);
    //   }
    // });
    // this.authService.getSession().subscribe(({ data }) => {
    //   console.log(data.session?.user.email);
    //   if (data.session?.user.email) {
    //     this.authService.currentUser.set({
    //       email: data.session?.user.email!,
    //     });
    //   } else {
    //     this.router.navigateByUrl('/login');
    //   }
    // });
    // if (this.router.url !== '/login' && !this.authService.currentUser())
    //   console.log(this.authService.supabase.auth.getSession());
    // this.router.navigateByUrl('/login');
  }
}
