import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class MedicalCardService {
  private baseUrl = 'http://localhost:3000/api/medical-card';

  constructor(private http: HttpClient) {}

  getMedicalCard(userId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${userId}`);
  }

  updateMedicalCard(userId: string, data: any): Observable<any> {
    return this.http.patch(`${this.baseUrl}/${userId}`, data);
  }
}
