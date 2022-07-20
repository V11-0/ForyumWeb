import { VoteType } from '@/models/Vote'

export interface VoteDTO {
    voteType: VoteType;
    postId: number;
}
