import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoadingController } from '@ionic/angular';
import { AutheticationService } from '../authetication.service';
import { pawSharp } from 'ionicons/icons';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
})
export class CadastroPage implements OnInit {
  showSearch: boolean = false; // Variável para controlar a visibilidade da caixa de pesquisa
  searchQuery: string = ''; // Variável para armazenar a consulta de pesquisa
  regForm!: FormGroup;

  constructor(public formBuilder:FormBuilder, public loadingCtrl: LoadingController, public authService:AutheticationService, public router : Router) {}

  toggleSearch() {
    this.showSearch = !this.showSearch; // Alterna a visibilidade da caixa de pesquisa
  }
  ngOnInit() {
    this.regForm = this.formBuilder.group({
      fullname :['',[Validators.required]],
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
    return this.regForm?.controls;
  }
  
  async signUp(){
    const loading = await this.loadingCtrl.create();
    await loading.present();
    if(this.regForm?.valid){
      const user = await this.authService.registerUser(this.regForm.value.email,this.regForm.value.password).catch(()=>{

      }).catch((error)=>{
        console.log(error);
        loading.dismiss()
      })    

      if(user){
        loading.dismiss()
        this.router.navigate(['/home'])
      }else{
        console.log('Provide correct value')

      }
    }
  }

}
