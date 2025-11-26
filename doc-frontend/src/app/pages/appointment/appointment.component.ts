import {Component, inject} from '@angular/core';
import {DoctorService} from '../../services/doctor.service';
import {NgForOf} from '@angular/common';
import {AppointmentTimeComponent} from '../../common-ui/appointment-time/appointment-time.component';
import {FeedbackComponent} from '../../common-ui/feedback/feedback.component';

@Component({
  selector: 'app-appointment',
  imports: [
    NgForOf,
    AppointmentTimeComponent,
    FeedbackComponent
  ],
  templateUrl: './appointment.component.html',
  styleUrl: './appointment.component.css'
})
export class AppointmentComponent {
  doctorService = inject(DoctorService);
  doctor = this.doctorService.doctor
  constructor() {
    if(this.doctor() === null){
      this.doctor.set(JSON.parse(<string>localStorage.getItem('doctor')));
    }
  }

  starsArray = Array(5).fill(0);
  getFillPercent(index: number): string {
    const rating = this.doctor()!.rating;
    const diff = rating - index
    if (diff >= 1) return '100%'; 
    if (diff > 0 && diff < 1) return `${diff * 100}%`;
    return '0%';
  }
}
