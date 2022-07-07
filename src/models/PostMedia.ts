import Entity from "./Entity";
import Post from "./Post";

export default interface PostMedia extends Entity {
    Type: MediaType;
    Url: string;

    PostId: number;
    Post: Post;
}

export enum MediaType {
    Image,
    Video
}