import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormasDePagamentoPage } from './formas-de-pagamento.page';

describe('FormasDePagamentoPage', () => {
  let component: FormasDePagamentoPage;
  let fixture: ComponentFixture<FormasDePagamentoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(FormasDePagamentoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
