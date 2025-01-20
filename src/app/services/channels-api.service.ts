import { Injectable } from '@angular/core';
import { ChannelType } from '../models/channel.model';
import { UserType } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class ChannelsApiService {

  private channelsList: ChannelType[] = [
    {
      id: 1,
      channelName: 'some chat',
      channelType: 'group',
      ownerId: 1,
      adminIds: [1],
      memberIds: [1, 2]
    },
    {
      id: 2,
      channelName: 'super  channel',
      channelType: 'group',
      ownerId: 1,
      adminIds: [1, 2],
      memberIds: [1, 2]
    },
    {
      id: 3,
      channelName: 'talking about whatever',
      channelType: 'group',
      ownerId: 2,
      adminIds: [2],
      memberIds: [1, 2]
    },
    {
      id: 4,
      channelName: 'user1|user2',
      channelType: 'friend',
      ownerId: 1,
      adminIds: [1, 2],
      memberIds: [1, 2]
    },
    {
      id: 5,
      channelName: 'user1|user3',
      channelType: 'friend',
      ownerId: 1,
      adminIds: [1, 3],
      memberIds: [1, 3]
    },
    {
      id: 6,
      channelName: 'user1|random_user',
      channelType: 'friend',
      ownerId: 1,
      adminIds: [1, 4],
      memberIds: [1, 4]
    },
  ];

  private modifyFriendChatName(channel: ChannelType, user: UserType) {
    var modified = { ...channel };
    modified.channelName = modified.channelName.replace(user.username, '');
    modified.channelName = modified.channelName.replace('|', '');

    return modified;
  }

  public createChannel(channel: ChannelType) {
    channel.id = this.channelsList.length + 1;
    this.channelsList.push(channel);
    console.log(this.channelsList);
    return channel;
  }

  public getChannelsForUser(user: UserType): ChannelType[] {
    var result = this.channelsList.filter((channel) => channel.memberIds.includes(user.id!))
      .map((channel) => {
        if (channel.channelType === 'friend') {
          return this.modifyFriendChatName(channel, user);
        } else {
          return channel;
        }
      });

    return result;
  }
}
