import Entity from './Entity'
import Post from './Post'
import User from './User'

export enum VoteType {
  Upvote,
  Downvote
}

export default interface Vote extends Entity {
  voteType: VoteType

  userId: number
  user: User

  postId: number
  post: Post
}
