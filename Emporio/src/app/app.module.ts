import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { IonicStorageModule } from '@ionic/storage-angular';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { getFirestore } from 'firebase/firestore';
import { environment } from '../environments/environment';
import { initializeApp } from 'firebase/app';
import { CarrinhoService } from './services/carrinho.service';

@NgModule({
  declarations: [AppComponent],
  imports: [
  BrowserModule,
  IonicModule.forRoot(), 
  AppRoutingModule,
  AngularFireModule.initializeApp(environment.firebaseConfig),
  AngularFireAuthModule,
  HttpClientModule,
  IonicStorageModule.forRoot(),
  AngularFireDatabaseModule],
  
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy}, CarrinhoService],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {
  constructor() {
    // Inicializando o Firebase
    initializeApp(environment.firebaseConfig);

    // Inicializando o Firestore (modular)
    const db = getFirestore();
  }
}
