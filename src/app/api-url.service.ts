import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiUrlService {
 
  private apiurl="http://localhost:4000/generate-mcqs";

  constructor(private http:HttpClient) { }

  generateMcq(topic: string, difficulty: string): Observable<any> {
    const body = { topic, difficulty };
    return this.http.post(this.apiurl, body);
  }

  saveMcq(mcqData: any) {
    return this.http.post<any>(`http://localhost:4000/api/mcq/save-mcq`, mcqData);
  }
  fetchMcqs() {
    return this.http.get<{ question: string, options: string[] }[]>(`http://localhost:4000/api/mcq/fetch-mcqs`);
  }
  


  
}
