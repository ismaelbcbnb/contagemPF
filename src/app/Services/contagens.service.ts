import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Contagem } from '../Models/Contagem';

const httpOptions = {
  headers:  new HttpHeaders({
    'content-type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class ContagensService {

  url = 'https://contagemapi.onrender.com/contagem'
  constructor(private http: HttpClient) { }

  PegarTodos(): Observable<Contagem[]>{
    return this.http.get<Contagem[]>(this.url);
  }

  PegarPorId(contagemId: number): Observable<Contagem>{
    const apiUrl = `${this.url}/${contagemId}`;
    return this.http.get<Contagem>(apiUrl);
  } 

  SalvarContagem(contagem: Contagem): Observable<any>{
    return this.http.post<Contagem>(this.url, contagem, httpOptions);
  }

  AtualizarContagem(contagem: Contagem): Observable<any>{
    return this.http.put<Contagem>(this.url, contagem, httpOptions);
  }

  ValidarContagem(contagem: Contagem): Observable<any>{
    const apiUrl = `${this.url}/validar`;
    return this.http.put<Contagem>(apiUrl, contagem, httpOptions);
  }

  EntregarContagem(contagem: Contagem): Observable<any>{
    const apiUrl = `${this.url}/entregar`;
    return this.http.put<Contagem>(apiUrl, contagem, httpOptions);
  }

  ExcluirContagem(contagemId: number): Observable<any>{
    const apiUrl = `${this.url}/${contagemId}`;
    return this.http.delete<Contagem>(apiUrl, httpOptions);
  } 
}
