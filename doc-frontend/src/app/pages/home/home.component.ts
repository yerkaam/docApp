import {Component, inject} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {AsyncPipe, CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {DoctorService} from '../../services/doctor.service';
import {Doctor} from '../../interfaces/doctor.interface';
import {Observable, tap} from 'rxjs';
import {BoxFeatComponent} from '../../common-ui/box-feat/box-feat.component';
import {FooterComponent} from '../../common-ui/footer/footer.component';
import {routes} from '../../app.routes';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [
    AsyncPipe,
    FormsModule,
    CommonModule, BoxFeatComponent, FooterComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  authService = inject(AuthService);
  routes = inject(Router)
  doctorService = inject(DoctorService)
  cities$ = this.doctorService.getCities();
  selectedCity = '';
  specialty = '';
  ngOnInit() {
    this.authService.getProfile().subscribe()
  }
  searchDoctors() {
    console.log(this.cities$)
    this.doctorService
      .getDoctors(this.selectedCity, this.specialty)
      .pipe(
        tap(data => {
          this.authService.toSearchPage(data, this.selectedCity, this.specialty)
        })
      ).subscribe();
  }
  box_feat__info=[
    {
      imgLink: "https://www.booknmeet.com/img/BNM-INDIA-L-H1.svg", //классная фотка, не трогать
      label: "Doctor Near Me",
      description: "Doctor / Hospital / Specialization to match specific consultation needs. Confirmed Online Appointment slots, practice locations, to select from to book appointment for clinic consultation or video consultation."
    },
    {
      imgLink: "https://www.booknmeet.com/img/BNM-INDIA-L-H2.svg",
      label: "Know Your Doctor",
      description: "Request appointments based on slots, date,consultation location. Know your Doctor to book confirmed doctor Appointment effortlessly with clinic details of practice location to engage with patients effortlessly."
    },
    {
      imgLink: "https://www.booknmeet.com/img/BNM-INDIA-L-H3.svg",
      label: "Book Confirmed Appointment",
      description: "Avoid endless back and forth communication; empowering with Google verified SMS & dynamic Email notifications. Confirmed Doctor Appointment, clinical procedure scheduling, schedule next consultation with token."
    }
  ]
  box_feat__info2 = [
    {
      imgLink: "https://www.booknmeet.com/img/BNM-INDIA-L-H1.svg",
      label: "SIMPLIFIES SCHEDULING",
      description: "With DocApp, scheduling occurs in one well organised platform so the endless back and forth communication can be avoided and a streamlined communication is guaranteed. Manage multiple locations or employees, only show your clients the calendar you want them to see, and block out any dates you will be taking off from work. Manage Clinic effortlessly with our powerful interface for phonein, walkin and online requests."
    },
    {
      imgLink: "https://www.booknmeet.com/img/BNM-INDIA-L-H2.svg",
      label: "POWERFUL.PERSONAL.ORGANISE",
      description: "DocApp offers a wide selection of online solutions that simplify the process of scheduling appointments (clinic and eConsultation) that doesn't require registration.Send automatic and manual reminders, see who is missing at first sight.No switching between calendar and BOOKNMEET. Avoid booking conflicts. Automatically sync appointments and procedure scheduling on our powerful interface access on mobile."
    },
    {
      imgLink: "https://www.booknmeet.com/img/BNM-INDIA-L-H3.svg",
      label: "DocApp QMM-TOKEN",
      description: "Improve outpatient (OP) flow at Hospitals & clinics with DocApp's QMM (Queue Management Module). Seamless queue management that works with online appointments, clinic phone-in appointments & walk-in appointments. SMS notification and reminder to maintain the patient flow in consultation with Unique Token ID. Intimating patients by sms and email reminders to avoid missing booked confirmed appointments effortlessly."
    }
  ]
  trackByIndex(index: number, item: any): number {
    return index;
  }
}
