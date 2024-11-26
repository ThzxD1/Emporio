import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoadingController } from '@ionic/angular';
import { AutheticationService } from '../authetication.service';
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

  constructor(
    public formBuilder: FormBuilder,
    public loadingCtrl: LoadingController,
    public authService: AutheticationService,
    public router: Router
  ) {}

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

  get errorControl() {
    return this.regForm?.controls;
  }

  async signUp() {
    const loading = await this.loadingCtrl.create();
    await loading.present();

    if (this.regForm?.valid) {
      try {
        // Obtendo os dados do formulário
        const formData = this.regForm.value;

        // Chamando o método register passando os dados do formulário
        const userCredential = await this.authService.register(
          formData.fullname,
          formData.email,
          formData.password,
          formData.cpf,
          formData.dataNasc,
          formData.endereco,
          'Masculino'  // Exemplo de valor fixo para gênero, pode ser alterado conforme o seu formulário
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
