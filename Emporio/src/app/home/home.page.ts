import { Component } from '@angular/core';
import { CarrinhoService } from '../services/carrinho.service';
import { getAuth } from 'firebase/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  showSearch: boolean = false; // Variável para controlar a visibilidade da caixa de pesquisa
  searchQuery: string = ''; // Variável para armazenar a consulta de pesquisa
  products = [
    { id: 1, name: 'Açaí de Garrafa', price: 13.0, image: '../../assets/home1.png' },
    { id: 2, name: 'Manteiga de Garrafa', price: 16.49, image: '../../assets/home2.png' },
    { id: 3, name: 'Doce de Leite Viçosa', price: 25.99, image: '../../assets/home3.png' },
    { id: 4, name: 'Pão de Queijo 1KG', price: 21.99, image: '../../assets/home4.png' },
  ];
  
  constructor(private carrinhoService: CarrinhoService, private router: Router) {}
  
  ngOnInit() {
    this.checkUserAuthentication();
  }
  
  checkUserAuthentication() {
    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) {
      // Se o usuário não estiver autenticado, redireciona para a página de login
      this.router.navigate(['/login']);
    }
  }
  addToCarrinho(product: any) {
    this.carrinhoService.addToCarrinho(product);
    alert(`${product.name} foi adicionado ao carrinho.`);
  }

  toggleSearch() {
    this.showSearch = !this.showSearch; // Alterna a visibilidade da caixa de pesquisa
  }
  navigateToPage() {
    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
      // Usuário autenticado: Redireciona para o perfil
      this.router.navigate(['/profile']);
    } else {
      // Usuário não autenticado: Redireciona para o login
      this.router.navigate(['/login']);
    }
  }
}