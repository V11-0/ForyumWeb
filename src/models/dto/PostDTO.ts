export interface PostFeedDTO {
    id: number;
    dateCreated: string;
    communityId: number;
    communityName: string;
    title: string;
    text?: string;
    creatorUserId: number;
    creatorUsername: string;
}
