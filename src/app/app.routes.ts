import { Routes } from '@angular/router';
import { ChatPageComponent } from './chat-page/chat-page.component';
import { ChatWindowComponent } from './chat-window/chat-window.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'chat',
    pathMatch: 'full'
  },
  {
    path: 'chat',
    component: ChatWindowComponent
  }
];
