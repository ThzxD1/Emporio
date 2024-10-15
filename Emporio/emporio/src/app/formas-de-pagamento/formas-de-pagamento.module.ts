import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FormasDePagamentoPageRoutingModule } from './formas-de-pagamento-routing.module';

import { FormasDePagamentoPage } from './formas-de-pagamento.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FormasDePagamentoPageRoutingModule
  ],
  declarations: [FormasDePagamentoPage]
})
export class FormasDePagamentoPageModule {}
