import { Routes } from '@angular/router';
import { FeedComponent } from './feed/feed.component';
import { SairComponent } from './sair/sair.component';
import { LoginComponent } from './login/login.component';
import { CadastroComponent } from './cadastro/cadastro.component';
import { CurriculosComponent } from '../curriculos/curriculos.component';
import { PerfilComponent } from '../perfil/perfil.component';

export const routes: Routes = [
  { path: 'feed', component: FeedComponent },
  { path: 'curriculos', component: CurriculosComponent },
  { path: 'perfil', component: PerfilComponent },
  { path: 'sair', component: SairComponent },
  
  { path: 'login', component: LoginComponent },
  { path: 'cadastro', component: CadastroComponent},
  
  { path: '', redirectTo: '/feed', pathMatch: 'full' },
];
