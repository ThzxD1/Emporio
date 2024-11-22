import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-formas-de-pagamento',
  templateUrl: './formas-de-pagamento.page.html',
  styleUrls: ['./formas-de-pagamento.page.scss'],
})
export class FormasDePagamentoPage implements OnInit {
  showSearch: boolean = false; // Variável para controlar a visibilidade da caixa de pesquisa
  searchQuery: string = ''; // Variável para armazenar a consulta de pesquisa

  constructor() {}

  toggleSearch() {
    this.showSearch = !this.showSearch; // Alterna a visibilidade da caixa de pesquisa
  }
  ngOnInit() {
  }

}
