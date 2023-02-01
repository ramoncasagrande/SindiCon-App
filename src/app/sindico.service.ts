import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Sindico } from './sindico';
 
@Injectable({
  providedIn: 'root'
})
export class SindicoService {
  private apiServeUrl = '';

  constructor(private http: HttpClient) { }

  public listaSindicos(): Observable<Sindico[]> {
    return this.http.get<Sindico[]>(`${this.apiServeUrl}/sindicos`);
  }

  public adicionaSindico(sindico: Sindico): Observable<Sindico> {
    return this.http.post<Sindico>(`${this.apiServeUrl}/sindicos`, sindico);
  }

  public atualizaSindico(sindico: Sindico): Observable<Sindico> {
    return this.http.put<Sindico>(`${this.apiServeUrl}/sindicos`, sindico);
  }

  public excluiSindico(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServeUrl}/sindicos/${id}`);
  }
}
