import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private url="http://localhost:4000/api/mcq/fetch-mcqs";


  constructor(private http:HttpClient) {}

    // fetchMcqs(){
    //   return this.http.get<{ question:string, options:string[], correctAnswer:string}[]>(this.url);
    // }
    // fetchMcqs(): Observable<any> {
    //   return this.http.get<any>(this.url);
    // }

    fetchMcqs(topic: string): Observable<any> {
      let params = new HttpParams().set('topic', topic); // Add query parameter for topic
      return this.http.get(`${this.url}`, { params });
    }
}
