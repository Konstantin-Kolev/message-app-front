import { Component } from '@angular/core';
import { ChatWindowComponent } from "../chat-window/chat-window.component";
import { ChannelListComponent } from "../channel-list/channel-list.component";

@Component({
  selector: 'app-chat-page',
  standalone: true,
  imports: [ChatWindowComponent, ChannelListComponent],
  templateUrl: './chat-page.component.html',
  styleUrl: './chat-page.component.css'
})
export class ChatPageComponent {

}
