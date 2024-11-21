import { Component } from '@angular/core';
import { RouterModule } from '@angular/router'; // Importe o RouterModule
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-curriculos',
  templateUrl: './curriculos.component.html',
  styleUrls: ['./curriculos.component.css'],
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule], // Inclui o RouterModule para uso de routerLink
})
export class CurriculosComponent {
  imageUrl: string = 'https://github.com/TheMatheusVieira/ColaboreNet/blob/main/logoCN.jpeg?raw=true';
  
  curriculos: { url: string; type: string }[] = [];

  uploadCurriculo(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];

    if (file) {
      const fileReader = new FileReader();

      fileReader.onload = () => {
        const fileType = file.type.startsWith('image/') ? 'image' : file.type === 'application/pdf' ? 'pdf' : '';
        if (fileType) {
          this.curriculos.push({
            url: fileReader.result as string,
            type: fileType
          });
        } else {
          alert('Formato não suportado! Envie um arquivo PDF ou imagem.');
        }
      };

      fileReader.readAsDataURL(file); // Converte o arquivo em uma URL base64.
    }
  }
}
