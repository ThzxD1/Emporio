import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  getUserProfile() {
    throw new Error('Method not implemented.');
  }

  constructor(private db: AngularFireDatabase) {}

  cadCli(
    nome: string,
    endereco: string,
    cpf: string,
    dataNasc: string,
    email: string,
    senha: string
  ) {
    const cliente = { nome, endereco, cpf, dataNasc, email, senha };
    return this.db.list('clientes').push(cliente);
  }
}
