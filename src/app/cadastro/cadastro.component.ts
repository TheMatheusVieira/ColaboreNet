import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { RouterModule } from '@angular/router'; // Importe o RouterModule

@Component({
  selector: 'app-cadastro',
  standalone: true, // Indica que o componente é autônomo
  imports: [RouterOutlet, RouterModule], // Importa o RouterOutlet para uso de <router-outlet>
  templateUrl: './cadastro.component.html', // Caminho para o template HTML
  styleUrls: ['./cadastro.component.css'], // Corrigido para plural

  
})
export class CadastroComponent {
  imageUrl: string = 'https://github.com/TheMatheusVieira/ColaboreNet/blob/main/logoCN.jpeg?raw=true';

}

