import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  
  showSearch: boolean = false; // Variável para controlar a visibilidade da caixa de pesquisa
  searchQuery: string = ''; // Variável para armazenar a consulta de pesquisa

  constructor() {}

  toggleSearch() {
    this.showSearch = !this.showSearch; // Alterna a visibilidade da caixa de pesquisa
  }
  ngOnInit() {
  }


}
