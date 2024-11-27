import { Component } from '@angular/core';
import { CartService } from '../services/cart.service';
import { getAuth } from 'firebase/auth';
import { Router } from '@angular/router';
import { Product } from '../product.model';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  showSearch: boolean = false; // Variável para controlar a visibilidade da caixa de pesquisa
  searchQuery: string = ''; // Variável para armazenar a consulta de pesquisa
  products: Product[] = [
    { id: 1, name: 'Açaí de Garrafa', price: 13, image: '../../assets/home1.png' },
    { id: 2, name: 'Manteiga de Garrafa', price: 16.49, image: '../../assets/home2.png' },
    { id: 3, name: 'Doce de Leite Viçosa', price: 25.99, image: '../../assets/home3.png' },
    { id: 4, name: 'Pão de Queijo 1KG', price: 21.99, image: '../../assets/home4.png' },
  ];
  
  constructor(private cartService: CartService, private router: Router) {}
  
  ngOnInit() {
    
  }
  

  addToCart(product: Product) {
    this.cartService.addToCart(product);
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