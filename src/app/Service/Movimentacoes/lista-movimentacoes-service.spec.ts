import { TestBed } from '@angular/core/testing';

import { ListaMovimentacoesService } from './lista-movimentacoes-service';

describe('ListaMovimentacoesService', () => {
  let service: ListaMovimentacoesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListaMovimentacoesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
