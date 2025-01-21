import { Injectable } from '@angular/core';
import { MessageType } from '../models/message.model';
import { ChannelType } from '../models/channel.model';

@Injectable({
  providedIn: 'root'
})
export class MessagesApiService {

  private messagesList: MessageType[] = [
    {
      id: 1,
      channelId: 1,
      senderId: 1,
      sentBy: 'user1',
      message: 'hello',
      timestamp: '10/10/2024, 12:15:00'
    },
    {
      id: 2,
      channelId: 1,
      senderId: 2,
      sentBy: 'user2',
      message: 'hi!',
      timestamp: '10/10/2024, 12:17:30'
    },
    {
      id: 3,
      channelId: 1,
      senderId: 1,
      sentBy: 'user1',
      message: 'how are you?',
      timestamp: '10/10/2024, 12:18:10'
    }
  ];

  public getMessagesForChannel(channel: ChannelType): MessageType[] {
    return this.messagesList.filter((message) => message.channelId === channel.id);
  }

  public createMessage(message: MessageType): void {
    var id = this.messagesList.length + 1;
    message.id = id;
    this.messagesList.push(message);
  }
}
