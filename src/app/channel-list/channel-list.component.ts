import { Component } from '@angular/core';

@Component({
  selector: '[app-channel-list]',
  standalone: true,
  imports: [],
  templateUrl: './channel-list.component.html',
  styleUrl: './channel-list.component.css'
})
export class ChannelListComponent {

  public channelList: string[] = ['some chat', 'super channel', 'talking abbout whatever']
}
