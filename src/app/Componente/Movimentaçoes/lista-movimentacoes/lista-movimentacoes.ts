import { Component } from '@angular/core';
import { ListaMovimentacoesService } from '../../../Service/Movimentacoes/lista-movimentacoes-service';
import { inject } from '@angular/core';
import { Movimentacao } from '../../../Service/Movimentacoes/cadastro-movimentacoes-service';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Categoria, CategoriaService } from '../../../Service/Categoria/categoria-service';

@Component({
  selector: 'app-lista-movimentacoes',
  imports: [FormsModule, RouterLink],
  templateUrl: './lista-movimentacoes.html',
  styleUrl: './lista-movimentacoes.css',
})
export class ListaMovimentacoes {

  private api = inject(ListaMovimentacoesService);
  private apiCat = inject(CategoriaService); 

  categorias: Categoria[] = [];
  movimentacoes: Movimentacao[] = [];
  carregando = false;
  salvando = false;
  erro = '';
  filtroCategoria: string = '';

  ngOnInit() {this.carregar(); 
    this.carregarCategorias();
  }

     carregar(){
          this.carregando = true;
          this.api.listar().subscribe({
            next: xs => {this.movimentacoes = xs; this.carregando = false; },
            error: e => {this.erro = e.message ?? 'Falha ao carregar' ;
              this.carregando = false; }
          });
        }

        excluir(id?: string){
          if (!id) return;
          this.api.excluir(id).subscribe({
            next: _ => this.carregar(),
            error: e => this.erro = e.message ?? 'Falha ao excluir'
          });
        }

        carregarCategorias() {
          this.apiCat.listarCat().subscribe({
            next: cats => this.categorias = cats,
            error: e => console.error(e)
          });
        }

        get movimentacoesFiltradas() {
          if (!this.filtroCategoria) {
            return this.movimentacoes; 
          }
          return this.movimentacoes.filter(m => m.categoriaId === this.filtroCategoria);
        }

        getCor(categoriaId: string): string {
          const cat = this.categorias.find(c => c._id === categoriaId);
          return cat ? cat.cor : 'transparent';
        }
        
        getNomeCategoria(categoriaId: string): string {
          const cat = this.categorias.find(c => c._id === categoriaId);
          return cat ? cat.name : '';
        }

        saldoTotal(): number {
          const lista = this.movimentacoesFiltradas;
          let total = 0;
  
          for (const mov of lista) {
            if (mov.Tipo === 'ENTRADA') {
              total = total + mov.valor; 
            } else if (mov.Tipo === 'SAIDA') {
              total = total - mov.valor; 
            } 
          } 
          return total;
        }
  
}
