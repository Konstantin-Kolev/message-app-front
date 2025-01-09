import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { MessageType } from '../../models/message.model';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPenToSquare, faTrash, faUserPlus, faUserTie } from '@fortawesome/free-solid-svg-icons';
import { ChannelType } from '../../models/channel.model';
import { MessagesApiService } from '../../services/messages-api.service';

@Component({
  selector: 'app-chat-window',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './chat-window.component.html',
  styleUrl: './chat-window.component.css'
})
export class ChatWindowComponent implements OnInit, OnChanges {

  constructor(private messagesApi: MessagesApiService) {}
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['selectedChannel'].currentValue) {
      this.channelMessages = this.messagesApi.getMessagesForChannel(changes['selectedChannel'].currentValue);
    }
  }

  ngOnInit(): void {
    if (this.selectedChannel) {
      this.channelMessages = this.messagesApi.getMessagesForChannel(this.selectedChannel);
    }
  }

  @Input()
  public selectedChannel: ChannelType|null = null;

  editIcon = faPenToSquare;
  deleteIcon = faTrash;
  adminIcon = faUserTie;
  addUserIcon = faUserPlus;

  public channelMessages: MessageType[] = [];

  

}
