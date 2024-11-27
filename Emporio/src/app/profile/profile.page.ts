import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AutheticationService } from '../authetication.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { finalize } from 'rxjs/operators'
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  user: any = null;
  isLoading: boolean = true;
  isEditing: boolean = false;
  selectedFile: File | null = null;
  previewUrl: string | null = null;

  constructor(
    private autheticationService: AutheticationService,
    private ngFireAuth: AngularFireAuth,
    private router: Router,
    private storage: AngularFireStorage
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
  toggleEdit() {
    this.isEditing = !this.isEditing;
  }
  
  async saveProfile() {
    try {
      if (this.selectedFile) {
        const filePath = `profile_images/${this.user.uid}_${this.selectedFile.name}`;
        const fileRef = this.storage.ref(filePath);
        const uploadTask = this.storage.upload(filePath, this.selectedFile);

        uploadTask
          .snapshotChanges()
          .pipe(
            finalize(() => {
              fileRef.getDownloadURL().subscribe((url) => {
                this.user.profileImage = url; // Atualiza a URL da imagem no perfil
                this.updateUserProfile();
              });
            })
          )
          .subscribe();
      } else {
        this.updateUserProfile();
      }
    } catch (error) {
      console.error('Erro ao atualizar o perfil:', error);
    }
  }
  private async updateUserProfile() {
    try {
      await this.autheticationService.updateUserProfile(this.user);
      this.isEditing = false;
      console.log('Perfil atualizado com sucesso!');
    } catch (error) {
      console.error('Erro ao atualizar o perfil:', error);
    }
  }
  async logout() {
    await this.autheticationService.logout();
  }

  // Método para carregar os dados do usuário
  async loadUserData() {
    try {
      this.autheticationService.getUserProfile().subscribe({
        next: (userData: any) => {
          this.user = userData;
          this.previewUrl = this.user.profileImage || null; // Carrega a imagem se existir
          this.isLoading = false;
        },
        error: (err: any) => {
          console.error('Erro ao carregar os dados do usuário:', err);
          this.isLoading = false;
          this.router.navigate(['/login']);
        },
      });
    } catch (error) {
      console.error('Erro ao carregar os dados do usuário:', error);
      this.isLoading = false;
    }
  }
  triggerFileInput() {
    const fileInput = document.getElementById('fileInput') as HTMLElement;
    fileInput.click(); // Dispara o clique no campo de input escondido
  }
  
  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.previewUrl = reader.result as string; // Define a URL do preview
      };
      reader.readAsDataURL(file);
    }
  }
}
