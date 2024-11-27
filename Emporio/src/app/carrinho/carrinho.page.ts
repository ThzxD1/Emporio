import { Component } from '@angular/core';
import { CartService } from '../services/cart.service';
import { Product } from '../product.model';
import { Router } from '@angular/router';
import { AutheticationService } from '../authetication.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-carrinho',
  templateUrl: './carrinho.page.html',
  styleUrls: ['./carrinho.page.scss'],
})
export class CarrinhoPage {
  cartItems: Product[] = [];
  showSearch: boolean = false; 
  searchQuery: string = ''; 
  carrinhoItems: any[] = [];

  constructor(private cartService: CartService,
    private router: Router, 
    private AutheticationService: AutheticationService,
    private alertController: AlertController,
  ){}
  
  async ngOnInit() {
    this.cartService.cart$.subscribe(items => {
      this.cartItems = items;
    });
  }

  async clearCart() {
    await this.cartService.clearCart();
    this.cartItems = [];
  }

  getTotal(): number {
    return this.cartItems.reduce((total, item) => total + item.price, 0);
  }
  
  async finalizarCompra() {
    const isLoggedIn = await this.AutheticationService.isLoggedIn(); // Verifica se o usuário está logado
    
    if (isLoggedIn) {
      // Lógica para finalizar a compra
      console.log('Compra finalizada com sucesso!');
      const alert = await this.alertController.create({
        header: 'Compra Finalizada',
        message: 'Sua compra foi finalizada com sucesso!',
        buttons: ['OK'],
      });
      await alert.present();
      
      this.clearCart(); // Limpa o carrinho após a finalização
    } else {
      // Exibe o alerta caso o usuário não esteja logado
      const alert = await this.alertController.create({
        header: 'Erro no Login',
        message: 'Você precisa estar logado para finalizar a compra.',
        buttons: ['OK'],
      });
      await alert.present();
  
      // Redireciona para a página de login
      this.router.navigate(['/login']); // Altere para a rota correta de login
    }
  }

  toggleSearch() {
    this.showSearch = !this.showSearch; 
  }
 
}


