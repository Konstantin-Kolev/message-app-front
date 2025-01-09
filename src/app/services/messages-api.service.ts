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
      sentBy: 'user1',
      message: 'hello',
      timestamp: '2024-10-10'
    },
    {
      id: 2,
      channelId: 1,
      sentBy: 'user2',
      message: 'hi!',
      timestamp: '2024-10-10'
    },
    {
      id: 3,
      channelId: 1,
      sentBy: 'user1',
      message: 'how are you?',
      timestamp: '2024-10-10'
    }
  ];

  public getMessagesForChannel(channel: ChannelType): MessageType[] {
    return this.messagesList.filter((message) => message.channelId === channel.id);
  }
}
