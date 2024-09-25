import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FormasDePagamentoPage } from './formas-de-pagamento.page';

const routes: Routes = [
  {
    path: '',
    component: FormasDePagamentoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FormasDePagamentoPageRoutingModule {}
