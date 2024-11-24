import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoadingController } from '@ionic/angular';
import { AutheticationService } from '../authetication.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  [x: string]: any;
  loginForm! : FormGroup;

  showSearch: boolean = false; // Variável para controlar a visibilidade da caixa de pesquisa
  searchQuery: string = ''; // Variável para armazenar a consulta de pesquisa

  constructor(public formBuilder:FormBuilder, public loadingCtrl: LoadingController, public authService:AutheticationService, public alertController: AlertController) {}
  toggleSearch() {
    this.showSearch = !this.showSearch; // Alterna a visibilidade da caixa de pesquisa
  }
  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email :['', [
        Validators.required,
        Validators.email
      ]],
      password:['',
        Validators.required
      ]
    })
  }
  
  get errorControl(){
    return this.loginForm?.controls;
  }

   onResetPassword() {
    this.authService.resetPasswordPrompt();
  }

  async login(){
    const loading = await this.loadingCtrl.create();
    await loading.present();
    if(this.loginForm?.valid){
      const user = await this.authService.loginUser(this.loginForm.value.email,this.loginForm.value.password).catch(()=>{

      }).catch((error)=>{
        console.log(error);
        loading.dismiss()
      })    

      if(user){
        loading.dismiss()
        window.location.href = '/home';

      }else{
        console.log('Provide correct value')

      }
    }
  }
}
