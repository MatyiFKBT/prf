import { Comment } from "./comment";
import { User } from "./user";

export interface Song {
  title: string;
  artist: string;
  link: string;
  _id: string;
  user: User;
  likes: number;
  comments: Comment[];
}
