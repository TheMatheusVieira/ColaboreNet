import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css',
})

export class AppComponent {
  title = 'colaboreNet';
  imageUrl: string = 'https://github.com/TheMatheusVieira/ColaboreNet/blob/main/logoCN.jpeg?raw=true';
}
