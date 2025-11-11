import {Component, inject, signal} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';

@Component({
  selector: 'app-verify',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './verify.component.html',
  styleUrl: './verify.component.css'
})
export class VerifyComponent {
  private authService = inject(AuthService);
  private router = inject(Router);
  email = signal('');
  message = signal('');
  error = signal('');
  form = new FormGroup({
    code: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(6)])
  });
  constructor() {
    const state = history.state as { email?: string };
    this.email.set(state.email || '');
    if (!this.email()) {
      this.error.set('Email не найден. Вернитесь к регистрации.');
    }
  }
  onSubmit(){
    if(this.form.invalid){
      return;
    }
    else{
      const code = this.form.value.code!;
      this.authService.verifyEmail(this.email() , code).subscribe({
        next: (res) =>{
          this.message.set(res.message)
          this.router.navigate(['/login']);
        },
        error: (err) => {this.error.set(err.message || 'Ошибка при подтверждении')}
      })
    }
  }
}
