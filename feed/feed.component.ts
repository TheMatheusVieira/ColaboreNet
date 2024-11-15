import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-feed',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `

<div class="header">
  <div class="logo">
  <img [src]="imageUrl" class="logoheader" decoding="async" alt="Logo Colabore">
  </div>
  <nav>
    <a class="menus" href="#">Inicial</a>
    <a class="menus" href="#">Currículos</a>
    <a class="menus" href="#">Perfil</a>
    <a class="menus" href="#">Sair</a>
  </nav>
</div>

    <div class="feed-container">
      
      <div>
      <!-- Coluna 1: Publicar -->
      <div class="column publish-section">
        <div class="profile-pic"></div>
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
              👍 {{ post.likes }}
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
    background-color: #bdd3d9; /* Ajuste para a cor do fundo do header */
    padding: 8px 30px;
    width: 100%;
  }

  .logoheader{
    width: 50px;
    height: 50px;
    position: absolute;
  }

  .menus {
   color: white;
   padding: 60px;
   font-size: 20px;
   font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
   font-weight: 500;
  }

      .feed-container {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        gap: 20px;
        max-width: 100%;
        margin: auto;
        font-family: Arial, sans-serif;
      }

      .column {
        padding: 10px;
        background: #f9f9f9;
        border: 1px solid #ddd;
        border-radius: 30px;

        margin-left: 20px; 
        margin-top: 60px;
      }

      .publish-section {
        display: flex;
        flex-direction: column;
        gap: 10px;
      }

      .nameFeed {
        font-size: 10px,
       
      }

      .feed-section,
      .message-container {
        margin-top: 45px;
        margin-right: 20px;
      }

      .post-input,
      .message-input,
      .user-input,
      .search-input {
        width: 90%;
        height: 25px;
        
        padding: 10px;
        font-size: 14px;
        border: 1px solid #ccc;
        border-radius: 40px;
        resize: none;
        
        background: #bdd3d9;
      }

      .message-input{
        margin: 5px;
      }

      .profile-pic {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background-color: #d7e3e9;
        display: inline-block;

        border: 1px solid #000;
      }

      .image-preview img {
        max-width: 100%;
        max-height: 200px;
        border-radius: 5px;
        margin-top: 10px;
      }

      .post-image img {
        max-width: 100%;
        max-height: 300px;
        border-radius: 5px;
      }

      .like-section {
        margin-top: 10px;
      }

      button {
        padding: 10px 20px;
        font-size: 14px;
        color: #fff;
        background-color: #007bff;
        border: none;
        border-radius: 5px;
        cursor: pointer;
      }

      button:disabled {
        background-color: #ccc;
      }

      .message {
        background: #fff;
        border: 1px solid #ddd;
        border-radius: 5px;
        padding: 10px;
        margin-bottom: 10px;
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
