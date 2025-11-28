import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { Component, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Tipo } from '../../Types/tipo';

export interface Movimentacao {

  id? : string;
  categoriaId : string;
  valor : number;
  descricao : string;
  Tipo : Tipo;

}
@Injectable({
    providedIn: 'root'
})

export class CadastroMovimentacoesService {

    private http = inject(HttpClient);
    private base = `http://localhost:3000/movimentacoes`;

    criar(movimentacao: Movimentacao): Observable<Movimentacao> {
      console.log(movimentacao);
      return this.http.post<Movimentacao>(this.base, movimentacao);
    }
  

}
