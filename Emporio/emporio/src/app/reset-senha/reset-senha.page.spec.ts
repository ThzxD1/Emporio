import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ResetSenhaPage } from './reset-senha.page';

describe('ResetSenhaPage', () => {
  let component: ResetSenhaPage;
  let fixture: ComponentFixture<ResetSenhaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ResetSenhaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
