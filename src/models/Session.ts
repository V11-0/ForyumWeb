import Entity from "./Entity";
import User from "./User";

export default interface Session extends Entity {
    Token: string;
    DeviceName?: string;
    DeviceOS?: string;

    UserId: number;
    User: User;
}