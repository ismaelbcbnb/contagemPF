import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Mes } from '../Models/Mes';

const httpOptions = {
  headers:  new HttpHeaders({
    'content-type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class MesesService {

  url = 'https://contagemapi.onrender.com/mes'
  constructor(private http: HttpClient) { }

  PegarTodos(): Observable<Mes[]>{
    return this.http.get<Mes[]>(this.url);
  }

  SalvarMes(mesAno: Mes): Observable<any>{
    return this.http.post<Mes>(this.url, mesAno, httpOptions);
  }

  AtualizarMes(mes: Mes): Observable<any>{
    return this.http.put<Mes>(this.url, mes, httpOptions);
  }

  ExcluirMes(idMes: number): Observable<any>{
    const apiUrl = `${this.url}/${idMes}`;
    return this.http.delete<Mes>(apiUrl, httpOptions);
  } 

  PegarPorId(mesId: number): Observable<Mes>{
    const apiUrl = `${this.url}/${mesId}`;
    return this.http.get<Mes>(apiUrl);
  } 
}
