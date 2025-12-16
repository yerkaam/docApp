import {inject, Injectable, signal} from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import {Observable, tap} from 'rxjs';
import {City} from '../interfaces/city.interface';
import {Doctor} from '../interfaces/doctor.interface';
import {routes} from '../app.routes';
import {Router} from '@angular/router';
import {Feedback} from '../interfaces/feedback.interface';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {
  private apiUrl = 'http://localhost:3000/api';
  doctor = signal<Doctor | null>(null);
  doctors = signal<Doctor | null>(null);

  constructor(private http: HttpClient) {

  }
  router = inject(Router)
  getCities(): Observable<City[]> {
    return this.http.get<City[]>(`${this.apiUrl}/cities`);
  }
  getDoctorById(doctorId: string){
    return this.http.get<Doctor>(`${this.apiUrl}/doctors/${doctorId}`)
  }
  getFeedback(doctorId: string){
    return this.http.get<Feedback[]>(`${this.apiUrl}/feedback/${doctorId}`)
  }
  patchRating(doctorId: string, rating: number){
    return this.http.patch<Doctor>(`${this.apiUrl}/doctors/${doctorId}`, {rating})
  }
  postFeedback(userId: string, doctorId: string, feedback: string, rating: number){
    return this.http.post<Feedback>(`${this.apiUrl}/feedback`, {doctorId, userId,feedback, rating} );
  }

  getAppointmentsByUserId(userId:string){
    return
  }
  getDoctors(cityId?: string, specialty?: string): Observable<Doctor[]> {
    let params = new HttpParams();
    if (cityId) params = params.set('cityId', cityId);
    if (specialty) params = params.set('specialty', specialty);

    console.log('🔍 Отправляю запрос с параметрами:', params.toString());
    return this.http.get<Doctor[]>(`${this.apiUrl}/doctors`, { params });
  }
  toAppointment(id: string){
    return this.http.get<Doctor>(`${this.apiUrl}/doctors/${id}`).pipe(
      tap(res => {
        console.log(res);
        localStorage.removeItem('doctor');
        localStorage.setItem('doctor', JSON.stringify(res));
        this.doctor.set(JSON.parse(<string>localStorage.getItem('doctor')));
        this.router.navigate(['/appointment']);
      }))

  }

}
