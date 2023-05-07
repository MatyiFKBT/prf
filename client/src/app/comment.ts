import { Song } from "./song";
import { User } from "./user";

export interface Comment {
    text: string;
    song: Song;
    user: User;
}
