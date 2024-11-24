import { Injectable } from '@angular/core';
import firebase from 'firebase/compat/app';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AlertController } from '@ionic/angular';
@Injectable({
  providedIn: 'root'
})
export class AutheticationService {

  constructor(public ngFireAuth: AngularFireAuth, public alertController: AlertController ) { }

  async registerUser(email:string,password:string){
    return await this.ngFireAuth.createUserWithEmailAndPassword(email,password)

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
  

  async signOut(){
    return await this.ngFireAuth.signOut()
  }

  async getProfile(){
    return await this.ngFireAuth.currentUser
  }
  
}
