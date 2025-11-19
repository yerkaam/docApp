import {Component, effect, inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {MedicalCardService} from '../../services/medical-card.service';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-medical-card',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './medical-card.component.html',
  styleUrls: ['./medical-card.component.css']
})
export class MedicalCardComponent implements OnInit {
  form!: FormGroup;
  authService = inject(AuthService);
  userId = '' ; // ← заменишь на реальный userId из auth

  constructor(private fb: FormBuilder, private service: MedicalCardService) {
    effect(() => {
      const user = this.authService.me();
      if (user?._id) {
        this.userId = user._id;
        this.loadCard();
      }
    });
  }

  ngOnInit() {
    this.form = this.fb.group({
      height: [''],
      weight: [''],
      bloodType: [''],
      allergies: [''],
      chronicDiseases: ['']
    });

    this.loadCard();
  }

  loadCard() {
    this.service.getMedicalCard(this.userId).subscribe(data => {
      if (data) this.form.patchValue(data);
    });
  }

  onSubmit() {
    this.service.updateMedicalCard(this.userId, this.form.value).subscribe(res => {
      alert('Medical card saved successfully');
    });
  }
}
