import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router'; // Importe o RouterModule


@Component({
  selector: 'app-feed',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  template: `

<div class="header">
  <div class="logo">
  <img [src]="imageUrl" class="logoheader" decoding="async" alt="Logo Colabore">
  </div>
  <nav>
  <a class="menus" [routerLink]="'/feed'">Inicial</a>
  <a class="menus" [routerLink]="'/curriculos'">Currículos</a>
  <a class="menus" [routerLink]="'/perfil'">Perfil</a>
  <a class="menus" [routerLink]="'/sair'">Sair</a>
</nav>

</div>

    <div class="feed-container">
      
      <div>
      <!-- Coluna 1: Publicar -->
      <div class="column publish-section">
        <div class="linhaPerfil">
        <div class="profile-pic"></div>
        <p>User 01</p>
        </div>
        <textarea
          [(ngModel)]="newPost"
          placeholder="Faça uma postagem..."
          rows="3"
          class="post-input"
        ></textarea>
        <input
          type="file"
          (change)="onImageSelected($event)"
          accept="image/*"
          class="image-input"
        />
        <div *ngIf="selectedImage" class="image-preview">
          <img [src]="selectedImage" alt="Pré-visualização da imagem" />
        </div>
        <button (click)="publishPost()" [disabled]="!newPost.trim() && !selectedImage">Publicar</button>
      </div>

      
      <img [src]="logoPage" class="logoTela" decoding="async" alt="Logo Colabore">
      

      </div>

      
      <!-- Coluna 2: Feed de Publicações -->
    <div>
      <div class="column feed-section">
        <h2>Publicações</h2>
        <div *ngFor="let post of posts" class="post">

          <p class="nameFeed">User 01</p>
          <p>{{ post.text }}</p>
          <div *ngIf="post.image" class="post-image">
            <img [src]="post.image" alt="Imagem do post" />
          </div>
          <div class="like-section">
            <button
              (click)="likePost(post)"
              [disabled]="post.liked"
              class="like-button"
            >
              Like {{ post.likes }}
            </button>
          </div>
        </div>
      </div>
    </div>


      <!-- Coluna 3: Mensagens -->
      <div class="column message-container">
        
        <!-- Pesquisa -->
        <div class="search-section">
          <input
            [(ngModel)]="searchTerm"
            placeholder="Pesquisar mensagens..."
            class="search-input"
          />
        </div>

        <!-- Mensagens filtradas -->
        <div class="messages">
          <div *ngFor="let message of filteredMessages()" class="message">
            <strong>{{ message.user }}:</strong>
            <p>{{ message.text }}</p>
          </div>
        </div>

        <!-- Formulário de envio -->
        <div class="input-section">
          <input
            [(ngModel)]="messageUser"
            placeholder="Destinatário"
            class="user-input"
          />
          <textarea
            [(ngModel)]="messageText"
            placeholder="Escreva sua mensagem..."
            rows="3"
            class="message-input"
          ></textarea>
          <button (click)="sendMessage()" [disabled]="!messageUser.trim() || !messageText.trim()">Enviar</button>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      background-color: #bdd3d9;
      padding: 10px 20px;
      width: 100%;
      box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1); /* Adiciona sombra */
    }

    .logoheader {
      width: 40px; /* Tamanho reduzido */
      height: 40px;
    }

    .menus {
      color: #ecf0f1; /* Branco suave */
      padding: 80px;
      font-size: 16px;
      font-family: Arial, sans-serif;
      font-weight: bold;
      text-decoration: none; /* Remove sublinhado */
    }

    .menus:hover {
      color: #95a5a6; /* Cor de destaque ao passar o mouse */
    }

    .feed-container {
      display: grid;
      grid-template-columns: 1fr 2fr 1fr; /* Mais espaço para o feed */
      gap: 20px;
      max-width: 90%;
      margin: 30px auto; /* Margem centralizada */
      font-family: Arial, sans-serif;
    }

    .column {
      padding: 30px;
      background: #ecf0f1; /* Fundo claro */
      border-radius: 15px;
      box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1); /* Sombra suave */
    }

    .logoTela {
      width: 400px;
      height: 400px;
    }


    .publish-section {
      display: flex;
      flex-direction: column;
      gap: 15px;
    }

    .linhaPerfil{
      flex-direction: 'row';
    }
    
    .post-input,
    .message-input,
    .user-input,
    .search-input {
      width: 100%;
      padding: 10px;
      font-size: 14px;
      border: 1px solid #bdc3c7;
      border-radius: 10px;
      resize: none;
      background: #ffffff; /* Fundo branco */
      box-shadow: inset 0px 2px 4px rgba(0, 0, 0, 0.1); /* Sombra interna */ 
    }

   .input-section{
    width: 300px;
    }

    .post-input::placeholder {
      color: #7f8c8d; /* Placeholder em cinza claro */
    }

    .profile-pic {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      background-color: #95a5a6; /* Cinza médio */
      border: 2px solid #34495e; /* Borda escura */
    }

    .image-preview img {
      max-width: 100%;
      max-height: 200px;
      border-radius: 10px;
      margin-top: 10px;
      border: 1px solid #bdc3c7;
    }

    .feed-section h2 {
      font-size: 18px;
      color: #34495e; /* Azul escuro */
      margin-bottom: 20px;
    }

    .post {
      padding: 15px;
      background: #ffffff;
      border: 1px solid #bdc3c7;
      border-radius: 10px;
      margin-bottom: 15px;
      box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1); /* Sombra leve */
    }

    .nameFeed {
      font-size: 14px;
      font-weight: bold;
      color: #2c3e50;
    }

    .like-section {
      margin-top: 10px;
    }

    .like-button {
      padding: 8px 15px;
      font-size: 14px;
      color: #ffffff;
      background-color: #3498db; 
      border: none;
      border-radius: 10px;
      cursor: pointer;
    }

    .like-button:disabled {
      background-color: #bdc3c7; /* Cinza claro */
      cursor: not-allowed;
    }

    .message-container {
      padding-bottom: 20px;
    }

    .message {
      background: #ffffff;
      border: 1px solid #bdc3c7;
      border-radius: 10px;
      padding: 10px;
      margin-bottom: 10px;
    }

    button {
      padding: 10px 20px;
      font-size: 14px;
      color: #ffffff;
      background-color: #3498db; /* Azul */
      border: none;
      border-radius: 10px;
      cursor: pointer;
    }

    button:disabled {
      background-color: #95a5a6; /* Cinza médio */
    }

    .search-section {
      margin-bottom: 15px;
    }
    `,
  ],

})

export class FeedComponent {
  title = 'colaboreNet';
  imageUrl: string = 'https://github.com/TheMatheusVieira/ColaboreNet/blob/main/logoCN.jpeg?raw=true';
  logoPage: string = 'https://github.com/TheMatheusVieira/ColaboreNet/blob/master/public/C.png?raw=true'

  // Feed
  newPost: string = '';
  selectedImage: string | null = null;
  posts: { text: string; likes: number; liked: boolean; image: string | null }[] = [];

  // Mensagens
  messageUser: string = '';
  messageText: string = '';
  messages: { user: string; text: string }[] = [];

  // Pesquisa
  searchTerm: string = '';

  publishPost(): void {
    if (this.newPost.trim() || this.selectedImage) {
      this.posts.unshift({
        text: this.newPost,
        likes: 0,
        liked: false,
        image: this.selectedImage,
      });
      this.newPost = '';
      this.selectedImage = null;
    }
  }

  onImageSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.selectedImage = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  likePost(post: { text: string; likes: number; liked: boolean; image: string | null }): void {
    if (!post.liked) {
      post.likes += 1;
      post.liked = true;
    }
  }

  sendMessage(): void {
    if (this.messageUser.trim() && this.messageText.trim()) {
      this.messages.unshift({
        user: this.messageUser,
        text: this.messageText,
      });
      this.messageUser = '';
      this.messageText = '';
    }
  }

  filteredMessages(): { user: string; text: string }[] {
    const term = this.searchTerm.trim().toLowerCase();
    return this.messages.filter(
      (message) =>
        message.user.toLowerCase().includes(term) ||
        message.text.toLowerCase().includes(term)
    );
  }
}
