import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoadingController } from '@ionic/angular';
import { AutheticationService } from '../authetication.service';
import { pawSharp } from 'ionicons/icons';
import { Router } from '@angular/router';
import { FirebaseService } from '../services/firebase.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
})
export class CadastroPage implements OnInit {
  showSearch: boolean = false; // Variável para controlar a visibilidade da caixa de pesquisa
  searchQuery: string = ''; // Variável para armazenar a consulta de pesquisa
  regForm!: FormGroup;

  constructor(public formBuilder:FormBuilder, public loadingCtrl: LoadingController, public authService:AutheticationService, public router : Router, private firebaseService: FirebaseService, private ngFireAuth: AngularFireAuth) {}

  toggleSearch() {
    this.showSearch = !this.showSearch; // Alterna a visibilidade da caixa de pesquisa
  }
  ngOnInit() {
    this.regForm = this.formBuilder.group({
      fullname: ['', [Validators.required]],
      cpf: ['', [Validators.required]],
      dataNasc: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      endereco: ['', [Validators.required]],
    });

  }
  get errorControl(){
    return this.regForm?.controls;
  }
  
  async signUp() {
    const loading = await this.loadingCtrl.create();
    await loading.present();

    if (this.regForm?.valid) {
      try {
        // Obtendo os dados do formulário
        const formData = this.regForm.value;

        // Chamando o método registerUser passando os dados
        const userCredential = await this.authService.registerUser(
          formData.email,
          formData.password,
          formData // Passa os dados adicionais para o Firestore
        );

        if (userCredential) {
          loading.dismiss();
          this.router.navigate(['/home']); // Redireciona para a página inicial após o cadastro
        }
      } catch (error) {
        console.log(error);
        loading.dismiss();
        // Exibe o alerta de erro
      }
    } else {
      loading.dismiss();
      // Exibe alerta caso o formulário não seja válido
    }
  }



}
