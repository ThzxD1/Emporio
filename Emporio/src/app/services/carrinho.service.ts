import { Injectable } from '@angular/core';
import { getFirestore, collection, addDoc, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CarrinhoService {
  private carrinhoSubject = new BehaviorSubject<any[]>([]); // Definindo o BehaviorSubject
  carrinho$ = this.carrinhoSubject.asObservable(); // Expondo como observable

  private db = getFirestore();

  constructor() {
    this.loadCarrinho();
  }

  // Carregar os itens do carrinho do Firestore
  loadCarrinho() {
    const carrinhoRef = collection(this.db, 'carrinho');
    getDocs(carrinhoRef).then((querySnapshot) => {
      const items = querySnapshot.docs.map((doc) => doc.data());
      this.carrinhoSubject.next(items); // Atualizando o BehaviorSubject
    });
  }

  // Adicionar produto ao carrinho
  addToCarrinho(product: any) {
    const carrinhoRef = collection(this.db, 'carrinho');
    addDoc(carrinhoRef, product).then(() => {
      console.log(`${product.name} foi adicionado ao carrinho.`);
      this.loadCarrinho(); // Atualiza a lista de itens no carrinho
    });
  }

  // Remover produto do carrinho
  removeFromCarrinho(productId: string) {
    const productRef = doc(this.db, 'carrinho', productId);
    deleteDoc(productRef).then(() => {
      console.log('Produto removido com sucesso!');
      this.loadCarrinho(); // Atualiza a lista de itens no carrinho
    });
  }
}
