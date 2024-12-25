import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ChannelListComponent } from "./channel-list/channel-list.component";
import { ChatWindowComponent } from "./chat-window/chat-window.component";
import { SideBarComponent } from "./side-bar/side-bar.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ChannelListComponent, ChatWindowComponent, SideBarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'message-app-front';
}
