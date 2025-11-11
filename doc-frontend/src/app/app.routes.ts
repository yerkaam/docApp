import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './auth/register/register.component';
import { LoginComponent } from './auth/login/login.component';
import { VerifyComponent } from './auth/verify/verify.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { AuthGuard } from './guards/auth.guard';
import {LayoutComponent} from './common-ui/layout/layout.component';
import {HomeComponent} from './pages/home/home.component';
import {SearchPageComponent} from './pages/search-page/search-page.component';
import {AppointmentComponent} from './pages/appointment/appointment.component';
import {PaymentModalComponent} from './common-ui/payment-modal/payment-modal.component';

export const routes: Routes = [
  { path: '', redirectTo: 'register', pathMatch: 'full' },
  {path: 'register', component : RegisterComponent},
  {path: 'login', component: LoginComponent},
  {path: 'verify', component: VerifyComponent},
  {path: 'home', component: HomeComponent},
  {path: 'search-page', component: SearchPageComponent},
  {path: 'appointment' , component: AppointmentComponent},
  {path: 'payment', component: PaymentModalComponent, canActivate: [AuthGuard]},
  {path: '', component: LayoutComponent, children:[
  {path : 'profile', component : ProfileComponent}],
    canActivate: [AuthGuard]},
  { path: '**', redirectTo: 'register' }
]


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
