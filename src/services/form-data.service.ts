import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FormDataService {

  constructor(private http: HttpClient) { }

  getFormData(): Observable<any> {
    return this.http.get('/assets/data.json');
  }
}
