export type MessageType = {
  id?: number;
  channelId: number;
  senderId: number;
  sentBy: string;
  message: string;
  timestamp: string;
}