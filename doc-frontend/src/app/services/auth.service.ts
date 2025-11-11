import {inject, Injectable, signal} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, tap} from 'rxjs';
import {CookieService} from 'ngx-cookie-service';
import {Router} from '@angular/router';
import {Profile} from '../interfaces/profile.interface';
import {Doctor} from '../interfaces/doctor.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:3000/api/users';
  private router = inject(Router);
  doctors = signal<Doctor[] | null>(null)
  filters = signal<{ city: string ; specialty: string } | null>(null);
  constructor(
    private http: HttpClient,
    private cookieService: CookieService
  ) {}
  // ---------------------------------------------------
    me = signal<Profile | null>(null);
  register(name: string, email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, { name, email, password });
  }

  verifyEmail(email: string, code: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/verify`, { email, code });
  }
  login( email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { email, password }, {withCredentials: true});
  }
  checkAuth() {
    return this.http.get('http://localhost:3000/api/users/check-auth', {
      withCredentials: true
    });
  }
  getProfile() {
    return this.http
      .get<{ message: string; user: Profile }>(`${this.apiUrl}/profile`, { withCredentials: true })
      .pipe(
        tap(response => {
          console.log('Профиль с сервера:', response.user.name);
          this.me.set(response.user); // ✅ сохраняем именно user
        })
      );
  }

  updateProfile(name: string){
   return this.http.patch<Partial<Profile>>(`http://localhost:3000/api/users/profile`,name )
  }
  toSearchPage(data: Doctor[] | null, selectedCity:string, specialty:string){
    this.doctors.set(data)
    this.filters.set({city:selectedCity, specialty:specialty})
    localStorage.clear()
    localStorage.setItem('selectedCity', selectedCity);
    localStorage.setItem('specialty', specialty);
    console.log(this.doctors())
    console.log(this.filters())
    this.router.navigate(['search-page']);
  }
  logout(){
    this.router.navigate(['login']);
    this.cookieService.delete('token');
    this.me.set(null)

  }
}
