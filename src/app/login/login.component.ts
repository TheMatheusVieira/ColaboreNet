import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { RouterModule } from '@angular/router'; // Importe o RouterModule

@Component({
  selector: 'app-login',
  standalone: true, // Indica que o componente é autônomo
  imports: [RouterOutlet, RouterModule, FormsModule], // Importa o RouterOutlet para uso de <router-outlet>
  templateUrl: './login.component.html', // Caminho para o template HTML
  styleUrls: ['./login.component.css'], // Corrigido para plural
})
export class LoginComponent {
  imageUrl: string = 'https://github.com/TheMatheusVieira/ColaboreNet/blob/main/logoCN.jpeg?raw=true';

  // Propriedades para email e senha
  email: string = '';
  password: string = '';

  constructor(private router: Router) {}

  // Método para tratar o login
  onLogin(): void {
    // Validação dos dados
    if (this.email === 'user01@gmail.com' && this.password === '1234') {
      // Navega para a rota /feed
      this.router.navigate(['/feed']);
    } else {
      // Exibe uma mensagem de erro (substitua conforme necessário)
      alert('Email ou senha inválidos!');
    }
  }
}  
