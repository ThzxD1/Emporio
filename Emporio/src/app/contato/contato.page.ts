import { Component, OnInit } from '@angular/core';
import { Loader } from '@googlemaps/js-api-loader';

@Component({
  selector: 'app-contato',
  templateUrl: './contato.page.html',
  styleUrls: ['./contato.page.scss'],
})
export class ContatoPage implements OnInit {
  showSearch: boolean = false;
  searchQuery: string = '';

  constructor() {}

  toggleSearch() {
    this.showSearch = !this.showSearch;
  }

  ngOnInit() {
    setTimeout(() => {
      this.createMap();
    }, 100); // Atraso de 100 ms
  }
  

  async createMap() {
    const mapRef = document.getElementById('map');

    if (mapRef) {
      const loader = new Loader({
        apiKey: 'AIzaSyCADgsD9b6D2W42rP0NpMZyshHl8dKuzXk', // Substitua pela sua chave da API do Google Maps
        version: 'weekly', // ou a versão que você precisar
      });

      await loader.load();

      const map = new google.maps.Map(mapRef, {
        center: { lat: -22.925321578979492, lng: -43.63520812988281 },
        zoom: 18,
      });
      const marker = new google.maps.Marker({
        position: { lat: -22.925321578979492, lng: -43.63520812988281 }, // Posição do marcador
        map: map, // Mapa onde o marcador será adicionado
        title: 'Empório da Roça', // Título do marcador
      });
    } else {
      console.error('Map reference is null');
    }
  }
}
