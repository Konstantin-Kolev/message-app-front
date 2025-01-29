import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { MessageCreate } from '../models/message-create.model';

@Injectable({
  providedIn: 'root'
})
export class MessagesApiService {

  private httpClient = inject(HttpClient);
  private baseUrl = `${environment.baseUrl}/messages`;

  public getMessagesForChannel(channelId: number) {
    return this.httpClient.get(`${this.baseUrl}/fromChannel/${channelId}`);
  }

  public createMessage(message: MessageCreate) {
    return this.httpClient.post(this.baseUrl, message);
  }
}
