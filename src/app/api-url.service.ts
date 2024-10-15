import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiUrlService {
 
  private apiurl="https://localhost:4000/generate-mcqs";

  constructor(private http:HttpClient) { }

  generateMcq(prompt: string, difficulty: string): Observable<any> {
    const body = { prompt, difficulty };
    return this.http.post(this.apiurl, body);
  }

  
}
