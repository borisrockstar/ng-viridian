import { Routes } from '@angular/router';
import { LandingComponent } from './routed_components/landing/landing.component';
import { DeviceCatalogComponent } from './routed_components/device-catalog/device-catalog.component';

export const BASE_ROUTE = '';

export const APP_ROUTES: Routes = [
  { path: 'inicio', component: LandingComponent, canActivate: [] },
  { path: 'foro', component: DeviceCatalogComponent, canActivate: [] },
  { path: 'equipos', component: DeviceCatalogComponent, canActivate: [] },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
];
