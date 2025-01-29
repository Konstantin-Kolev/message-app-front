import { UserType } from "./user.model";

export type ChannelType = {
  id: number;
  name: string;
  type: number;
  owner: UserType;
  admins: UserType[];
  members: UserType[];
}