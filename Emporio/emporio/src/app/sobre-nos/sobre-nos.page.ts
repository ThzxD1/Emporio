import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sobre-nos',
  templateUrl: './sobre-nos.page.html',
  styleUrls: ['./sobre-nos.page.scss'],
})
export class SobreNosPage implements OnInit {
  showSearch: boolean = false; // Variável para controlar a visibilidade da caixa de pesquisa
  searchQuery: string = ''; // Variável para armazenar a consulta de pesquisa

  constructor() {}

  toggleSearch() {
    this.showSearch = !this.showSearch; // Alterna a visibilidade da caixa de pesquisa
  }
  ngOnInit() {
  }

}
