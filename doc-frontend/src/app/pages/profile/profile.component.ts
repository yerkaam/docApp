import {Component, effect, inject, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  private authService = inject(AuthService);
  private fb = inject(FormBuilder);

  form = this.fb.group({
    email: [{value: '', disabled: true}, [Validators.required, Validators.email]],
    name: ['', Validators.required]
  });
  constructor() {

    effect(() => {
      const profile = this.authService.me();
      if (!profile) return; // ждем пока не загрузится
      console.log(profile.email);
      this.form.patchValue({
        name: profile.name,
        email: profile.email
      });
    });
  }

  ngOnInit() {


    // важно вызвать getProfile(), чтобы загрузить данные с сервера
    this.authService.getProfile().subscribe();
  }

  onClick() {
    this.authService.logout();
  }
}
