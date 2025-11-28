import { Component } from '@angular/core';
import { ListaMovimentacoesService } from '../../../Service/Movimentacoes/lista-movimentacoes-service';
import { inject } from '@angular/core';
import { Movimentacao } from '../../../Service/Movimentacoes/cadastro-movimentacoes-service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-lista-movimentacoes',
  imports: [FormsModule],
  templateUrl: './lista-movimentacoes.html',
  styleUrl: './lista-movimentacoes.css',
})
export class ListaMovimentacoes {

  private api = inject(ListaMovimentacoesService);

  movimentacoes: Movimentacao[] = [];
  carregando = false;
  salvando = false;
  erro = '';

  ngOnInit() {this.carregar();}

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
  
}
