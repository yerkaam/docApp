import {Component, effect, inject, signal} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router, RouterLink} from '@angular/router';
import {DoctorService} from '../../services/doctor.service';

@Component({
  selector: 'app-header-part',
  imports: [
    RouterLink
  ],
  templateUrl: './header-part.component.html',
  styleUrl: './header-part.component.css'
})
export class HeaderPartComponent {
authService = inject(AuthService);
doctorService = inject(DoctorService);
doctors = this.doctorService.doctors;
router = inject(Router)
  constructor() {
    effect(() => {
      const profile = this.authService.me();
      const doctors = this.doctorService.doctors
      this.doctors.set(JSON.parse(<string>localStorage.getItem('doctors')));
      console.log(doctors(), profile?._id)
    });
  }
  ngOnInit() {
    this.authService.getProfile().subscribe({
      next: (res: any) => {console.log(res); },
      error: err => console.log('authorize')
    })

}
logout(){
  this.authService.logout();
}
  logoutDoctor() {
    localStorage.removeItem("doctors");
    this.doctors.set(null)
    this.router.navigate(['/doctor-login']);

  }
}
