import { Component } from '@angular/core';
import { ChatMessage } from '../models/chat-message.model';

@Component({
  selector: 'app-chat-window',
  standalone: true,
  imports: [],
  templateUrl: './chat-window.component.html',
  styleUrl: './chat-window.component.css'
})
export class ChatWindowComponent {

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
