import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../product.model';

interface CartItem {
  product: Product;
  quantity: number;
}

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cart = new BehaviorSubject<Product[]>([]);
  cart$ = this.cart.asObservable();
  private _storage: Storage | null = null;

  constructor(private storage: Storage) {
    this.init();
  }

   async init() {
    const storage = await this.storage.create();
    this._storage = storage;

    // Carregar o carrinho salvo no armazenamento local
    const savedCart = await this._storage.get('cart');
    if (savedCart) {
      this.cart.next(savedCart);
    }
  }

  async addToCart(product: Product) {
    const currentCart = this.cart.value;
    const updatedCart = [...currentCart, product];
    this.cart.next(updatedCart);

    // Salvar o carrinho atualizado no armazenamento local
    await this._storage?.set('cart', updatedCart);
  }

  async getCart() {
    return this.cart.value;
  }

  async clearCart() {
    this.cart.next([]);
    await this._storage?.remove('cart');
  }
}