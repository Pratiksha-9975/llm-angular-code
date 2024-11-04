import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  
  private registerUrl = 'http://localhost:4000/api/register';  // Backend URL for registration

  constructor(private http: HttpClient) {}

  register(studentData: any): Observable<any> {
    return this.http.post<any>(this.registerUrl, studentData);
  }
}
