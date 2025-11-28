import { Routes } from '@angular/router';
import { CadastroMovimentacoes } from './Componente/Movimentaçoes/cadastro-movimentacoes/cadastro-movimentacoes';
import { ListaMovimentacoes } from './Componente/Movimentaçoes/lista-movimentacoes/lista-movimentacoes';

export const routes: Routes = [

    {path: 'cadastro-movimentacoes', component: CadastroMovimentacoes},
    {path: 'listar-movimentacoes', component: ListaMovimentacoes},
    
];
