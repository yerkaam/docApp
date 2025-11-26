import {Component, inject, signal, WritableSignal} from '@angular/core';
import {DoctorService} from '../../services/doctor.service';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {Feedback} from '../../interfaces/feedback.interface';
import {JsonPipe} from '@angular/common';

@Component({
  selector: 'app-feedback',
  imports: [
    ReactiveFormsModule,
    JsonPipe
  ],
  templateUrl: './feedback.component.html',
  styleUrl: './feedback.component.css'
})
export class FeedbackComponent {
  authService = inject(AuthService);
  formBuilder = inject(FormBuilder)
doctorService = inject(DoctorService);
doctor = this.doctorService.doctor;
me = this.authService.me;
feedback: WritableSignal<Feedback[]> = signal<Feedback[]>([])
form = this.formBuilder.group({
  feedback: ['', Validators.required]
})
ngOnInit() {this.doctorService.getFeedback(this.doctor()!._id).subscribe(
  feedback => {
    this.feedback.set(feedback)
  }
)
}
onSubmit(){
  console.log(this.form.value);
    this.doctorService.postFeedback(this.me()!._id , this.doctor()!._id,  this.form!.value.feedback!).subscribe();
}


}
