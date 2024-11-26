import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AutheticationService } from '../authetication.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  user: any = null;
  isLoading: boolean = true;

  constructor(
    private autheticationService: AutheticationService,
    private ngFireAuth: AngularFireAuth,
    private router: Router
  ) {}

  ngOnInit() {
    // Verifica se o usuário está autenticado
    this.ngFireAuth.authState.subscribe(user => {
      if (!user) {
        this.router.navigate(['/login']); // Redireciona para o login se não estiver logado
      } else {
        this.loadUserData(); // Carrega os dados do usuário se ele estiver logado
      }
    });
  }
  
  async logout() {
    await this.autheticationService.logout();
  }

  // Método para carregar os dados do usuário
  async loadUserData() {
    try {
      // Aguardando a observação do perfil do usuário
      this.autheticationService.getUserProfile().subscribe({
        next: (userData: any) => {
          this.user = userData;
          console.log('Dados do usuário carregados:', this.user);
          this.isLoading = false;
        },
        error: (err: any) => {
          console.error('Erro ao carregar os dados do usuário:', err);
          this.isLoading = false;
          this.router.navigate(['/login']); // Caso haja erro, redireciona para login
        },
      });
    } catch (error) {
      console.error('Erro ao carregar os dados do usuário:', error);
      this.isLoading = false;
    }
  }
}
