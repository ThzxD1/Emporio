import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoadingController, AlertController } from '@ionic/angular';
import { AutheticationService } from '../authetication.service';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm!: FormGroup;
  showSearch: boolean = false; // Variável para controlar a visibilidade da caixa de pesquisa
  searchQuery: string = ''; // Variável para armazenar a consulta de pesquisa

  constructor(
    public formBuilder: FormBuilder,
    public loadingCtrl: LoadingController,
    public authService: AutheticationService,
    public alertController: AlertController,
    private router: Router,
    private ngFireAuth: AngularFireAuth
  ) {}

  toggleSearch() {
    this.showSearch = !this.showSearch; // Alterna a visibilidade da caixa de pesquisa
  }

  ngOnInit() {
    // Verifica se o usuário está logado ao carregar a página de login
    this.ngFireAuth.authState.subscribe((user) => {
      if (user) {
        // Se o usuário estiver logado, redireciona para a página inicial
        this.router.navigate(['/home']);
      }
    });

    this.loginForm = this.formBuilder.group({
      email: [
        '',
        [
          Validators.required,
          Validators.email
        ]
      ],
      password: [
        '',
        Validators.required
      ]
    });
  }

  get errorControl() {
    return this.loginForm?.controls;
  }

  onResetPassword() {
    this.authService.resetPasswordPrompt();
  }

  async login() {
    if (this.loginForm?.valid) {
      try {
        const user = await this.authService.loginUser(
          this.loginForm.value.email,
          this.loginForm.value.password
        );

        if (user) {
          // Redireciona para a página inicial após o login bem-sucedido
          this.router.navigate(['/home']);
        }
      } catch (error) {
        // Exibe o alerta de erro
        const alert = await this.alertController.create({
          header: 'Erro no Login',
          message: 'Não foi possível efetuar o login. Verifique suas credenciais e tente novamente.',
          buttons: ['OK'],
        });
        await alert.present();
      }
    } else {
      // Exibe um alerta se os campos do formulário não forem válidos
      const alert = await this.alertController.create({
        header: 'Formulário Inválido',
        message: 'Por favor, preencha todos os campos corretamente.',
        buttons: ['OK'],
      });
      await alert.present();
    }
  }
}
