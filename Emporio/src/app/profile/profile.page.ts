import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { AutheticationService } from '../authetication.service';

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
        this.loadUserData(user.uid);
      }
    });
  }
  async logout() {
    await this.autheticationService.logout();
  }
  // MENOR CONSERTA ESSA PORRA PLMDS
  loadUserData(uid: string) {
    this.autheticationService.getUserProfile().subscribe(
      data => {
        this.user = data;
        this.isLoading = false;
      },
      error => {
        console.error("Erro ao carregar os dados do usuário:", error);
        this.isLoading = false;
      }
    );
  }
}
