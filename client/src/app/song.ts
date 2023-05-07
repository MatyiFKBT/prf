import { Comment } from "./comment";

export interface Song {
  title: string;
  artist: string;
  link: string;
  _id: string;
  user: {
    username: string;
  },
  likes: number;
  comments: Comment[];
}
