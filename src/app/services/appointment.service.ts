import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {
  private apiUrl = 'http://localhost:8080/appointments';

  constructor(private http: HttpClient) { }

  deleteAppointment(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  getAppointments(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}`);
  }

  scheduleAppointment(appointment: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}`, appointment);
  }

}
