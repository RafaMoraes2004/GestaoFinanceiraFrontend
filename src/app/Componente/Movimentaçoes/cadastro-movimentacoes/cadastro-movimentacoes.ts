import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Tipo } from '../../../Types/tipo';
import { CadastroMovimentacoesService, Movimentacao } from '../../../Service/Movimentacoes/cadastro-movimentacoes-service';
import { CategoriaService, Categoria } from '../../../Service/Categoria/categoria-service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cadastro-movimentacoes',
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './cadastro-movimentacoes.html',
  styleUrl: './cadastro-movimentacoes.css',
})
export class CadastroMovimentacoes {

      private api = inject(CadastroMovimentacoesService);
      private apiCat = inject(CategoriaService); 

      categorias: Categoria[] = [];
      movimentacoes: Movimentacao[] = [];
      carregando = false;
      salvando = false;
      erro = '';

      categoriaId : string | null = null ;
      valor : number | null = null;
      descricao = '';
      Tipo: Tipo | null = null; 

      //data: Date | null = null;

      ngOnInit() {this.carregarCat();}

     carregarCat(){
          this.carregando = true;
          this.apiCat.listarCat().subscribe({
            next: xs => {this.categorias = xs; this.carregando = false; },
            error: e => {this.erro = e.message ?? 'Falha ao carregar' ;
              this.carregando = false; }
          });
        }

      criar() {
        if ( this.categoriaId == null || this.Tipo == null || this.valor == null) return console.log("deu nao");

        const movimentacao : Movimentacao = {
          categoriaId: String(this.categoriaId),
          valor: Number(this.valor),
          descricao: this.descricao,
          Tipo : this.Tipo,  
         };

        this.salvando = true;
        this.api.criar(movimentacao).subscribe({
          next: _ => {
            this.categoriaId = ''; this.valor = null; this.descricao = '';
            this.Tipo = null; 
            this.salvando = false;
          },
          error: e => {this.erro = e.message ?? 'Falha ao criar'; 
            this.salvando = false;
          }
        });
      }

}
