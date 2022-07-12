import Entity from './Entity'
import PostMedia from './PostMedia'
import User from './User'
import Vote from './Vote'

export default interface Post extends Entity {
  title: string
  text?: string

  medias?: Array<PostMedia>

  creatorUserId: number
  creatorUser?: User

  communityId: number
  community: object

  votes?: Array<Vote>
}
