import Entity from "./Entity";
import Post from "./Post";
import User from "./User";

export default interface Community extends Entity {
    Name: string;
    Description?: string;

    Posts?: Array<Post>;
    Users?: Array<User>;

    CreatorUserId: number;
    CreatorUser: User;
}