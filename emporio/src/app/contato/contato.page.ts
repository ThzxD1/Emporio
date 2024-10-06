import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-contato',
  templateUrl: './contato.page.html',
  styleUrls: ['./contato.page.scss'],
})
export class ContatoPage implements OnInit {
  showSearch: boolean = false; // Variável para controlar a visibilidade da caixa de pesquisa
  searchQuery: string = ''; // Variável para armazenar a consulta de pesquisa

  constructor() {}

  toggleSearch() {
    this.showSearch = !this.showSearch; // Alterna a visibilidade da caixa de pesquisa
  }
  map!: L.Map;

  ngOnInit() {
    this.loadMap();
  }

  loadMap() {
    // Inicializa o mapa
    this.map = L.map('map').setView([-22.918994, -43.633887], 18); // Coordenadas da localização
  
    // Adiciona a camada de tiles do Esri
    L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
      maxZoom: 18,
      attribution: 'Tiles &copy; Esri &mdash; Source: Esri',
    }).addTo(this.map);
  
    // Forçar o redesenho do mapa
    this.map.invalidateSize();
  
    // Adiciona um marcador na localização
    L.marker([-22.918994, -43.633887]).addTo(this.map)
      .bindPopup('Emporio da Roça GH')
      .openPopup();
  }
  
}

