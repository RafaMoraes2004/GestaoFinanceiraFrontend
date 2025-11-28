import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Categoria{

  _id: string;
  name : string;
  cor : string;
}

@Injectable({
  providedIn: 'root',
})
export class CategoriaService {
  

  private http = inject(HttpClient);
  private base = `http://localhost:3000/categorias`;


    listarCat(): Observable<Categoria[]> {
      return this.http.get<Categoria[]>(this.base);
    }
    buscarPorIdCat(id: string): Observable<Categoria> {
      return this.http.get<Categoria>(`${this.base}/${id}`);
    }

}
