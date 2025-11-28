import { TestBed } from '@angular/core/testing';

import { CadastroMovimentacoesService } from './cadastro-movimentacoes-service';

describe('CadastroMovimentacoesService', () => {
  let service: CadastroMovimentacoesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CadastroMovimentacoesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
