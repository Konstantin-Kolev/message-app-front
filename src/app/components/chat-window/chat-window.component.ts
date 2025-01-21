import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { MessageType } from '../../models/message.model';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPenToSquare, faTrash, faUserPlus, faUserTie } from '@fortawesome/free-solid-svg-icons';
import { ChannelType } from '../../models/channel.model';
import { MessagesApiService } from '../../services/messages-api.service';
import { UserStateService } from '../../services/user-state.service';
import { UserType } from '../../models/user.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-chat-window',
  standalone: true,
  imports: [FontAwesomeModule, FormsModule],
  templateUrl: './chat-window.component.html',
  styleUrl: './chat-window.component.css'
})
export class ChatWindowComponent implements OnChanges {

  constructor(private messagesApi: MessagesApiService, private userStateService: UserStateService) {
    this.currentUser = this.userStateService.getCurrentUser()();
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['selectedChannel'].currentValue) {
      this.loadMessagesForChannel(changes['selectedChannel'].currentValue);
    }
  }

  @Input()
  public selectedChannel: ChannelType | null = null;

  editIcon = faPenToSquare;
  deleteIcon = faTrash;
  adminIcon = faUserTie;
  addUserIcon = faUserPlus;

  public channelMessages: MessageType[] = [];
  public currentUser: UserType | null;
  public currentMessage: string = '';

  private loadMessagesForChannel(channel: ChannelType): void {
    this.channelMessages = this.messagesApi.getMessagesForChannel(channel);
  }

  public handleMessageSubmit(): void {
    var currentUser = this.userStateService.getCurrentUser()();
    if (this.currentMessage !== '' && this.selectedChannel?.id && currentUser && currentUser.id) {
      this.messagesApi.createMessage({
        channelId: this.selectedChannel.id,
        sentBy: currentUser.username,
        senderId: currentUser.id,
        message: this.currentMessage,
        timestamp: new Date().toLocaleString('en-GB')
      });

      this.loadMessagesForChannel(this.selectedChannel);
      this.currentMessage = '';
    };
  }
}
