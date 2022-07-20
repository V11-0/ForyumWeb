export interface PostFeedDTO {
    id: number;
    dateCreated: string;
    communityId: number;
    communityName: string;
    title: string;
    text?: string;
    creatorUserId: number;
    creatorUsername: string;
    upvoted: boolean;
    downvoted: boolean;
}
