import {Component, inject, Input} from '@angular/core';
import {Doctor} from '../../interfaces/doctor.interface';
import {NgClass, NgFor} from '@angular/common';
import {DoctorService} from '../../services/doctor.service';

@Component({
  selector: 'app-doctor',
  imports: [
     NgFor
  ],
  templateUrl: './doctor.component.html',
  styleUrl: './doctor.component.css'
})
export class DoctorComponent {
  @Input() doctor!: Doctor ;
  doctorService = inject(DoctorService);
  starsArray = Array(5).fill(0);
  dayName = ''
  constructor() {
    const days = [
      'Sunday', 'Monday', 'Tuesday', 'Wednesday',
      'Thursday', 'Friday', 'Saturday'
    ];
    const today = new Date();
    this.dayName = days[today.getDay()];
  }
  getFillPercent(index: number): string {
    const rating = this.doctor.rating;
    const diff = rating - index;
    if (diff >= 1) return '100%';       // полная звезда
    if (diff > 0 && diff < 1) return `${diff * 100}%`; // частично заполненная
    return '0%';                        // пустая
  }
  onClick(doctorId:string){
    console.log(doctorId);
    this.doctorService.toAppointment(doctorId).subscribe();
  }
}
