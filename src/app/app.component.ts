import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router'; // Importa o RouterOutlet para usar as rotas

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet], // Substitua o FeedComponent pelo RouterOutlet
  template: `<router-outlet></router-outlet>`, // RouterOutlet carrega os componentes com base nas rotas
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'colaboreTeste';
}
