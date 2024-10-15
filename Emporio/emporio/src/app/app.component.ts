import { Component } from '@angular/core';
import { register } from 'swiper/element/bundle';
import { addIcons } from 'ionicons';
import { library, playCircle, radio, search } from 'ionicons/icons';
register();

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor() {
    addIcons({ library, playCircle, radio, search });
  }
}
