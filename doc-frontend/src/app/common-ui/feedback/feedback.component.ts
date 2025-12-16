import {Component, computed, inject, Signal, signal, WritableSignal} from '@angular/core';
import {DoctorService} from '../../services/doctor.service';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {Feedback} from '../../interfaces/feedback.interface';
import {JsonPipe, NgForOf, NgIf} from '@angular/common';
import {Profile} from '../../interfaces/profile.interface';
import { formatDistanceToNow } from 'date-fns';
interface FeedbackWithUser {
  feedback: Feedback;
  user: Profile;
}
@Component({
  selector: 'app-feedback',
  imports: [
    ReactiveFormsModule,
    JsonPipe,
    NgIf,
    NgForOf
  ],
  templateUrl: './feedback.component.html',
  styleUrl: './feedback.component.css'
})

export class FeedbackComponent {

  authService = inject(AuthService);
  formBuilder = inject(FormBuilder);
  doctorService = inject(DoctorService);

  doctor = this.doctorService.doctor;   // Signal<Doctor>
  me = this.authService.me;             // Signal<Profile>
  rating: WritableSignal<number> = signal(0);

  img = '/assets/imgs/avatar.png';

  feedback: WritableSignal<Feedback[]> = signal<Feedback[]>([]);
  user: WritableSignal<Profile[]> = signal<Profile[]>([]);
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


  merged: Signal<FeedbackWithUser[]> = computed(() => {
    return this.feedback()
      .map(fb => {
        const u = this.user().find(u => u._id === fb.userId);
        return u ? { feedback: fb, user: u } : null;
      })
      .filter(Boolean) as FeedbackWithUser[];
  });


  form = this.formBuilder.group({
    feedback: ['', Validators.required]
  });
  getFillPercent(index: number, rating: number): string {
    const diff = rating - index;
    if (diff >= 1) return '100%';       // полная звезда
    if (diff > 0 && diff < 1) return `${diff * 100}%`; // частично заполненная
    return '0%';                        // пустая
  }

  ngOnInit() {
    this.doctorService.getFeedback(this.doctor()!._id).subscribe(feedback => {
      this.feedback.set(feedback);
      for (const f of feedback) {
        this.getUser(f.userId);
      }

    });
  }

  onSubmit() {
    if(this.rating() == 0){
      return;
    }
    this.doctorService
      .postFeedback(this.me()!._id, this.doctor()!._id, this.form.value.feedback!, this.rating())
      .subscribe((newFeedback: Feedback) => {
        this.feedback.update(feed => [...feed, newFeedback]);
        if (!this.user().find(u => u._id === newFeedback.userId)) {
          this.user.update(users => [...users, this.me()!]);
        }
        this.doctorService.patchRating(this.doctor()!._id, (this.rating() + this.doctor()!.rating)/2).subscribe(profile => {
          this.doctor.set(profile);
          console.log(profile.rating);
          localStorage.setItem('doctor', JSON.stringify(profile));
          this.form.reset();
          this.rating.set(0);
        })

      });

  }
  setRating(value: number) {
    this.rating.set(value);
    console.log('Выбранный рейтинг:', value);
  }

  getCreatedTime(createdAt: string){
    return formatDistanceToNow(new Date(createdAt), { addSuffix: true });
  }
  getUser(userId: string) {
    this.authService.getProfileById(userId).subscribe(profile => {
      this.user.update(users => [...users, profile]);
    });
  }
}
