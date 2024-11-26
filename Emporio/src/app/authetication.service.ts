import { Injectable } from '@angular/core';
import firebase from 'firebase/compat/app';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AlertController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AutheticationService {
  auth: any;
  router: any;

  constructor(public ngFireAuth: AngularFireAuth,private firestore: AngularFirestore, public alertController: AlertController ) { }

  async registerUser(email: string, password: string, userData: any) {
    try {
      // Cria o usuário com email e senha
      const userCredential = await this.ngFireAuth.createUserWithEmailAndPassword(
        email,
        password
      );
  
      const userId = userCredential.user?.uid;
  
      // Verifica se o usuário foi criado e tem um UID válido
      if (userId) {
        // Salva os dados no Firestore
        await this.firestore.collection('users').doc(userId).set({
          fullname: userData.fullname,
          cpf: userData.cpf,
          dataNasc: userData.dataNasc,
          endereco: userData.endereco,
          email: userData.email,
          createdAt: new Date(),
        });
      } else {
        throw new Error('Usuário não encontrado após criação.');
      }
  
      return userCredential; // Retorna a credencial do usuário
  
    } catch (error) {
      console.error("Erro ao registrar o usuário:", error);
      throw error; // Lança o erro para ser tratado onde o método for chamado
    }
  }

  async saveUserData(uid: string, userData: any) {
    try {
      // Salvando os dados do usuário na coleção 'users' usando o uid como documento
      await this.firestore.collection('users').doc(uid).set({
        fullname: userData.fullname,
        cpf: userData.cpf,
        dataNasc: userData.dataNasc,
        endereco: userData.endereco,
        email: userData.email,
        createdAt: new Date(),
      });
      console.log("Dados do usuário salvos com sucesso!");
    } catch (error) {
      console.error("Erro ao salvar os dados do usuário:", error);
      throw error; // Lança o erro para ser tratado onde o método for chamado
    }
  }
// MENOR CONSERTA ESSA PORRA PLMDS
  getUserProfile(): Observable<any> {
    return new Observable(observer => {
      this.auth.authState.subscribe((user: { uid: string | undefined; }) => {
        if (user) {
          this.firestore.collection('users').doc(user.uid).get().subscribe((doc) => {
            if (doc.exists) {
              observer.next(doc.data());
            } else {
              observer.error("User not found");
            }
          });
        } else {
          observer.error("No user logged in");
        }
      });
    });
  }
  
  async loginUser(email:string,password:string){
    return await this.ngFireAuth.signInWithEmailAndPassword(email,password)
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
                message: 'Um e-mail para redefinição de senha foi enviado. Verifique sua caixa de entrada.',
                buttons: ['OK'],
              });
              await successAlert.present();
            } catch (error) {
              const errorAlert = await this.alertController.create({
                header: 'Erro',
                message: 'Ocorreu um problema ao enviar o e-mail. Verifique o endereço ou tente novamente mais tarde.',
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
      await this.ngFireAuth.signOut(); // Desconecta o usuário
      console.log('Usuário deslogado com sucesso!');
      this.router.navigate(['/login']); // Redireciona para a página de login
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
  }

  async signOut(){
    return await this.ngFireAuth.signOut()
  }

  async getProfile(){
    return await this.ngFireAuth.currentUser
  }
  
}
