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
import {MyAppointmentsComponent} from './pages/my-appointments/my-appointments.component';
import {DoctorLoginComponent} from './pages/doctor-login/doctor-login.component';
import {DoctorGuard} from './guards/doctor.guard';
import {DoctorDashboardComponent} from './pages/doctor-dashboard/doctor-dashboard.component';
import {ClientGuard} from './guards/client.guard';

export const routes: Routes = [
  {path: '', component: LayoutComponent, children:[
  { path: '', redirectTo: 'register', pathMatch: 'full' },
  {path: 'register', component : RegisterComponent},
  {path: 'login', component: LoginComponent},
  {path: 'verify', component: VerifyComponent},
  {path: 'home', component: HomeComponent, canActivate: [ClientGuard]},
  {path: 'search-page', component: SearchPageComponent, canActivate: [ClientGuard]},
  {path: 'appointment' , component: AppointmentComponent, canActivate: [ClientGuard]},
  {path: 'doctor-login', component: DoctorLoginComponent, canActivate: [ClientGuard]},
  {path: 'payment', component: PaymentModalComponent, canActivate: [AuthGuard]},
  {path: 'my-appointments', component: MyAppointmentsComponent, canActivate: [AuthGuard]},
  {path : 'profile', component : ProfileComponent, canActivate: [AuthGuard]},
      {path: 'doctor-dashboard', component: DoctorDashboardComponent, canActivate: [DoctorGuard]},
  { path: '**', redirectTo: 'register' }
]},
]



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
