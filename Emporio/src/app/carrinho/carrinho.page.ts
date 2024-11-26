import { Component } from '@angular/core';
import { CarrinhoService } from '../services/carrinho.service';


@Component({
  selector: 'app-carrinho',
  templateUrl: './carrinho.page.html',
  styleUrls: ['./carrinho.page.scss'],
})
export class CarrinhoPage {
  carrinho$ = this.carrinhoService.carrinho$;
  showSearch: boolean = false; 
  searchQuery: string = ''; 
  carrinhoItems: any[] = [];

  constructor(private carrinhoService: CarrinhoService) {
    this.carrinhoService.carrinho$.subscribe((items) => {
      this.carrinhoItems = items;
    });

  }
  
  removeFromCarrinho(productId: string) {
    this.carrinhoService.removeFromCarrinho(productId);
  }
  addToCarrinho(product: any) {
    this.carrinhoService.addToCarrinho(product);
  }
  
  ngOnInit() {
    
  }
  
  toggleSearch() {
    this.showSearch = !this.showSearch; 
  }
 
}
