export type ChannelType = {
  id: number;
  channelName: string;
  channelType: string;
  ownerId: number;
  adminIds: number[];
  memberIds: number[];
}