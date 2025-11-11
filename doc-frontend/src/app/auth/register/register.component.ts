import { Component, inject } from '@angular/core';
import {FormBuilder, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import {Router, RouterLink} from '@angular/router';
import {state} from '@angular/animations';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  imports: [
    FormsModule, ReactiveFormsModule, RouterLink
  ],
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router)
  form = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  });
  ngOnInit() {
    this.authService.checkAuth().subscribe({
      next: () => this.router.navigate(['/profile']),
      error: () => {} // если токен невалидный — остаёмся на странице логина
    });
  }
  onSubmit() {
    if (this.form.invalid) return;

    const { name, email, password } = this.form.value;
    this.authService.register(name!, email!, password!).subscribe({
      next: (res) => {
        console.log('✅ Успешная регистрация:', res)
        this.router.navigate(['/verify'], { state: {email}});
      },
      error: (err) => console.error('❌ Ошибка регистрации:', err)
    });
  }
}
