import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AlertController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { BehaviorSubject, Observable } from 'rxjs';
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import { doc, getDoc, getFirestore, setDoc } from 'firebase/firestore';

@Injectable({
  providedIn: 'root',
})
export class AutheticationService {

  
  
  private userSubject = new BehaviorSubject<any>(null);
  user$ = this.userSubject.asObservable();

  constructor(
    private ngFireAuth: AngularFireAuth,
    private firestore: AngularFirestore,
    private alertController: AlertController,
    private angularFirestore: AngularFirestore,
    private afAuth: AngularFireAuth,
  ) {
    this.initializeAuthListener();
  }

  private initializeAuthListener() {
    this.ngFireAuth.authState.subscribe((user) => {
      if (user) {
        this.loadUserData(user.uid);
      } else {
        this.userSubject.next(null);
      }
    });
  }
  updateUserProfile(user: any) {
    const userId = user.id; // Certifique-se de que o campo 'id' está correto
    return this.angularFirestore
      .collection('users')
      .doc(userId)
      .set(user, { merge: true }); // 'merge: true' adiciona ou atualiza campos
  }
  
  private async loadUserData(uid: string) {
    const firestore = getFirestore();
    const userDocRef = doc(firestore, 'users', uid);  // Usando uid como string
    const userData = await getDoc(userDocRef);
  
    if (userData.exists()) {
      this.userSubject.next(userData.data());
    } else {
      console.log('Documento do usuário não encontrado no Firestore.');
    }
  }
  
  async isLoggedIn(): Promise<boolean> {
    const user = await this.afAuth.currentUser;
    return !!user; // Retorna true se o usuário estiver logado, false caso contrário
  }
  async register(
    fullname: string,
    email: string,
    password: string,
    cpf: number,
    dataNasc: number,
    endereco: string,
    genero: string
  ) {
    const auth = getAuth();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
  
      const firestore = getFirestore();
      const userRef = doc(firestore, 'users', user.uid);
      await setDoc(userRef, {
        fullname: fullname,
        cpf: cpf,
        dataNasc: dataNasc,
        endereco: endereco,
        email: email,
        uid: user.uid,
        createdAt: new Date(),
        genero: genero,
      });
  
      // Passando user.uid como string para loadUserData
      this.loadUserData(user.uid);
  
      return userCredential;
    } catch (error) {
      console.error('Erro ao registrar usuário', error);
      throw error;
    }
  }
  
  
  

  async saveUserData(uid: string, userData: any) {
    try {
      await this.firestore.collection('users').doc(uid).set(userData);
      console.log('Dados do usuário salvos com sucesso!');
    } catch (error) {
      console.error('Erro ao salvar os dados do usuário:', error);
      throw error;
    }
  }

  getUserProfile(): Observable<any> {
    return new Observable((observer) => {
      this.ngFireAuth.authState.subscribe((user) => {
        if (user) {
          this.firestore
            .collection('users')
            .doc(user.uid)
            .get()
            .subscribe((doc) => {
              if (doc.exists) {
                observer.next(doc.data());
              } else {
                observer.error('Usuário não encontrado.');
              }
            });
        } else {
          observer.error('Nenhum usuário logado.');
        }
      });
    });
  }


  async loginUser(email: string, password: string) {
    return this.ngFireAuth.signInWithEmailAndPassword(email, password);
  }

  async resetPasswordPrompt(): Promise<void> {
    const alert = await this.alertController.create({
      header: 'Recuperar Senha',
      message: 'Por favor, insira seu e-mail para recuperar a senha.',
      inputs: [
        {
          name: 'email',
          type: 'email',
          placeholder: 'Digite seu e-mail',
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Enviar',
          handler: async (data) => {
            if (!data.email) {
              const errorAlert = await this.alertController.create({
                header: 'Erro',
                message: 'O campo de e-mail não pode estar vazio.',
                buttons: ['OK'],
              });
              await errorAlert.present();
              return;
            }
            try {
              await this.ngFireAuth.sendPasswordResetEmail(data.email);
              const successAlert = await this.alertController.create({
                header: 'Sucesso',
                message:
                  'Um e-mail para redefinição de senha foi enviado. Verifique sua caixa de entrada.',
                buttons: ['OK'],
              });
              await successAlert.present();
            } catch (error) {
              const errorAlert = await this.alertController.create({
                header: 'Erro',
                message:
                  'Ocorreu um problema ao enviar o e-mail. Verifique o endereço ou tente novamente mais tarde.',
                buttons: ['OK'],
              });
              await errorAlert.present();
            }
          },
        },
      ],
    });

    await alert.present();
  }

  async logout() {
    try {
      await this.ngFireAuth.signOut();
      console.log('Usuário deslogado com sucesso!');
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
  }
}
