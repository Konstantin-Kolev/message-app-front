import { Component } from '@angular/core';
import { ChatMessage } from '../models/chat-message.model';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-chat-window',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './chat-window.component.html',
  styleUrl: './chat-window.component.css'
})
export class ChatWindowComponent {

  editIcon = faPenToSquare;
  deleteIcon = faTrash;

  public mockChat: ChatMessage[] = [
    {
      sentBy: 'user1',
      message: 'hello',
      timestamp: '2024-10-10'
    },
    {
      sentBy: 'user2',
      message: 'hi!',
      timestamp: '2024-10-10'
    },
    {
      sentBy: 'user1',
      message: 'how are you?',
      timestamp: '2024-10-10'
    }
  ];

}
