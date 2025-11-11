import {Component, inject} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {DoctorService} from '../../services/doctor.service';
import {tap} from 'rxjs';
import {AsyncPipe} from '@angular/common';
import {DoctorComponent} from '../../common-ui/doctor/doctor.component';

@Component({
  selector: 'app-search-page',
  imports: [
    FormsModule,
    AsyncPipe,
    DoctorComponent
  ],
  templateUrl: './search-page.component.html',
  styleUrl: './search-page.component.css'
})
export class SearchPageComponent {
  authService = inject(AuthService);
  routes = inject(Router)
  doctorService = inject(DoctorService)
  cities$ = this.doctorService.getCities();
  selectedCity: string | null =''
  specialty: string | null = '';
  doctors = this.authService.doctors
  filters = this.authService.filters
  searchDoctors() {
    this.doctorService
      .getDoctors(this.selectedCity!, this.specialty!)
      .pipe(
        tap(data =>{
          localStorage.clear()
          localStorage.setItem('selectedCity', this.selectedCity!)
          localStorage.setItem('specialty', this.specialty!)
          this.authService.doctors.set(data)
          console.log(data)
        })
      ).subscribe();
  }
  ngOnInit() {
    if (localStorage.getItem('selectedCity') !== null) {
      this.specialty = localStorage.getItem('specialty');
      this.selectedCity = localStorage.getItem('selectedCity');
    }
  }

}
