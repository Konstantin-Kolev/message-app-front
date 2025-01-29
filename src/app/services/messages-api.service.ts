import { inject, Injectable } from '@angular/core';
import { MessageType } from '../models/message.model';
import { ChannelType } from '../models/channel.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { MessageCreate } from '../models/message-create.model';

@Injectable({
  providedIn: 'root'
})
export class MessagesApiService {

  private httpClient = inject(HttpClient);
  private baseUrl = `${environment.baseUrl}/messages`;

  // private messagesList: MessageType[] = [
  //   {
  //     id: 1,
  //     channelId: 1,
  //     senderId: 1,
  //     sentBy: 'user1',
  //     message: 'hello',
  //     timestamp: '10/10/2024, 12:15:00'
  //   },
  //   {
  //     id: 2,
  //     channelId: 1,
  //     senderId: 2,
  //     sentBy: 'user2',
  //     message: 'hi!',
  //     timestamp: '10/10/2024, 12:17:30'
  //   },
  //   {
  //     id: 3,
  //     channelId: 1,
  //     senderId: 1,
  //     sentBy: 'user1',
  //     message: 'how are you?',
  //     timestamp: '10/10/2024, 12:18:10'
  //   }
  // ];

  public getMessagesForChannel(channelId: number) {
    return this.httpClient.get(`${this.baseUrl}/fromChannel/${channelId}`);
  }

  public createMessage(message: MessageCreate) {
    return this.httpClient.post(this.baseUrl, message);
  }
}
