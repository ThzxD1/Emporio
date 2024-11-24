import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-reset-senha',
  templateUrl: './reset-senha.page.html',
  styleUrls: ['./reset-senha.page.scss'],
})
export class ResetSenhaPage implements OnInit {
  resetForm!: FormGroup;

  constructor(
    private firebaseService: FirebaseService,
    private formBuilder: FormBuilder,
    private alertCtrl: AlertController
  ) {}

  ngOnInit() {
    this.resetForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  async resetSenha() {
    if (this.resetForm.valid) {
      const email = this.resetForm.value.email;
      try {
        await this.firebaseService.resetSenha(email);
        const alert = await this.alertCtrl.create({
          header: 'foi',
          message: 'email enviado',
          buttons: ['OK'],
        });
        await alert.present();
      } catch (error) {
        const alert = await this.alertCtrl.create({
          header: 'erro',
          message: 'email não enviado',
          buttons: ['OK'],
        });
        await alert.present();
        console.error(':c', error);
      }
    }
  }
}
