import { Component } from '@angular/core';
import { RouterModule } from '@angular/router'; // Importe o RouterModule para navegação

@Component({
  selector: 'sair-app',
  templateUrl: './sair.component.html',
  styleUrls: ['./sair.component.css'],
  standalone: true,
  imports: [RouterModule], // Inclui o RouterModule para uso de routerLink
})
export class SairComponent {}
