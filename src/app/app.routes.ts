import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CountryDetailComponent } from './country-detail/country-detail.component';
import { LoginComponent } from './login/login.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, title: 'Home page' },
  {
    path: 'details/:iso2',
    component: CountryDetailComponent,
    title: 'Country Detail',
  },
  {
    path: 'login',
    component: LoginComponent,
    title: 'Login',
  },
];
export default routes;
