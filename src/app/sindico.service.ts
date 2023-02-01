import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
 
@Injectable({
  providedIn: 'root'
})
export class SindicoService {
  private apiServeUrl = '';

  constructor(private http: HttpClient) { }

  public listaSindicos(): Observable<any> {
    return this.http.get<any>(`${this.apiServeUrl}/sindicos`);
  }
}
