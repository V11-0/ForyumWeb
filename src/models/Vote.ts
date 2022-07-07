import Entity from "./Entity";
import Post from "./Post";
import User from "./User";

export default interface Vote extends Entity {
    VoteType: VoteType;

    UserId: number;
    User: User;

    PostId: number;
    Post: Post;
}

export enum VoteType {
    Upvote,
    Downvote
}