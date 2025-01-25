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
    return channel;
  }

  public createFriendChat(user1: UserType, user2: UserType) {
    const id = this.channelsList.length + 1;
    const newChat: ChannelType = {
      id,
      channelName: `${user1.username}|${user2.username}`,
      channelType: 'friend',
      ownerId: user1.id!,
      adminIds: [user1.id!, user2.id!],
      memberIds: [user1.id!, user2.id!]
    };

    this.channelsList.push(newChat);
  }

  public removeChannel(channelId: number) {
    this.channelsList = this.channelsList.filter((channel) => channel.id !== channelId);
  }

  public renameChannel(channelId: number, newName: string) {
    this.channelsList.map((channel) => {
      if (channel.id === channelId) {
        channel.channelName = newName;
      }
    });
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

  public addAdminToChannel(channelId: number, userId: number): void {
    this.channelsList.map((channel) => {
      if (channel.id === channelId && !channel.adminIds.includes(userId)) {
        channel.adminIds.push(userId);
      }
    });
  }

  public removeAdminFromChannel(channelId: number, userId: number): void {
    this.channelsList.map((channel) => {
      if (channel.id === channelId && channel.adminIds.includes(userId)) {
        const adminIndex = channel.adminIds.indexOf(userId);
        channel.adminIds.splice(adminIndex, 1);
      }
    });
  }

  public addMemberToChannel(channelId: number, userId: number): void {
    this.channelsList.map((channel) => {
      if (channel.id === channelId) {
        channel.memberIds.push(userId);
      }
    })
  }

  public removeMemberFromChannel(channelId: number, userId: number): void {
    this.channelsList.map((channel) => {
      if (channel.id === channelId) {
        const memberIndex = channel.memberIds.indexOf(userId);
        const adminIndex = channel.adminIds.indexOf(userId);
        channel.memberIds.splice(memberIndex, 1);
        if (adminIndex !== -1) {
          channel.adminIds.splice(adminIndex, 1);
        }
      }
    })
  }
}
